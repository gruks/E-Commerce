"use client";

import { useState, useCallback } from "react";
import { Filter, Award } from "lucide-react";
import { usePageRevealer } from "../../components/ui/PageTransition";
import ProductCard from "../../components/ui/ProductCard";
import ProductFilters from "../../components/ui/ProductFilters";
import MobileFilterOverlay from "../../components/ui/MobileFilterOverlay";
import { useProductFilters } from "../../hooks/useProductFilters";
import { Product } from "../../types/product";

// Enhanced mock product data with filter properties - All products
const allProducts: Product[] = [
  {
    id: "1",
    name: "Salicylic Acid + LHA 2% Cleanser",
    subtitle: "Acne, Blackheads & Oil control",
    price: 284,
    rating: 4.2, // Best seller (>= 3.5)
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false,
    category: "Skin",
    step: "Cleanse",
    productType: "Cleanser",
    concern: "Acne",
    ingredient: "BHA / Salicylic Acid",
    availability: true
  },
  {
    id: "2",
    name: "SPF 50 Sunscreen",
    subtitle: "Sun protection + Antioxidants damage",
    price: 729,
    rating: 4.8, // Best seller (>= 3.5)
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false,
    category: "Skin",
    step: "SPF",
    productType: "SPF",
    concern: "Sun Protection",
    ingredient: "UV Filters",
    availability: true
  },
  {
    id: "3",
    name: "Vitamin B5 10% Moisturizer",
    subtitle: "Enhanced barrier, long & well-hydrated",
    price: 312,
    rating: 3.8, // Best seller (>= 3.5)
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false,
    category: "Skin",
    step: "Moisturize",
    productType: "Moisturizer",
    concern: "Dry Skin",
    ingredient: "Vitamin B5",
    availability: true
  },
  {
    id: "4",
    name: "Hyaluronic Acid Serum",
    subtitle: "Deep hydration & plumping effect",
    price: 445,
    rating: 4.9, // Best seller (>= 3.5)
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false,
    category: "Skin",
    step: "Treat",
    productType: "Serum",
    concern: "Dry Skin",
    ingredient: "Hyaluronic Acid",
    availability: true
  },
  {
    id: "5",
    name: "Niacinamide 10% + Zinc",
    subtitle: "Pore control & oil regulation",
    price: 356,
    rating: 3.2, // Not a best seller (< 3.5)
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false,
    category: "Skin",
    step: "Treat",
    productType: "Serum",
    concern: "Acne",
    ingredient: "Niacinamide",
    availability: false
  },
  {
    id: "6",
    name: "Retinol 0.5% Night Serum",
    subtitle: "Anti-aging & skin renewal",
    price: 567,
    rating: 4.7, // Best seller (>= 3.5)
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false,
    category: "Skin",
    step: "Treat",
    productType: "Serum",
    concern: "Anti-aging",
    ingredient: "Retinol",
    availability: true
  },
  {
    id: "7",
    name: "Glycolic Acid Toner",
    subtitle: "Exfoliation & brightening",
    price: 298,
    rating: 3.1, // Not a best seller (< 3.5)
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false,
    category: "Skin",
    step: "Tone",
    productType: "Toner",
    concern: "Uneven / Bumpy Texture",
    ingredient: "AHA",
    availability: true
  },
  {
    id: "8",
    name: "Ceramide Repair Cream",
    subtitle: "Barrier repair & overnight healing",
    price: 423,
    rating: 4.5, // Best seller (>= 3.5)
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false,
    category: "Body",
    step: "Moisturize",
    productType: "Body Lotion",
    concern: "Dry Skin",
    ingredient: "Ceramides",
    availability: true
  },
  {
    id: "9",
    name: "Vitamin C Brightening Serum",
    subtitle: "Brightens skin tone & reduces dark spots",
    price: 399,
    rating: 3.6, // Best seller (>= 3.5)
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false,
    category: "Skin",
    step: "Treat",
    productType: "Serum",
    concern: "Uneven / Bumpy Texture",
    ingredient: "Vitamin C",
    availability: true
  },
  {
    id: "10",
    name: "Basic Face Wash",
    subtitle: "Simple daily cleanser",
    price: 199,
    rating: 2.8, // Not a best seller (< 3.5)
    imageFront: "/placeholder.svg",
    imageBack: "/placeholder.svg",
    hasSizes: false,
    category: "Skin",
    step: "Cleanse",
    productType: "Cleanser",
    concern: "General",
    ingredient: "Gentle Surfactants",
    availability: true
  }
];

// Filter products with rating >= 3.5 to get best sellers
const bestSellerProducts: Product[] = allProducts.filter(product => product.rating >= 3.5);

function BestSellersPage() {
  // Add the page revealer animation with CustomEase "hop" effect
  usePageRevealer();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Use the product filters hook with best seller products
  const {
    filteredProducts,
    filterGroups,
    sortOptions,
    priceRange,
    handleFilterChange,
    getActiveFilterCount
  } = useProductFilters({ products: bestSellerProducts });

  // Memoize the filter change handler to prevent unnecessary re-renders
  const memoizedHandleFilterChange = useCallback(handleFilterChange, [handleFilterChange]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="mb-16 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-4">
            <h1 className="text-heading-1 text-gray-900 ">Best Sellers</h1>
             <p className="text-xs font-semibold text-gray-500">
                Top Selling Products of necter<span className="text-[#fc6902]">.</span>
              </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="flex justify-end items-center">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
              {getActiveFilterCount() > 0 && (
                <span className="bg-brand-primary text-white text-xs px-2 py-0.5 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 pb-24">
        <div className="flex gap-12 min-h-[calc(100vh-24rem)]">
          {/* Desktop Filters Sidebar - Hidden on mobile */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <ProductFilters
              filterGroups={filterGroups}
              priceRange={priceRange}
              sortOptions={sortOptions}
              onFilterChange={memoizedHandleFilterChange}
            />
          </div>

          {/* Products */}
          <div className="flex-1 min-h-full">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {bestSellerProducts.length} best-selling products
                {getActiveFilterCount() > 0 && (
                  <span className="ml-2 text-brand-primary">
                    ({getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} applied)
                  </span>
                )}
              </p>
             
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-3 min-h-[400px]">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 min-h-[400px] flex flex-col justify-center">
                <p className="text-body-large text-text-muted mb-4">
                  No best-selling products found matching your filters.
                </p>
                <button
                  onClick={() => memoizedHandleFilterChange({
                    sortBy: "featured",
                    selectedFilters: {},
                    priceRange: { ...priceRange, currentMin: priceRange.min, currentMax: priceRange.max }
                  })}
                  className="btn btn-secondary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <MobileFilterOverlay
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterGroups={filterGroups}
        priceRange={priceRange}
        sortOptions={sortOptions}
        onFilterChange={memoizedHandleFilterChange}
        activeFilterCount={getActiveFilterCount()}
      />
    </div>
  );
}

export default BestSellersPage;