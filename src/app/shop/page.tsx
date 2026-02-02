"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, Grid3X3, List, ChevronDown, Star, Heart, ShoppingCart } from "lucide-react";

// Mock product data
const products = [
  {
    id: 1,
    name: "Vitamin C Serum",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg",
    badge: "Best Seller",
    category: "skincare"
  },
  {
    id: 2,
    name: "Hyaluronic Acid Moisturizer",
    price: 24.99,
    rating: 4.6,
    reviews: 89,
    image: "/placeholder.svg",
    category: "skincare"
  },
  {
    id: 3,
    name: "Gentle Foam Cleanser",
    price: 19.99,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg",
    category: "skincare"
  },
  {
    id: 4,
    name: "Niacinamide Treatment",
    price: 22.99,
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg",
    badge: "New",
    category: "skincare"
  },
  {
    id: 5,
    name: "SPF 50 Sunscreen",
    price: 27.99,
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg",
    category: "suncare"
  },
  {
    id: 6,
    name: "Body Moisturizer",
    price: 18.99,
    rating: 4.4,
    reviews: 67,
    image: "/placeholder.svg",
    category: "bodycare"
  }
];

const ProductCard = ({ product }: { product: any }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="card group overflow-hidden bg-bg-tertiary">
      <div className="relative aspect-square bg-bg-secondary overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-brand-primary text-text-primary text-xs px-2 py-1 rounded font-proxima font-medium">
            {product.badge}
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-bg-tertiary rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity border border-border-default"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-brand-primary text-brand-primary' : 'text-text-muted'}`} />
        </button>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="btn btn-primary w-full btn-sm font-proxima">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-heading-3 text-text-primary mb-2 hover:text-brand-primary transition-colors font-proxima-bold">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-body-small text-text-muted ml-1 font-proxima">{product.rating}</span>
          </div>
          <span className="text-body-small text-text-subtle font-proxima">({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-heading-3 text-text-primary font-proxima-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-body-small text-text-subtle line-through font-proxima">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const categories = ["All", "Skincare", "Body Care", "Hair Care", "Sun Care"];
  const priceRanges = ["Under $20", "$20 - $30", "$30 - $50", "Over $50"];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static top-0 left-0 h-full lg:h-auto w-80 lg:w-64 bg-white z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto lg:overflow-visible
      `}>
        <div className="p-6 lg:p-0">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-heading-2">Filters</h2>
            <button onClick={onClose} className="p-2 text-gray-600">
              <ChevronDown className="w-5 h-5 rotate-90" />
            </button>
          </div>
          
          <div className="space-y-8">
            {/* Categories */}
            <div>
              <h3 className="text-heading-3 text-gray-900 mb-4">Category</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input type="checkbox" className="mr-3 rounded" />
                    <span className="text-body text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div>
              <h3 className="text-heading-3 text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <label key={range} className="flex items-center">
                    <input type="checkbox" className="mr-3 rounded" />
                    <span className="text-body text-gray-700">{range}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Rating */}
            <div>
              <h3 className="text-heading-3 text-gray-900 mb-4">Rating</h3>
              <div className="space-y-3">
                {ratings.map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input type="checkbox" className="mr-3 rounded" />
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-body text-gray-700 ml-2">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border-default">
        <div className="container py-8">
          <h1 className="text-heading-1 text-text-primary mb-2 font-proxima-bold">All Products</h1>
          <p className="text-body-large text-text-secondary font-proxima">
            Discover our complete collection of clean, effective skincare products.
          </p>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="btn btn-secondary lg:hidden"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <span className="text-body text-gray-600">
                  Showing {products.length} products
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center bg-gray-100 rounded p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input py-2 px-3 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button className="btn btn-secondary">Previous</button>
                <button className="btn btn-primary">1</button>
                <button className="btn btn-ghost">2</button>
                <button className="btn btn-ghost">3</button>
                <button className="btn btn-secondary">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}