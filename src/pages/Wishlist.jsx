import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('storageUpdate'));
  };

  const moveToCart = (product) => {
    // Cart me add karein
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    // Wishlist se remove karein
    removeFromWishlist(product.id);

    window.dispatchEvent(new Event('storageUpdate'));
    alert('Moved to cart successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <p className="text-xl text-gray-500 mb-6">Your wishlist is empty.</p>
            <Link to="/" className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition-colors">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between group">
                <div>
                  <Link to={`/product/${product.id}`} className="block aspect-square bg-gray-100 relative overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-gray-900 line-clamp-1 hover:text-indigo-600 transition-colors">{product.title}</h3>
                    </Link>
                    <p className="text-indigo-600 font-extrabold mt-1">₹{product.price}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.fabric}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex gap-2">
                  <button 
                    onClick={() => moveToCart(product)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-xl shadow-md transition-all"
                  >
                    Move to Cart
                  </button>
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="bg-gray-100 hover:bg-rose-50 hover:text-rose-500 text-gray-600 text-xs font-bold px-3 py-2.5 rounded-xl transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}