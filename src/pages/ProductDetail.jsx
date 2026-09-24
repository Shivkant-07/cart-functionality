import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);

    if (foundProduct) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const exists = wishlist.some((item) => item.id === foundProduct.id);
      setIsWishlisted(exists);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found!</h2>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemWithDetails = { ...product, size: selectedSize };
    const existingIndex = cart.findIndex((item) => item.id === product.id && item.size === selectedSize);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ ...itemWithDetails, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storageUpdate"));
    alert(`Added to cart! (Size: ${selectedSize})`);
  };

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (isWishlisted) {
      wishlist = wishlist.filter((item) => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      wishlist.push(product);
      setIsWishlisted(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("storageUpdate"));
  };

  const checkDelivery = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryStatus(`Delivery available by ${new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})}`);
    } else {
      setDeliveryStatus('Please enter a valid 6-digit Pincode');
    }
  };

  const originalPrice = Math.round(product.price * 1.4); // Mock MRP for discount display
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-indigo-600">Home</Link> / <span className="text-gray-800 font-medium">{product.title}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">
          
          {/* Left Column: Images */}
          <div className="lg:col-span-5 flex flex-col gap-4 sticky top-24 self-start">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100 shadow-inner">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover object-center" />
              <button 
                onClick={toggleWishlist}
                className="absolute top-4 right-4 text-3xl drop-shadow-md hover:scale-125 transition-transform z-10 focus:outline-none"
              >
                {isWishlisted ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <button 
                onClick={addToCart}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                🛒 Add to Cart
              </button>
              <button 
                onClick={() => { addToCart(); window.location.href = '/cart'; }}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                ⚡ Buy Now
              </button>
            </div>
          </div>

          {/* Right Column: Complete Details */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Title & Rating */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
                Top Brand
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
              
              {/* Ratings Badge */}
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-green-700 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  4.3 ★
                </span>
                <span className="text-sm text-gray-500 font-medium">1,428 Ratings & 214 Reviews</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-gray-900">₹{product.price}</span>
                <span className="text-lg text-gray-400 line-through">₹{originalPrice}</span>
                <span className="text-lg font-bold text-green-600">{discountPercent}% off</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Available Offers */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900">Available Offers</h3>
              <ul className="text-xs text-gray-700 space-y-1.5 bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
                <li>🏷️ **Bank Offer:** 10% instant discount on SBI Credit Cards, up to ₹500.</li>
                <li>🏷️ **Special Price:** Get extra 15% off (price inclusive of discount).</li>
                <li>🏷️ **Partner Offer:** Sign up for ShivAkash Pay Later and get Flipkart-style cashback worth ₹100.</li>
              </ul>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-900">Select Size</span>
                <span className="text-xs text-indigo-600 font-semibold cursor-pointer hover:underline">Size Chart</span>
              </div>
              <div className="flex gap-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full font-bold text-sm border transition-all ${
                      selectedSize === size 
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-md' 
                        : 'border-gray-300 text-gray-700 hover:border-indigo-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Delivery & Services</h3>
              <form onSubmit={checkDelivery} className="flex gap-2 max-w-sm">
                <input 
                  type="text" 
                  placeholder="Enter Pincode" 
                  maxLength="6"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-600 flex-grow"
                />
                <button type="submit" className="bg-gray-800 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-900">
                  Check
                </button>
              </form>
              {deliveryStatus && <p className="text-xs font-semibold text-green-600 mt-2">🚚 {deliveryStatus}</p>}
            </div>

            {/* Services Badges */}
            <div className="grid grid-cols-3 gap-3 text-center py-3 border-y border-gray-200">
              <div className="text-xs font-medium text-gray-600">🔄 7 Days Replacement</div>
              <div className="text-xs font-medium text-gray-600">💵 Cash on Delivery</div>
              <div className="text-xs font-medium text-gray-600">🛡️ Secure Transaction</div>
            </div>

            {/* Product Specifications Table */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Product Specifications</h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-sm space-y-2.5">
                <div className="grid grid-cols-3 border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-medium">Fabric</span>
                  <span className="col-span-2 font-semibold text-gray-900">{product.fabric}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-medium">Quality Standard</span>
                  <span className="col-span-2 font-semibold text-gray-900">{product.quality}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-medium">Sleeve / Pattern</span>
                  <span className="col-span-2 font-semibold text-gray-900">Standard Fit / Modern Design</span>
                </div>
                <div className="grid grid-cols-3 border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-medium">Wash Care</span>
                  <span className="col-span-2 font-semibold text-gray-900">Machine Wash Cold, Do Not Bleach</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500 font-medium">Supplier Address</span>
                  <span className="col-span-2 font-semibold text-gray-900">📍 {product.address}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed bg-white border border-gray-100 p-4 rounded-xl">
                {product.description} Crafted with premium-grade material designed for absolute comfort and durability throughout the day. Perfect for casual outings, daily wear, or formal occasions depending on how you style it.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}