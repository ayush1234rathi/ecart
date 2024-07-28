import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CartList from './CartList';
import CouponComponent from './CouponComponent.jsx';
import { IoIosArrowRoundBack } from "react-icons/io";
import {Link} from 'react-router-dom';
import {getProductsDetails} from './Api';
import Loading from './Loading';

function CartPage({ cartitem, updateCart }){
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [localCart, setLocalCart] = useState(cartitem);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const myProductPromises = Object.keys(cartitem).map((itemId) =>
                getProductsDetails(itemId)
            );
            const products = await Promise.all(myProductPromises);
            setCartItems(products);
            setLoading(false);
        };

        fetchProductDetails();
    }, [cartitem]);

    useEffect(() => {
        setLocalCart(cartitem);
    }, [cartitem]);

    useEffect(() => {
        const calculateTotal = () => {
            let newTotal = 0;
            for (let i = 0; i < cartItems.length; i++) {
                newTotal += cartItems[i].price * (localCart[cartItems[i].id] || 0);
            }
            setTotal(newTotal);
        };

        calculateTotal();
    }, [cartItems, localCart]);

    const handleUpdateCart = useCallback(() => {
        updateCart(localCart);
    }, [localCart, updateCart]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white relative">
            <Link className="text-4xl inline-block hover:bg-base-taupe hover:rounded-full hover:text-white text-base-taupe p-2" to="/"><IoIosArrowRoundBack /></Link>
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <CartList 
                items={cartItems} 
                setLocalCart={setLocalCart} 
                localCart={localCart} 
                updateCart={updateCart} />
            {/* <CouponComponent />  */}
            <div className='flex justify-between items-center mt-4 flex-wrap gap-3'>
                <div className="flex items-center flex-wrap gap-3">
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded-md shrink sm:shrink-0"
                        placeholder="Coupon code"
                    />
                    <button
                        className="bg-base-taupe text-white py-2 px-4 rounded-md hover:bg-base-drb">
                        APPLY COUPON
                    </button>
                </div>
                <button
                    className="bg-base-taupe text-white py-2 px-4 rounded-md hover:bg-base-drb"
                    onClick={handleUpdateCart}
                >
                    UPDATE CART
                </button>
            </div>
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
                    <td colSpan="2">
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
