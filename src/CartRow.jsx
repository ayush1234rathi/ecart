import React from 'react';
import { CiCircleRemove } from "react-icons/ci";

function CartRow({ item, localCart, updateCart, setLocalCart }){
    return (
        <tr className=''>
            <td className="py-2 px-4 border-b text-center">
                <button onClick={() => {
                    const newCart = { ...localCart };
                    delete newCart[item.id];
                    setLocalCart(newCart);
                    updateCart(newCart);
                }}>
                    <CiCircleRemove />
                </button>
            </td>
            <td className="py-2 px-4 border-b flex items-center text-center flex-col sm:flex-row justify-normal">
                <img src={item.thumbnail} alt={item.title} className='h-16'/>{item.title}
            </td>
            <td className="py-2 px-4 border-b text-center">${item.price}</td>
            <td className="py-2 px-4 border-b text-center">
                <input
                    value={localCart[item.id]} // Remove productId prop
                    type="number"
                    min={1}
                    className="border-2 text-center w-16"
                    onChange={(event) => {
                        const newValue = +event.target.value;
                        const newLocalCart = { ...localCart, [item.id]: newValue };
                        setLocalCart(newLocalCart);
                    }}
                />
            </td>
            <td className="py-2 px-4 border-b text-center">${(item.price * (localCart[item.id] || 0)).toFixed(2)}</td>
        </tr>
    );
};

export default CartRow;
