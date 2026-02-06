"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import ProductFilters, { FilterGroup, PriceRange, FilterState } from "./ProductFilters";

interface MobileFilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  filterGroups: FilterGroup[];
  priceRange: PriceRange;
  sortOptions: { value: string; label: string }[];
  onFilterChange: (filters: FilterState) => void;
  activeFilterCount: number;
}

const MobileFilterOverlay: React.FC<MobileFilterOverlayProps> = ({
  isOpen,
  onClose,
  filterGroups,
  priceRange,
  sortOptions,
  onFilterChange,
  activeFilterCount
}) => {
  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Overlay Panel */}
      <div className="absolute inset-x-0 bottom-0 bg-bg-tertiary rounded-t-2xl max-h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-default">
          <div className="flex items-center gap-3">
            <h2 className="text-heading-3 text-text-primary">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-brand-primary text-black text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <ProductFilters
              filterGroups={filterGroups}
              priceRange={priceRange}
              sortOptions={sortOptions}
              onFilterChange={onFilterChange}
              className="border-0 p-0 bg-transparent"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border-default bg-bg-tertiary">
          <div className="flex gap-3">
            <button
              onClick={() => {
                onFilterChange({
                  sortBy: "featured",
                  selectedFilters: {},
                  priceRange: { ...priceRange, currentMin: priceRange.min, currentMax: priceRange.max }
                });
              }}
              className="flex-1 btn btn-secondary"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 btn btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterOverlay;