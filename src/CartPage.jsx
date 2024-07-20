import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartList from './CartList';
import CouponComponent from './CouponComponent.jsx';

export function getProductsDetails(id) {
    return axios.get('https://dummyjson.com/products/' + id);
}

function CartPage({ cartitem }){
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const convertCartItemToArray = (cartitem) => {
            return Object.entries(cartitem).map(([key, value]) => ({
                id: parseInt(key, 10), // assuming keys are string representations of numbers
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
    }, []);

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(total);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <CartList items={cartItems} />
            <CouponComponent /> 
            <div className="mt-6 p-4 border-t border-gray-200">
                <p className="text-lg">Subtotal: ${total.toFixed(2)}</p>
                <p className="text-lg">Total: ${total.toFixed(2)}</p>
                <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;
