import React from 'react';
import { motion } from 'framer-motion';
import { Search, Camera } from 'lucide-react';
import ProductCard from './ProductCard';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const ProductGrid = ({
  loading,
  filteredProducts,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  categories,
}) => {
  return (
    <section id="products-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-500 rounded-xl px-4 py-2.5 w-full sm:w-64 focus-within:border-blue-500 transition-colors">
              <Search className="w-4 h-4 text-gray-600 shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-700"
              />
            </div>

            {/* Category filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.slice(0, 6).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap text-xs font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <Camera className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-black text-gray-400">No products found</h3>
            <p className="text-gray-400 text-sm mt-2">
              {searchQuery ? 'Try a different search term' : 'Check back soon for new arrivals'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-500 font-semibold text-sm cursor-pointer hover:underline"
              >
                Clear search
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory + searchQuery}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
