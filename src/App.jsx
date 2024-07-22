import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductListHome from './ProductListHome';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import P_Detail from './P_Detail';
import Notfound from './Notfound';
import CartPage from './CartPage';

function App() {
  const savedDataString = localStorage.getItem('myCartItem')|| "{}";
  const savedData=JSON.parse(savedDataString);

  const[cart , setCart]=useState(savedData);
  function handleAddToCart(productId, count) {
    const oldCount = cart[productId] || 0;
    const newCart= {...cart, [productId]: oldCount + count};
    setCart(newCart);
    console.log(cart);
    const cartString=JSON.stringify(newCart);
    localStorage.setItem('myCartItem',cartString);
  }
  function handleUpdate(productId, count) {
    const newCart = { ...cart, [productId]: count };
    const filteredCart = Object.fromEntries(
      Object.entries(newCart).filter(([key, value]) => value !== 0)
    );
    setCart(filteredCart);
    const cartString = JSON.stringify(filteredCart);
    localStorage.setItem('myCartItem', cartString);
  }

  const totalCount = Object.keys(cart).reduce((previous, current) => {
    return previous + cart[current];
  }, 0);

  return (
    <>
      <div className="flex min-h-screen flex-col gap-11 bg-base-peach justify-between">
        <Header productCount={totalCount}/>
        <div className='px-4'>
        <Routes>
           <Route
            index element={<ProductListHome  />}
            ></Route>
          <Route
            path="/P_Detail/:id/"
            element={<P_Detail onAddToCart={handleAddToCart} />}
             ></Route>
             <Route path="/cart" element={<CartPage cartitem={cart} onAddToCart={handleUpdate}/>} ></Route>
          <Route
             path="*"
            element={<Notfound/>}
             ></Route>
         </Routes>
         </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
