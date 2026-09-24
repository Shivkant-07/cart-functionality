import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#131921] text-gray-300 pt-12 pb-8 px-6 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-white flex items-center gap-1">
            ShivAkash <span className="text-amber-400 text-base font-bold">.in</span>
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your trusted marketplace for trendy fashion, premium quality fabrics, and everyday lifestyle essentials delivered right to your doorstep.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-amber-400 transition-colors">My Wishlist</Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-amber-400 transition-colors">Shopping Cart</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Customer Policies */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">Consumer Policy</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li className="hover:text-amber-400 cursor-pointer transition-colors">Cancellation & Returns</li>
            <li className="hover:text-amber-400 cursor-pointer transition-colors">Terms of Use</li>
            <li className="hover:text-amber-400 cursor-pointer transition-colors">Security & Privacy</li>
            <li className="hover:text-amber-400 cursor-pointer transition-colors">Sitemap</li>
          </ul>
        </div>

        {/* Column 4: Registered Address */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">Registered Office</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            ShivAkash E-Commerce Pvt Ltd,<br />
            Indore Technology Hub,<br />
            Madhya Pradesh, India - 452001
          </p>
          <div className="mt-4 text-xs text-amber-400 font-semibold">
            <span>📞 Helpline: 1800-123-4567</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© 2026 ShivAkash Store. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <span className="hover:text-amber-400 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors">Help Center</span>
        </div>
      </div>
    </footer>
  );
}