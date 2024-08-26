import React from 'react';
import { GrLinkNext } from "react-icons/gr";
function Pages(){
  return (
    <div className="flex gap-1 justify-start "> 
      <a className="inline-block border-2 border-base-taupe bg-base-taupe py-1 px-3 text-white" href="">1</a>
      <a className="inline-block hover:bg-base-taupe hover:text-white border-2 border-base-taupe py-1 px-3 text-base-taupe" href="">2</a>
      <a className="inline-block border-2 hover:bg-base-taupe hover:text-white border-base-taupe py-1 px-2 text-base-taupe" href=""><GrLinkNext /></a>
    </div>
  );
}

export default Pages;