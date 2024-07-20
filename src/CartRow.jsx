// src/CartRow.js
import React from 'react';

const CartRow = ({ item }) => {
    return (
        <tr>
            <td>{item.title}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.quantity}</td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    );
};

export default CartRow;
