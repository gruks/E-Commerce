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
  rating: 4.5, // Default high rating for best sellers
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

function BestSellersPage() {
  // Add the page revealer animation with CustomEase "hop" effect
  usePageRevealer();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load best seller products from Supabase (featured products)
  useEffect(() => {
    const loadBestSellers = async () => {
      try {
        setLoading(true);
        const { data, error } = await productsService.getFeaturedProducts(20);
        
        if (error) {
          setError(error);
          return;
        }

        const uiProducts = data.map(convertToUIProduct);
        setBestSellerProducts(uiProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load best sellers');
      } finally {
        setLoading(false);
      }
    };

    loadBestSellers();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-body-large text-text-muted">Loading best sellers...</p>
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
            <p className="text-body-large text-red-600 mb-4">Error loading best sellers: {error}</p>
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