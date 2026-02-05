"use client";

import { memo } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { SuggestedProduct } from "./types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

interface SuggestedProductsProps {
  products: SuggestedProduct[];
  onAdd: (product: SuggestedProduct) => void;
  isLoading?: boolean;
}

const SuggestedProductCard = memo(({ 
  product, 
  onAdd 
}: { 
  product: SuggestedProduct; 
  onAdd: (product: SuggestedProduct) => void;
}) => (
  <div className="flex-shrink-0 w-32 bg-bg-tertiary rounded-lg p-3 border border-border-default">
    {/* Product Image */}
    <div className="relative w-full aspect-square bg-bg-secondary rounded-lg overflow-hidden mb-2">
      <Image
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        fill
        className="object-cover"
        sizes="128px"
      />
    </div>

    {/* Product Info */}
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-text-primary line-clamp-2 leading-tight">
        {product.name}
      </h4>
      
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-text-primary">
          {formatCurrency(product.price)}
        </span>
        {product.rating && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-yellow-500">★</span>
            <span className="text-xs text-text-muted">{product.rating}</span>
          </div>
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={() => onAdd(product)}
        className="w-full flex items-center justify-center gap-1 py-1.5 px-2 bg-brand-primary text-text-primary text-xs font-medium rounded hover:bg-brand-hover transition-colors"
        aria-label={`Add ${product.name} to cart`}
      >
        <Plus className="w-3 h-3" />
        Add
      </button>
    </div>
  </div>
));

SuggestedProductCard.displayName = 'SuggestedProductCard';

export const SuggestedProducts = memo(({ 
  products, 
  onAdd, 
  isLoading = false 
}: SuggestedProductsProps) => {
  if (isLoading) {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">You May Also Like</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-32 bg-bg-secondary rounded-lg p-3 animate-pulse">
              <div className="w-full aspect-square bg-bg-primary rounded-lg mb-2" />
              <div className="space-y-2">
                <div className="h-3 bg-bg-primary rounded w-full" />
                <div className="h-3 bg-bg-primary rounded w-2/3" />
                <div className="h-6 bg-bg-primary rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-text-primary mb-3">You May Also Like</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {products.map((product) => (
          <SuggestedProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
});

SuggestedProducts.displayName = 'SuggestedProducts';