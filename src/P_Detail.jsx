import React from 'react';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {getProductsDetails} from './Api';
import {Link} from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import Loading from './Loading';
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import Notfound from './Notfound';
function P_Detail({onAddToCart}) {
  const params=useParams();
  const id=+params.id;
  const[ProductDetailsData , setProductDetailsData]=useState();
  const[loading , setLoading]=useState(true);
  const[count, setCount]=useState(1);
  useEffect(function(){
    const p= getProductsDetails(id);
    p.then(function(response){
      setProductDetailsData(response.data);
       setLoading(false);
    }).catch(function(){
      console.log("data is not founded");
      setLoading(false);
    })
    setCount(1);

  },[id])
  let quantity=1;
  if(loading){
    return <Loading/>
  }
  else if(!ProductDetailsData){
    return <Notfound/>
  }
  function handleCountChange(event){
    setCount(+event.target.value);

  }
  function handleButtonClick(){
    onAddToCart(id,count);
  }
   return(
     <>
         <div className="gap-4 sm:flex m-auto max-w-screen-md bg-white shadow-2xl p-5">
          <Link className="text-4xl absolute hover:bg-base-taupe hover:rounded-full hover:text-white text-base-taupe p-2" to="/"><IoIosArrowRoundBack /></Link>
          <div class=" mx-auto h-96 w-full items-center">
           <img src={ProductDetailsData.thumbnail} className=" h-full object-cover" alt={ProductDetailsData.title} />
          </div>
          <div className="flex flex-col gap-6 mx-auto">
           <h1 className="text-2xl font-medium text-gray-700 mt-2 sm:mt-0 sm:text-3xl">{ProductDetailsData.title}</h1>
           <h2 className="text-gray-700 text-md sm:text-lg font-bold">{ProductDetailsData.price}</h2>
           <p class="text-justify text-gray-500 text-sm sm:text-md ">{ProductDetailsData.description}</p>
           <div className="flex flex-wrap gap-1">
             <input value={count} onChange={handleCountChange} type="number" min="1"  class="border-2 text-center w-16" />
             <button onClick={handleButtonClick} className="hover:bg-base-drb bg-base-taupe text-white py-1 px-10 rounded-md">ADD TO CART</button>
           </div>
           <span className='grow'></span>
           <div className="flex justify-between px-5"> 
       <div className=" hover:bg-base-taupe px-5 py-1 hover:text-white text-sm sm:text-base rounded-md">
         {id>1 && <Link className="flex items-center" to= {"/P_Detail/"+ (id-1)}><GrLinkPrevious />Previous</Link>}

     </div>

     <div className=" hover:bg-base-taupe px-5 py-1 hover:text-white text-sm sm:text-base rounded-md">
       <Link className="flex items-center  " to= {"/P_Detail/"+(id+1)}>Next<GrLinkNext /></Link>

     </div>
     </div>
          </div>
          </div>
     
     </>

   );  
}
export default P_Detail;