"use client";

import { useState } from "react";
import { Filter, Grid3X3, List, ChevronDown } from "lucide-react";
import { usePageRevealer } from "../../components/ui/PageTransition";
import ProductGrid from "../../components/ui/ProductGrid";
import ProductCard from "../../components/ui/ProductCard";
import { Product } from "../../types/product";

// Mock product data with the new structure
const products: Product[] = [
  {
    id: "1",
    name: "Salicylic Acid + LHA 2% Cleanser",
    subtitle: "Acne, Blackheads & Oil control",
    price: 284,
    rating: 4,
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false
  },
  {
    id: "2",
    name: "SPF 50 Sunscreen",
    subtitle: "Sun protection + Antioxidants damage",
    price: 729,
    rating: 5,
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false
  },
  {
    id: "3",
    name: "Vitamin B5 10% Moisturizer",
    subtitle: "Enhanced barrier, long & well-hydrated",
    price: 312,
    rating: 4,
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false
  },
  {
    id: "4",
    name: "Hyaluronic Acid Serum",
    subtitle: "Deep hydration & plumping effect",
    price: 445,
    rating: 5,
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false
  },
  {
    id: "5",
    name: "Niacinamide 10% + Zinc",
    subtitle: "Pore control & oil regulation",
    price: 356,
    rating: 4,
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false
  },
  {
    id: "6",
    name: "Retinol 0.5% Night Serum",
    subtitle: "Anti-aging & skin renewal",
    price: 567,
    rating: 5,
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false
  },
  {
    id: "7",
    name: "Glycolic Acid Toner",
    subtitle: "Exfoliation & brightening",
    price: 298,
    rating: 4,
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false
  },
  {
    id: "8",
    name: "Ceramide Repair Cream",
    subtitle: "Barrier repair & overnight healing",
    price: 423,
    rating: 5,
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false
  }
];

function ShopPage() {
  // Add the page revealer animation with CustomEase "hop" effect
  usePageRevealer();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'skincare', name: 'Skincare', count: 6 },
    { id: 'suncare', name: 'Sun Care', count: 2 }
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-heading-1 text-gray-900 mb-4">Shop</h1>
            <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of premium skincare products. Each product is formulated with clean, 
              science-backed ingredients for healthy, glowing skin.
            </p>
          </div>

          {/* Filters & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        {/* Results Count */}
        <div className="px-4 sm:px-6 mb-6">
          <p className="text-sm text-gray-600">
            Showing {products.length} products
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </div>
    </div>
  );
}

export default ShopPage;