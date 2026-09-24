import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white py-16 px-6 mb-10 text-center shadow-inner">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Discover Modern Essentials
          </h1>
          <p className="text-indigo-200 text-lg mb-8">
            Handcrafted fabrics, superior quality, and trendsetting styles delivered straight from Indore.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Trending Collection</h2>
          <span className="text-sm text-gray-500 font-medium">{products.length} Products Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}