"use client";

import { useState, useCallback, useEffect } from "react";
import { Filter } from "lucide-react";
import { usePageRevealer } from "../../components/ui/PageTransition";
import ProductCard from "../../components/ui/ProductCard";
import ProductFilters from "../../components/ui/ProductFilters";
import MobileFilterOverlay from "../../components/ui/MobileFilterOverlay";
import { useProductFilters } from "../../hooks/useProductFilters";
import { Product } from "../../types/product";
import { productsService } from "../../services/productsService";
import { Product as DatabaseProduct } from "../../types/database";

// Convert database product to UI product format
const convertToUIProduct = (dbProduct: DatabaseProduct): Product => ({
  id: dbProduct.id,
  name: dbProduct.name,
  subtitle: dbProduct.description,
  price: dbProduct.price,
  rating: 4, // Default rating since we don't have ratings in DB yet
  imageFront: dbProduct.image_url,
  imageBack: dbProduct.image_url,
  hasSizes: false,
  category: dbProduct.category,
  step: "General", // Default step
  productType: dbProduct.category,
  concern: "General", // Default concern
  ingredient: "Various", // Default ingredient
  availability: dbProduct.stock_quantity > 0
});

function ShopPage() {
  // Add the page revealer animation with CustomEase "hop" effect
  usePageRevealer();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products from Supabase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        
        // Get category from URL params if present
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFilter = urlParams.get('category');
        
        const filters = {
          inStock: true,
          ...(categoryFilter && { category: categoryFilter })
        };
        
        const { data, error } = await productsService.getProducts(filters);
        
        if (error) {
          setError(error);
          return;
        }

        const uiProducts = data.map(convertToUIProduct);
        setProducts(uiProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-body-large text-text-muted">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-body-large text-red-600 mb-4">Error loading products: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="mb-16 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-heading-1 text-gray-900 mb-4">Shop</h1>
            <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of premium skincare products. Each product is formulated with clean, 
              science-backed ingredients for healthy, glowing skin.
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