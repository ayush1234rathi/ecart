import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const savedDataString = localStorage.getItem('myCartItem') || "{}";
  const savedData = JSON.parse(savedDataString);

  const [cart, setCart] = useState(savedData);

  const handleAddToCart = useCallback((productId, count) => {
    const oldCount = cart[productId] || 0;
    const newCart = { ...cart, [productId]: oldCount + count };
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem('myCartItem', cartString);
  }, [cart]);

  const handleUpdate = useCallback((productId, count) => {
    const newCart = { ...cart, [productId]: count };
    const filteredCart = Object.fromEntries(
      Object.entries(newCart).filter(([key, value]) => value !== 0)
    );
    setCart(filteredCart);
    const cartString = JSON.stringify(filteredCart);
    localStorage.setItem('myCartItem', cartString);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, handleUpdate }}>
      {children}
    </CartContext.Provider>
  );
};
