import React from 'react';
import { useState, useEffect } from 'react';
import { CiCircleRemove } from "react-icons/ci";
import {Link} from 'react-router-dom';

function CartRow({ item, handleUpdate }){
    const[count, setCount]=useState(item.quantity);
    function handleCountChange(event){
        setCount(+event.target.value);
    
      }
    function removeCartItem() {
        handleUpdate(item.id, 0);
    }
    return (
        <tr className=''>
            <td className="py-2 px-4 border-b text-center"><Link><CiCircleRemove onClick={removeCartItem}/></Link></td>
            <td className="py-2 px-4 border-b flex items-center text-center flex-col sm:flex-row justify-normal"><img src={item.thumbnail} alt={item.title} className='h-16'/>{item.title}</td>
            <td className="py-2 px-4 border-b text-center">${item.price.toFixed(2)}</td>
            <td className="py-2 px-4 border-b text-center"><input value={count} type="number" className="border-2 text-center w-16" onChange={handleCountChange} /></td>
            <td className="py-2 px-4 border-b text-center">${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    );
};

export default CartRow;
