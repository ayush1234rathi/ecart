import React from 'react';
import { LiaShoppingBagSolid } from "react-icons/lia";
import {Link} from 'react-router-dom';
import { IoMdPerson } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { userContext } from './providers/UserProvider';
import { useContext } from 'react';
import withCart from "./withCart";

function Header({ totalCount }){
  const{user , setUser}= useContext(userContext);
  console.log("user is ", user);
  function handleLogout(){
    localStorage.setItem("token", undefined);
    setUser(null);
  }
  
  return (
    <div className ="flex bg-white items-start px-2 flex-wrap py-2">
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <Link to="/">
        <img className="h-16 w-36" src="https://i1.wp.com/bma-india.com/wp-content/uploads/2018/07/amazon-india-logo-1.jpg222-1.jpg?ssl=1" />
        </Link>
        <div className="flex">
          <div className="relative">
          <Link to={"/cart"}><LiaShoppingBagSolid className="text-5xl text-base-taupe inline-block"/></Link>
            <span className="text-sm absolute top-0 right-0 rounded-full bg-base-taupe px-1 text-white ">{ totalCount }</span>
          </div>
          {/* <Link to={"/login"}><IoMdPerson className="text-5xl text-base-taupe inline-block"/></Link> */}
        {!user && (<Link to={"/login"}><IoMdPerson className="text-5xl text-base-taupe inline-block"/></Link>)}
        {user &&(<button onClick={handleLogout}><IoLogOut className="text-5xl text-base-taupe inline-block"/></button>)}
        </div>

    </div>
      </div>
  );
}

export default (withCart(Header));