import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';

// Note: ProductDetail aur Wishlist Akash ki files hain, unhe import karne ke liye 
// Akash jab apni file banaye tab yahan route laga dena:
// import ProductDetail from './pages/ProductDetail';
// import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
        {/* <Route path="/wishlist" element={<Wishlist />} /> */}
      </Routes>
    </BrowserRouter>
  );
}