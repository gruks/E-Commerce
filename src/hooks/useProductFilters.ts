"use client";

import { useState, useMemo, useCallback } from "react";
import { FilterState, FilterGroup, PriceRange } from "../components/ui/ProductFilters";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  rating: number;
  imageFront: string;
  imageBack: string;
  hasSizes?: boolean;
  category?: string;
  step?: string;
  productType?: string;
  concern?: string;
  ingredient?: string;
  availability?: boolean;
  createdAt?: Date;
  [key: string]: any;
}

interface UseProductFiltersProps {
  products: Product[];
  initialFilters?: Partial<FilterState>;
}

export const useProductFilters = ({ products, initialFilters }: UseProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>(() => {
    // Calculate initial price range from products
    if (products.length === 0) {
      return {
        sortBy: initialFilters?.sortBy || "featured",
        selectedFilters: initialFilters?.selectedFilters || {},
        priceRange: initialFilters?.priceRange || {
          min: 0,
          max: 1000,
          currentMin: 0,
          currentMax: 1000
        }
      };
    }

    const prices = products.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return {
      sortBy: initialFilters?.sortBy || "featured",
      selectedFilters: initialFilters?.selectedFilters || {},
      priceRange: initialFilters?.priceRange || {
        min,
        max,
        currentMin: min,
        currentMax: max
      }
    };
  });

  // Calculate price range from products
  const priceRange = useMemo((): PriceRange => {
    if (products.length === 0) {
      return { min: 0, max: 1000, currentMin: 0, currentMax: 1000 };
    }

    const prices = products.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return {
      min,
      max,
      currentMin: filters.priceRange.currentMin,
      currentMax: filters.priceRange.currentMax
    };
  }, [products, filters.priceRange.currentMin, filters.priceRange.currentMax]);

  // Generate filter groups from products
  const filterGroups = useMemo((): FilterGroup[] => {
    const groups: FilterGroup[] = [];

    // Category filter
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    if (categories.length > 0) {
      groups.push({
        id: 'category',
        label: 'Category',
        type: 'checkbox',
        options: categories.map(cat => ({
          id: `category-${cat}`,
          label: cat!,
          value: cat!,
          count: products.filter(p => p.category === cat).length
        }))
      });
    }

    // Step filter
    const steps = [...new Set(products.map(p => p.step).filter(Boolean))];
    if (steps.length > 0) {
      groups.push({
        id: 'step',
        label: 'Step',
        type: 'checkbox',
        options: steps.map(step => ({
          id: `step-${step}`,
          label: step!,
          value: step!,
          count: products.filter(p => p.step === step).length
        }))
      });
    }

    // Product Type filter
    const productTypes = [...new Set(products.map(p => p.productType).filter(Boolean))];
    if (productTypes.length > 0) {
      groups.push({
        id: 'productType',
        label: 'Type of Product',
        type: 'checkbox',
        maxVisible: 5,
        options: productTypes.map(type => ({
          id: `productType-${type}`,
          label: type!,
          value: type!,
          count: products.filter(p => p.productType === type).length
        }))
      });
    }

    // Concern filter
    const concerns = [...new Set(products.map(p => p.concern).filter(Boolean))];
    if (concerns.length > 0) {
      groups.push({
        id: 'concern',
        label: 'Concern',
        type: 'checkbox',
        maxVisible: 5,
        options: concerns.map(concern => ({
          id: `concern-${concern}`,
          label: concern!,
          value: concern!,
          count: products.filter(p => p.concern === concern).length
        }))
      });
    }

    // Price filter
    groups.push({
      id: 'price',
      label: 'Price',
      type: 'price-range',
      options: []
    });

    // Ingredient filter
    const ingredients = [...new Set(products.map(p => p.ingredient).filter(Boolean))];
    if (ingredients.length > 0) {
      groups.push({
        id: 'ingredient',
        label: 'Ingredient',
        type: 'checkbox',
        maxVisible: 5,
        options: ingredients.map(ingredient => ({
          id: `ingredient-${ingredient}`,
          label: ingredient!,
          value: ingredient!,
          count: products.filter(p => p.ingredient === ingredient).length
        }))
      });
    }

    // Availability filter
    groups.push({
      id: 'availability',
      label: 'Availability',
      type: 'checkbox',
      options: [
        {
          id: 'availability-in-stock',
          label: 'In stock',
          value: 'true',
          count: products.filter(p => p.availability !== false).length
        },
        {
          id: 'availability-out-of-stock',
          label: 'Out of stock',
          value: 'false',
          count: products.filter(p => p.availability === false).length
        }
      ]
    });

    return groups;
  }, [products]);

  // Sort options
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'best-selling', label: 'Best selling' },
    { value: 'title-ascending', label: 'Alphabetically, A-Z' },
    { value: 'title-descending', label: 'Alphabetically, Z-A' },
    { value: 'price-ascending', label: 'Price, low to high' },
    { value: 'price-descending', label: 'Price, high to low' },
    { value: 'created-ascending', label: 'Date, old to new' },
    { value: 'created-descending', label: 'Date, new to old' }
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply filters
    Object.entries(filters.selectedFilters).forEach(([groupId, values]) => {
      if (values.length === 0) return;

      filtered = filtered.filter(product => {
        switch (groupId) {
          case 'category':
            return values.includes(product.category || '');
          case 'step':
            return values.includes(product.step || '');
          case 'productType':
            return values.includes(product.productType || '');
          case 'concern':
            return values.includes(product.concern || '');
          case 'ingredient':
            return values.includes(product.ingredient || '');
          case 'availability':
            return values.includes(String(product.availability !== false));
          default:
            return true;
        }
      });
    });

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange.currentMin && 
      product.price <= filters.priceRange.currentMax
    );

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-ascending':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-descending':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'title-ascending':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'title-descending':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'created-ascending':
        filtered.sort((a, b) => {
          const dateA = a.createdAt || new Date(0);
          const dateB = b.createdAt || new Date(0);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case 'created-descending':
        filtered.sort((a, b) => {
          const dateA = a.createdAt || new Date(0);
          const dateB = b.createdAt || new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'best-selling':
      case 'featured':
      default:
        // Keep original order or implement custom logic
        break;
    }

    return filtered;
  }, [products, filters]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      sortBy: "featured",
      selectedFilters: {},
      priceRange: {
        ...priceRange,
        currentMin: priceRange.min,
        currentMax: priceRange.max
      }
    });
  }, [priceRange]);

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(filters.selectedFilters).forEach(filterValues => {
      count += filterValues.length;
    });
    if (filters.priceRange.currentMin !== priceRange.min || 
        filters.priceRange.currentMax !== priceRange.max) {
      count += 1;
    }
    return count;
  };

  return {
    filters,
    filteredProducts,
    filterGroups,
    sortOptions,
    priceRange,
    handleFilterChange,
    clearFilters,
    getActiveFilterCount
  };
};