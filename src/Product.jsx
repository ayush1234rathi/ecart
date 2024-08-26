import React from 'react';
import {Link} from 'react-router-dom';
function Product({title,category,price,thumbnail,id}){
  return (

    <div className=" flex flex-col gap-1 sm:w-64 hover:bg-gray-200 hover:border-rose-500 rounded-md my-2">
    <div className="w-full aspect-square">
      <img className="w-full h-full object-cover" src={thumbnail} />
    </div>
    <h6 className="text-gray-500 sm:text-xs text-xs mx-4">
      {category}
    </h6>
    <h1 className="text-xs sm:text-sm font-semibold mx-4">
      {title}
    </h1>
      <div className="w-4 flex mx-4">
       {/* <img src="./star.svg" alt="star"/>
        <img src="./star.svg" alt="star"/>
        <img src="./star.svg" alt="star"/>
        <img src="./star.svg" alt="star"/>
        <img src="./star.svg" alt="star"/> */}
      </div>
    <h4 className="text-xs sm:text-sm font-semibold mx-4 grow">
      ${price}
    </h4>
      {/* <p className="mx-4 my-4"> */}
        <Link to={"/P_Detail/"+ id} className="bg-base-taupe hover:bg-base-drb rounded-md py-2 mx-4 my-4 text-white text-center">View Details</Link>
      {/* </p> */}
    </div>
  );
}

export default React.memo(Product);