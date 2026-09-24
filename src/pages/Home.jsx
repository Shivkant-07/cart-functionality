import React from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section with distinct lighter shade (#1f2937) so it separates from Navbar */}
      <section className="bg-gray-800 text-white py-16 px-6 mb-10 text-center shadow-md border-t border-gray-700">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-gray-900 px-3 py-1.5 rounded-full border border-gray-700 shadow-xs">
            Best Quality Store 2026
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Find Your Favorite Clothes Here
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Best quality fabrics and latest styles at the best prices. Shop now and look amazing every day!
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-amber-500 pl-3">
            Trending Collection
          </h2>
          <span className="text-sm text-gray-500 font-semibold">{products.length} Items Available</span>
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