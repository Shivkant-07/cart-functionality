import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  const loadWishlist = () => {
    const items = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(items);
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener('storageUpdate', loadWishlist);
    return () => window.removeEventListener('storageUpdate', loadWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('storageUpdate'));
  };

  const moveToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ ...product, qty: 1, size: 'M' });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    removeFromWishlist(product.id);
    window.dispatchEvent(new Event('storageUpdate'));
    alert('Product moved to cart!');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🤍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Wishlist is Empty</h2>
        <p className="text-gray-500 text-sm mb-6 text-center max-w-sm">
          Save items that you like in your wishlist and review them anytime here.
        </p>
        <Link 
          to="/" 
          className="bg-[#131921] hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 border-l-4 border-amber-500 pl-3">
          My Wishlist ({wishlistItems.length} Items)
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col overflow-hidden group">
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-500 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all font-bold text-sm"
                  title="Remove"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {product.fabric ? product.fabric.split(' ')[0] : 'Fashion'}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-gray-900 mt-2 text-base line-clamp-1 hover:text-amber-600 transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{product.description}</p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
                  <button 
                    onClick={() => moveToCart(product)}
                    className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}