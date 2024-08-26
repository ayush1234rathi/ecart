import React, { useState, useMemo, useCallback, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import ProductListHome from './ProductListHome';
import P_Detail from './P_Detail';
import Notfound from './Notfound';
import CartPage from './CartPage';
import LoginPage from './LoginPage';
import EnhancedLoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';
import Alert from './Alert';
import UserProvider from "./providers/UserProvider"
import Alertprovider from './providers/Alertprovider';
import CartProvider from './providers/CartProvider';

  export const alertContext = createContext();
function App() {
  return (
        <UserProvider>
          <Alertprovider> 
            <CartProvider>
        {/* <Router> */}
              <div className="flex min-h-screen flex-col gap-11 bg-base-peach justify-between">
                <Header />
                <Alert />
                <div className='px-4'>
                  <Routes>
                    <Route path="/" element={<ProductListHome />} />
                    <Route path="/P_Detail/:id/" element={<P_Detail />} />
                    <Route path="*" element={<Notfound />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<AuthRoute><EnhancedLoginPage /></AuthRoute>} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                  </Routes>
                </div>
                <Footer />
              </div>
        {/* </Router> */}
            </CartProvider>
          </Alertprovider>
        </UserProvider>
  );
}

export default App;
