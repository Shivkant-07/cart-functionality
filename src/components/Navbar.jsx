import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // LocalStorage se count sync karne ka function
  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setCartCount(cart.reduce((acc, item) => acc + item.qty, 0));
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();
    // Custom event listener tab kaam karega jab kisi component me items update honge
    window.addEventListener('storageUpdate', updateCounts);
    return () => window.removeEventListener('storageUpdate', updateCounts);
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          ShivAkash Store
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home</Link>
          
          <Link to="/wishlist" className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors">
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm animate-pulse">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}