import React from 'react';
import { Link } from 'react-router';

export default function ProductCard({ product }) {
  const addToCart = (e) => {
    e.preventDefault();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storageUpdate'));
    alert('Product added to cart successfully!');
  };

  const addToWishlist = (e) => {
    e.preventDefault();
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.some((item) => item.id === product.id);

    if (!exists) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      window.dispatchEvent(new Event('storageUpdate'));
      alert('Added to wishlist!');
    } else {
      alert('Product is already in your wishlist.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group">
      <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square bg-gray-100 block">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          onClick={addToWishlist}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 hover:text-rose-500 p-2 rounded-full shadow-md backdrop-blur-sm transition-colors"
          title="Add to Wishlist"
        >
          ❤️
        </button>
      </Link>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            {product.fabric.split(' ')[0]}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-gray-900 mt-2 text-lg line-clamp-1 hover:text-indigo-600 transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
          <button 
            onClick={addToCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-indigo-200 transition-all active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}