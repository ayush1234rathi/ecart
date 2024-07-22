import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartList from './CartList';
import CouponComponent from './CouponComponent.jsx';
import { IoIosArrowRoundBack } from "react-icons/io";
import {Link} from 'react-router-dom';
import {getProductsDetails} from './Api';

function CartPage({ cartitem, onAddToCart }){
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const convertCartItemToArray = (cartitem) => {
            return Object.entries(cartitem).map(([key, value]) => ({
                id: parseInt(key, 10),
                quantity: value
            }));
        };
        const cart = convertCartItemToArray(cartitem);

        const fetchProducts = async () => {
            const products = await Promise.all(
                cart.map(item =>
                    getProductsDetails(item.id).then(response => ({
                        ...response.data,
                        quantity: item.quantity
                    }))
                )
            );
            setCartItems(products);
            calculateTotal(products);
        };

        fetchProducts();
    }, [cartitem]);

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(total);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white relative">
            <Link className="text-4xl inline-block hover:bg-base-taupe hover:rounded-full hover:text-white text-base-taupe p-2" to="/"><IoIosArrowRoundBack /></Link>
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <CartList items={cartItems} handleAddToCart={onAddToCart}/>
            <CouponComponent /> 
            <div className='flex justify-end mt-6'>
            <table className='sm:w-2/5 border-2 p-4 w-full table-auto'>
                <thead className=' bg-gray-200'>
                    <tr className='w-full'>
                        <td colspan="2" className='text-lg py-2 px-4 w-full border-b'>Cart details</td>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td className='py-2 px-4 border-b'>Subtotal</td>
                        <td className='py-2 px-4 border-b'>${total.toFixed(2)}</td>
                    </tr>
                    <tr >
                        <td className='py-2 px-4 border-b'>Total</td>
                        <td className='py-2 px-4 border-b'>${total.toFixed(2)}</td>
                    </tr>
                <tr>
                    <td colspan="2">
                        <button className="mt-4 bg-base-taupe w-full text-white py-2 px-4 rounded hover:bg-base-drb">
                            Proceed to Checkout
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default CartPage;
