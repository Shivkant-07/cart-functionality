import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('storageUpdate', loadCart);
    return () => window.removeEventListener('storageUpdate', loadCart);
  }, []);

  const updateQuantity = (index, delta) => {
    const updated = [...cartItems];
    updated[index].qty += delta;

    if (updated[index].qty <= 0) {
      updated.splice(index, 1);
    }

    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('storageUpdate'));
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('storageUpdate'));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = Math.round(totalAmount * 0.15);
  const deliveryFee = totalAmount > 499 ? 0 : 40;
  const finalPayable = totalAmount - discountAmount + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 text-sm mb-6 text-center max-w-sm">
          Looks like you haven't added anything to your cart yet. Explore our top collection!
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
          Shopping Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)} Items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center gap-6">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover rounded-xl border border-gray-100 bg-gray-50"
                />

                <div className="flex-grow text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Size: {item.size || 'M'}
                  </span>
                  <h3 className="font-bold text-gray-900 text-base mt-1.5">{item.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{item.description}</p>
                  <div className="text-lg font-extrabold text-gray-900 mt-2">₹{item.price}</div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden shadow-xs">
                    <button 
                      onClick={() => updateQuantity(index, -1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-sm font-bold text-gray-900 bg-white">{item.qty}</span>
                    <button 
                      onClick={() => updateQuantity(index, 1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={() => removeItem(index)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Price Details Sidebar */}
          <div className="lg:col-span-4 self-start">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 uppercase tracking-wide">
                Price Details
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span className="font-semibold text-gray-900">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount on MRP</span>
                  <span className="font-semibold text-green-600">-₹{discountAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-gray-900">
                    {deliveryFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="text-base font-extrabold text-gray-900">Total Amount</span>
                <span className="text-xl font-black text-gray-900">₹{finalPayable}</span>
              </div>

              <button 
                onClick={() => alert('Order Placed Successfully! Thank you for shopping with ShivAkash Store.')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-extrabold py-3.5 rounded-xl shadow-md transition-all active:scale-95 text-sm"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}