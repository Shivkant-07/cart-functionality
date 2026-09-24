import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.some((item) => item.id === product.id);
    setIsWishlisted(exists);
  }, [product]);

  if (!product) return null;

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

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (isWishlisted) {
      wishlist = wishlist.filter((item) => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      wishlist.push(product);
      setIsWishlisted(true);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('storageUpdate'));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col overflow-hidden group">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <button 
          onClick={toggleWishlist}
          className="absolute top-3 right-3 text-2xl drop-shadow-md hover:scale-125 transition-transform z-10 focus:outline-none"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            {product.fabric.split(' ')[0]}
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
            onClick={addToCart}
            className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}