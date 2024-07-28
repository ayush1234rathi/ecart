import React, { useState, useCallback, useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductListHome from './ProductListHome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import P_Detail from './P_Detail';
import Notfound from './Notfound';
import CartPage from './CartPage';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp'

function App() {
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
  function updateCart(newCart){
    setCart(newCart);
    console.log(cart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem('myCartItem', cartString);
  }


  // const handleUpdate = useCallback((productId, count) => {
  //   const newCart = { ...cart, [productId]: count };
  //   const filteredCart = Object.fromEntries(
  //     Object.entries(newCart).filter(([key, value]) => value !== 0)
  //   );
  //   setCart(filteredCart);
  //   const cartString = JSON.stringify(filteredCart);
  //   localStorage.setItem('myCartItem', cartString);
  // }, [cart]);

  const totalCount = useMemo(() => {
    return Object.keys(cart).reduce((previous, current) => {
      return previous + cart[current];
    }, 0);
  }, [cart]);

  return (
    <div className="flex min-h-screen flex-col gap-11 bg-base-peach justify-between">
      <Header productCount={totalCount} />
      <div className='px-4'>
        <Routes>
          <Route index element={<ProductListHome />} />
          <Route path="/P_Detail/:id/" element={<P_Detail onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage cartitem={cart}  updateCart={updateCart} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
