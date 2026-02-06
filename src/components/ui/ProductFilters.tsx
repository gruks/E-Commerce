"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, X, Filter } from "lucide-react";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  type: 'checkbox' | 'price-range';
  showMore?: boolean;
  maxVisible?: number;
}

export interface PriceRange {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
}

export interface FilterState {
  sortBy: string;
  selectedFilters: Record<string, string[]>;
  priceRange: PriceRange;
}

interface ProductFiltersProps {
  filterGroups: FilterGroup[];
  priceRange: PriceRange;
  sortOptions: { value: string; label: string }[];
  onFilterChange: (filters: FilterState) => void;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filterGroups,
  priceRange,
  sortOptions,
  onFilterChange,
  className = "",
  isOpen = false,
  onToggle
}) => {
  const [sortBy, setSortBy] = useState(sortOptions[0]?.value || "featured");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [currentPriceRange, setCurrentPriceRange] = useState(priceRange);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [showMoreGroups, setShowMoreGroups] = useState<Record<string, boolean>>({});

  // Initialize expanded groups
  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    filterGroups.forEach(group => {
      initialExpanded[group.id] = true; // Start with all groups expanded
    });
    setExpandedGroups(initialExpanded);
  }, [filterGroups]);

  // Update currentPriceRange when priceRange prop changes
  useEffect(() => {
    setCurrentPriceRange(priceRange);
  }, [priceRange]);

  // Helper function to get current filter state
  const getCurrentFilterState = useCallback((): FilterState => ({
    sortBy,
    selectedFilters,
    priceRange: currentPriceRange
  }), [sortBy, selectedFilters, currentPriceRange]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    // Defer parent notification to avoid setState during render
    setTimeout(() => {
      onFilterChange({
        sortBy: value,
        selectedFilters,
        priceRange: currentPriceRange
      });
    }, 0);
  };

  const handleFilterToggle = (groupId: string, optionValue: string) => {
    setSelectedFilters(prev => {
      const groupFilters = prev[groupId] || [];
      const isSelected = groupFilters.includes(optionValue);
      
      const newSelectedFilters = isSelected
        ? {
            ...prev,
            [groupId]: groupFilters.filter(v => v !== optionValue)
          }
        : {
            ...prev,
            [groupId]: [...groupFilters, optionValue]
          };

      // Defer parent notification to avoid setState during render
      setTimeout(() => {
        onFilterChange({
          sortBy,
          selectedFilters: newSelectedFilters,
          priceRange: currentPriceRange
        });
      }, 0);

      return newSelectedFilters;
    });
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    setCurrentPriceRange(prev => {
      const newPriceRange = {
        ...prev,
        [type === 'min' ? 'currentMin' : 'currentMax']: value
      };

      // Defer parent notification to avoid setState during render
      setTimeout(() => {
        onFilterChange({
          sortBy,
          selectedFilters,
          priceRange: newPriceRange
        });
      }, 0);

      return newPriceRange;
    });
  };

  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const toggleShowMore = (groupId: string) => {
    setShowMoreGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const clearAllFilters = () => {
    const clearedState = {
      sortBy: sortOptions[0]?.value || "featured",
      selectedFilters: {},
      priceRange: {
        ...priceRange,
        currentMin: priceRange.min,
        currentMax: priceRange.max
      }
    };

    setSelectedFilters({});
    setCurrentPriceRange({
      ...priceRange,
      currentMin: priceRange.min,
      currentMax: priceRange.max
    });
    setSortBy(sortOptions[0]?.value || "featured");

    // Defer parent notification to avoid setState during render
    setTimeout(() => {
      onFilterChange(clearedState);
    }, 0);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(selectedFilters).forEach(filters => {
      count += filters.length;
    });
    if (currentPriceRange.currentMin !== priceRange.min || 
        currentPriceRange.currentMax !== priceRange.max) {
      count += 1;
    }
    return count;
  };

  const renderFilterGroup = (group: FilterGroup) => {
    const isExpanded = expandedGroups[group.id];
    const showMore = showMoreGroups[group.id];
    const maxVisible = group.maxVisible || 5;
    const visibleOptions = showMore ? group.options : group.options.slice(0, maxVisible);
    const hasMoreOptions = group.options.length > maxVisible;

    if (group.type === 'price-range') {
      return (
        <div key={group.id} className="border-b border-border-default pb-6">
          <button
            onClick={() => toggleGroupExpansion(group.id)}
            className="flex items-center justify-between w-full py-3 text-left"
          >
            <span className="text-body-medium font-medium text-text-muted">
              {group.label}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-muted" />
            )}
          </button>
          
          {isExpanded && (
            <div className="price-range">
              <div className="price-inputs">
                <div className="price-field">
                  <div className="relative">
                    <span className="field__currency">₹</span>
                    <input
                      type="number"
                      value={currentPriceRange.currentMin}
                      onChange={(e) => handlePriceRangeChange('min', Number(e.target.value))}
                      className="field__input"
                      min={0}
                      max={priceRange.max}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <span className="price-to-label">to</span>
                
                <div className="price-field">
                  <div className="relative">
                    <span className="field__currency">₹</span>
                    <input
                      type="number"
                      value={currentPriceRange.currentMax}
                      onChange={(e) => handlePriceRangeChange('max', Number(e.target.value))}
                      className="field__input"
                      min={0}
                      max={priceRange.max}
                      placeholder={priceRange.max.toString()}
                    />
                  </div>
                </div>
              </div>
              
              {/* Dual Range Slider */}
              <div className="relative w-full h-6 dual-range-slider">
                {/* Track */}
                <div className="dual-range-slider__track" />
                
                {/* Active range */}
                <div 
                  className="dual-range-slider__range"
                  style={{
                    left: `calc(${(currentPriceRange.currentMin / priceRange.max) * 100}% + 8px)`,
                    width: `calc(${((currentPriceRange.currentMax - currentPriceRange.currentMin) / priceRange.max) * 100}% - 16px)`
                  }}
                />
                
                {/* Min input */}
                <input
                  type="range"
                  min={0}
                  max={priceRange.max}
                  value={currentPriceRange.currentMin}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value <= currentPriceRange.currentMax) {
                      handlePriceRangeChange('min', value);
                    }
                  }}
                  className="dual-range-slider__input"
                  style={{ zIndex: currentPriceRange.currentMin > priceRange.max - 100 ? 5 : 3 }}
                />
                
                {/* Max input */}
                <input
                  type="range"
                  min={0}
                  max={priceRange.max}
                  value={currentPriceRange.currentMax}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= currentPriceRange.currentMin) {
                      handlePriceRangeChange('max', value);
                    }
                  }}
                  className="dual-range-slider__input"
                  style={{ zIndex: currentPriceRange.currentMax < 100 ? 5 : 3 }}
                />
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={group.id} className="border-b border-border-default pb-6">
        <button
          onClick={() => toggleGroupExpansion(group.id)}
          className="flex items-center justify-between w-full py-3 text-left"
        >
          <span className="text-body-medium font-medium text-text-primary">
            {group.label}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-muted" />
          )}
        </button>
        
        {isExpanded && (
          <div className="space-y-3">
            <ul className="space-y-2">
              {visibleOptions.map((option) => {
                const isSelected = selectedFilters[group.id]?.includes(option.value) || false;
                return (
                  <li key={option.id}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleFilterToggle(group.id, option.value)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 border-2 rounded transition-colors ${
                          isSelected 
                            ? 'bg-white border-white' 
                            : 'border-transparent bg-transparent'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-black absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-body text-text-secondary group-hover:text-text-primary transition-colors">
                        {option.label}
                        {option.count && (
                          <span className="text-text-muted ml-1">({option.count})</span>
                        )}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            
            {hasMoreOptions && (
              <button
                onClick={() => toggleShowMore(group.id)}
                className="text-brand-primary text-body-small font-medium hover:text-brand-hover transition-colors"
              >
                {showMore ? 'Show less' : `Show more (${group.options.length - maxVisible} more)`}
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 px-4 py-2 border border-border-default rounded-lg text-body-medium text-text-secondary hover:bg-bg-secondary transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="bg-brand-primary text-black text-xs px-2 py-0.5 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`
        ${className}
        ${isOpen ? 'block' : 'hidden lg:block'}
        bg-bg-tertiary p-6
        lg: lg:top-6 lg:h-fit mb-12
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-heading-3 text-text-primary">Filters</h3>
          <div className="flex items-center gap-2">
            {getActiveFilterCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-brand-primary text-body-small font-medium hover:text-brand-hover transition-colors"
              >
                Clear all
              </button>
            )}
            {onToggle && (
              <button
                onClick={onToggle}
                className="lg:hidden p-1 hover:bg-bg-secondary rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-6 pb-6">
          <label className="block text-body-medium font-medium text-text-primary mb-3">
            Sort by:
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full input input-square appearance-none pr-10 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Filter Groups */}
        <div className="space-y-6">
          {filterGroups.map(renderFilterGroup)}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-white bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default ProductFilters;