"use client";

import { memo, useState, useCallback } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { OrderStatus, OrderFilters as OrderFiltersType } from '@/src/types/order';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderFiltersProps {
  filters: OrderFiltersType;
  onFiltersChange: (filters: OrderFiltersType) => void;
  className?: string;
}

const statusOptions: OrderStatus[] = [
  'processing',
  'shipped', 
  'out-for-delivery',
  'delivered',
  'cancelled'
];

export const OrderFilters = memo(({ 
  filters, 
  onFiltersChange, 
  className = '' 
}: OrderFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    onFiltersChange({
      ...filters,
      searchQuery: value || undefined
    });
  }, [filters, onFiltersChange]);

  const handleStatusToggle = useCallback((status: OrderStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    onFiltersChange({
      ...filters,
      status: newStatuses.length > 0 ? newStatuses : undefined
    });
  }, [filters, onFiltersChange]);

  const handleDateRangeChange = useCallback((field: 'start' | 'end', value: string) => {
    const currentRange = filters.dateRange || { start: '', end: '' };
    const newRange = { ...currentRange, [field]: value };
    
    onFiltersChange({
      ...filters,
      dateRange: (newRange.start || newRange.end) ? newRange : undefined
    });
  }, [filters, onFiltersChange]);

  const handlePriceRangeChange = useCallback((field: 'min' | 'max', value: string) => {
    const numValue = parseFloat(value) || 0;
    const currentRange = filters.priceRange || { min: 0, max: 0 };
    const newRange = { ...currentRange, [field]: numValue };
    
    onFiltersChange({
      ...filters,
      priceRange: (newRange.min > 0 || newRange.max > 0) ? newRange : undefined
    });
  }, [filters, onFiltersChange]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    onFiltersChange({});
  }, [onFiltersChange]);

  const hasActiveFilters = !!(
    filters.searchQuery ||
    (filters.status && filters.status.length > 0) ||
    filters.dateRange ||
    filters.priceRange
  );

  return (
    <div className={`bg-gray-50 border border-gray-200 p-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order number or product name..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E2A47] focus:border-transparent text-sm"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Advanced Filters
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => {
                const isSelected = filters.status?.includes(status) || false;
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusToggle(status)}
                    className={`
                      transition-all duration-200 transform hover:scale-105
                      ${isSelected ? 'ring-2 ring-[#0E2A47] ring-offset-1' : ''}
                    `}
                  >
                    <OrderStatusBadge 
                      status={status} 
                      className={isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-80'}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={filters.dateRange?.start || ''}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E2A47] focus:border-transparent text-sm"
                placeholder="Start date"
              />
              <input
                type="date"
                value={filters.dateRange?.end || ''}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E2A47] focus:border-transparent text-sm"
                placeholder="End date"
              />
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.priceRange?.min || ''}
                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E2A47] focus:border-transparent text-sm"
                placeholder="Min price"
              />
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.priceRange?.max || ''}
                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E2A47] focus:border-transparent text-sm"
                placeholder="Max price"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

OrderFilters.displayName = 'OrderFilters';