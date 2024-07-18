import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Pages from './Pages'; 
import allData from './DummyData'
import {getProductList} from './Api';
import NoMatch from './NoMatch';
import Loading from './Loading';

function ProductListHome() {
  const[ProductListData , setProductListData]=useState([]);
  const[query ,setQuery] = useState('');
  const[sort ,setSort] = useState('default');
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const xyz = getProductList();
    xyz.then(function(products){
        let dataArray=products;
        setProductListData(dataArray);
        setLoading(false);
    });

  }, []);
  let data =ProductListData.filter(function(item){
    return item.title.toLowerCase().indexOf(query.toLowerCase())!=-1 
  })
  if(sort === 'priceLow'){
    data.sort(function(a,b){
    let x=+a.price;
    let y=+b.price;
    return x-y;  
  })
  }
  else if(sort === 'name'){
  data.sort(function(a,b){
    return a.title<b.title?-1:1;
  })

  }
  else if(sort === 'priceHigh'){
  data.sort(function(a,b){
    let x=+a.price;
    let y=+b.price;
    return y-x;  
  })

  }

  function handlechange(event){
    const newQuery = event.target.value;
    setQuery(newQuery); 
  }
  function handleSortChange(event){
    setSort(event.target.value);
  }
  if(loading){
    return <><Loading/></>

  }

  return (
        <div className="max-w-4xl shadow-2xl bg-white gap-4 py-14 mx-auto px-6 sm:px-12">
          <div className="flex justify-between flex-wrap px-2 py-2 gap-10"> 
            <input className="border-2 border-base-taupe rounded-md grow px-1 py-1"
              type="text" 
              onChange={handlechange}
              placeholder="Search"
              />
            <select
            onChange={handleSortChange}
            className="border border-base-taupe rounded-md grow sm:grow-0"
            value={sort}>
            <option value="default">Default sort</option>
            <option value="name">Sort by name</option>
            <option value="priceLow">Sort by price: low to high</option>
              <option value="priceHigh">Sort by price: high to low</option>
            </select>
             </div>
          {data.length>0 && <ProductList products={data} />}
          {data.length==0 && <NoMatch/>}
          <div>
            <Pages />
          </div>
        </div>
  );
}

export default ProductListHome;
