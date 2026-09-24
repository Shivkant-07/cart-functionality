import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setCartCount(cart.reduce((acc, item) => acc + item.qty, 0));
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener('storageUpdate', updateCounts);
    return () => window.removeEventListener('storageUpdate', updateCounts);
  }, []);

  return (
    <nav className="bg-[#131921] text-white sticky top-0 z-50 px-6 py-3.5 shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand / Logo (Amazon Style) */}
        <Link to="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
          ShivAkash <span className="text-amber-400 text-base font-bold">.in</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-8 text-sm font-medium">
          <Link to="/" className="text-gray-200 hover:text-amber-400 transition-colors">
            Home
          </Link>
          
          <Link to="/wishlist" className="relative text-gray-200 hover:text-amber-400 transition-colors">
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-amber-500 text-gray-950 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative text-gray-200 hover:text-amber-400 transition-colors flex items-center gap-1.5 bg-gray-800 px-3.5 py-2 rounded-xl border border-gray-700 hover:border-amber-400 transition-all">
            <span>🛒 Cart</span>
            {cartCount > 0 && (
              <span className="bg-amber-500 text-gray-950 text-xs px-2 py-0.5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}