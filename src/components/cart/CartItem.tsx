"use client";

import { memo } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItemProps } from "./types";
import { QuantityStepper } from "./QuantityStepper";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

export const CartItem = memo(({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating = false
}: CartItemProps) => {
  return (
    <div className={`flex gap-4 py-4 border-b border-border-default last:border-b-0 ${isUpdating ? 'opacity-60 pointer-events-none' : ''}`}>
      {/* Product Image */}
      <div className="relative w-16 h-16 flex-shrink-0 bg-bg-secondary rounded-lg overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-sm font-medium text-text-primary line-clamp-2 mb-1">
              {item.name}
            </h3>
            {item.subtitle && (
              <p className="text-xs text-text-muted line-clamp-1">
                {item.subtitle}
              </p>
            )}
            {item.variant && (
              <p className="text-xs text-text-muted">
                {item.variant}
              </p>
            )}
          </div>
          
          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 text-text-muted hover:text-error transition-colors"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Stock Status */}
        {!item.inStock && (
          <p className="text-xs text-error font-medium mb-2">Out of Stock</p>
        )}

        {/* Price and Quantity */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-primary">
                {formatCurrency(item.price)}
              </span>
              {item.originalPrice && item.originalPrice > item.price && (
                <span className="text-xs text-text-muted line-through">
                  {formatCurrency(item.originalPrice)}
                </span>
              )}
            </div>
            {item.quantity > 1 && (
              <span className="text-xs text-text-muted">
                {formatCurrency(item.price * item.quantity)} total
              </span>
            )}
          </div>

          {/* Quantity Stepper */}
          <QuantityStepper
            value={item.quantity}
            min={1}
            max={item.maxQuantity || 99}
            disabled={!item.inStock || isUpdating}
            onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';