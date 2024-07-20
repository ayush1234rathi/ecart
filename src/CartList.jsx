// src/CartList.js
import React from 'react';
import CartRow from './CartRow';

const CartList = ({ items }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <CartRow key={item.id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartList;
