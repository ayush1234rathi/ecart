import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductList from './ProductList';
import Pages from './Pages'; 
import { getProductList } from './Api';
import NoMatch from './NoMatch';
import Loading from './Loading';
import withUser from './withUser';
import { useSearchParams, Link } from 'react-router-dom';;

function ProductListHome() {
  const [ProductListData, setProductListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo , setPageNo]=useState();
  const [searchParams , setSearchParams] = useSearchParams();
  let params = Object.fromEntries([...searchParams]);
  let {q, sortBy ,skip, order }= params;
  q=q||""
  sortBy=sortBy||"default"
  skip=+skip||0
  order= order|| 'asc'
  useEffect(() => {
    getProductList({ q, sortBy, skip, order }).then((body) => {
      setProductListData(body);
      setLoading(false);
    });
    console.log("useEffect is running..");
  }, [sortBy, skip, q, order]);


  function handleChange(event) {
    setSearchParams(
    {...params , q:event.target.value, skip:0},
    {replace : false}
    );
  };


  function handleSortChange(event) {
    if(event.target.value =='priceHighToLow'){
      setSearchParams(
        {...params 
        , sortBy:"price",
        order : "desc"},
        {replace : false}
        );
    }
    else if(event.target.value =='price'){
      setSearchParams(
      {...params , sortBy:"price",  order : "asc"},
      {replace : false}
      );
    }
    else if(event.target.value=='title'){
      setSearchParams(
        {...params , sortBy:"title",  order : "asc"},
        {replace : false}
        );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl shadow-2xl bg-white gap-4 py-14 mx-auto px-6 sm:px-12">
      <div className="flex justify-between flex-wrap px-2 py-2 gap-10"> 
        <input className="border-2 border-base-taupe rounded-md grow px-1 py-1"
          type="text"
          onChange={handleChange}
          placeholder="Search"
        />
        <select
          onChange={handleSortChange}
          className="border border-base-taupe rounded-md grow sm:grow-0"

        >
          <option value="default">Default sort</option>
          <option value="title">Sort by name</option>
          <option value="price">Sort by price: low to high</option>
          <option value="priceHighToLow">Sort by price: high to low</option>
        </select>
      </div>
      {ProductListData.products.length > 0 ? (
        <ProductList products={ProductListData.products} />
      ) : (
        <NoMatch />
      )}
      {
        ProductListData.total>0 &&  ProductListData.limit && [...Array(Math.floor(ProductListData.total/ProductListData.limit)).keys()].map((item)=>{
         return <Link
                  className={'px-2 py-1 border-2 border-base-taupe hover:bg-base-taupe hover:text-white mr-2 mt-5 text-base-taupe'+ ( skip === item*30 ? " bg-base-taupe text-white": " bg-white")}
           key={item}
           to={"?"+new URLSearchParams({...params , skip:item*30})}
          >{item+1}</Link>
        })
      }
      <div>
        {/* <Pages /> */}
      </div>
    </div>
  );
}

export default withUser(ProductListHome);
