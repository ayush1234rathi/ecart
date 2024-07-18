import React from 'react';
import { LiaShoppingBagSolid } from "react-icons/lia";
import {Link} from 'react-router-dom';
function Header({productCount}){
  
  return (
    <div className ="flex bg-white items-start px-2 flex-wrap py-2">
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <Link to="/">
        <img className="h-16 w-36" src="https://i1.wp.com/bma-india.com/wp-content/uploads/2018/07/amazon-india-logo-1.jpg222-1.jpg?ssl=1" />
        </Link>
        <div className="relative">
          <LiaShoppingBagSolid className="text-5xl text-base-taupe inline-block"/>
          <span className="text-sm absolute top-0 right-0 rounded-full bg-base-taupe px-1 text-white ">{productCount}</span>
        </div>
        
    </div>
      </div>
  );
}

export default Header;