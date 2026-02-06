"use client";

import { useState, useCallback, useMemo } from "react";
import { Filter } from "lucide-react";
import { usePageRevealer } from "../../components/ui/PageTransition";
import ProductCard from "../../components/ui/ProductCard";
import ProductFilters from "../../components/ui/ProductFilters";
import MobileFilterOverlay from "../../components/ui/MobileFilterOverlay";
import { useProductFilters } from "../../hooks/useProductFilters";
import { Product } from "../../types/product";
import { PRODUCTS, getProductsByCategory, StaticProduct } from "../../styles/constants";

// Convert static product to UI product format
const convertToUIProduct = (staticProduct: StaticProduct): Product => ({
  id: staticProduct.id,
  name: staticProduct.name,
  subtitle: staticProduct.description,
  price: staticProduct.price,
  rating: 4, // Default rating
  imageFront: staticProduct.image,
  imageBack: staticProduct.image,
  hasSizes: false,
  category: staticProduct.category,
  step: "General",
  productType: staticProduct.category,
  concern: "General",
  ingredient: "Various",
  availability: staticProduct.inStock
});

function ShopPage() {
  // Add the page revealer animation
  usePageRevealer();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get products from static constants (instant, no DB call)
  const products = useMemo(() => {
    // Get category from URL params if present
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    
    // Filter by category if specified, otherwise show all
    const staticProducts = categoryFilter 
      ? getProductsByCategory(categoryFilter)
      : PRODUCTS;
    
    // Convert to UI format
    return staticProducts.map(convertToUIProduct);
  }, []);

  // Use the product filters hook
  const {
    filteredProducts,
    filterGroups,
    sortOptions,
    priceRange,
    handleFilterChange,
    getActiveFilterCount
  } = useProductFilters({ products });

  // Memoize the filter change handler to prevent unnecessary re-renders
  const memoizedHandleFilterChange = useCallback(handleFilterChange, [handleFilterChange]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="mb-16 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-heading-1 text-gray-900 mb-4">Shop</h1>
            <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of eco-friendly products. Each product is designed 
              for sustainability and conscious living.
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
                Showing {filteredProducts.length} of {products.length} products
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
                  No products found matching your filters.
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

export default ShopPage;