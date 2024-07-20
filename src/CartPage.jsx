// src/CartPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartList from './CartList';

export function getProductsDetails(id) {
    return axios.get('https://dummyjson.com/products/' + id);
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Assuming you have the cart item IDs stored in local storage or state
        const cart = [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 4 }
        ];

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
        <div>
            <h1>Your Cart</h1>
            <CartList items={cartItems} />
            <div className="cart-totals">
                <p>Subtotal: ${total.toFixed(2)}</p>
                <p>Total: ${total.toFixed(2)}</p>
                <button>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default CartPage;
