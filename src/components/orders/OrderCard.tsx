"use client";

import { memo } from 'react';
import Image from 'next/image';
import { ChevronRight, Package } from 'lucide-react';
import { Order } from '@/src/types/order';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderCardProps {
  order: Order;
  isSelected?: boolean;
  onClick: (order: Order) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(dateString));
};

export const OrderCard = memo(({ order, isSelected = false, onClick }: OrderCardProps) => {
  const handleClick = () => {
    onClick(order);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(order);
    }
  };

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const previewItems = order.items.slice(0, 3);

  return (
    <div
      className={`
        bg-gray-50 border transition-all duration-200 cursor-pointer
        hover:shadow-md hover:border-gray-300
        ${isSelected 
          ? 'border-[#fc6902] shadow-md ring-1 ring-[#fc6902]/20' 
          : 'border-gray-200'
        }
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for order ${order.orderNumber}`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {order.orderNumber}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {formatDate(order.date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <OrderStatusBadge status={order.status} />
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Items Preview */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex -space-x-2">
            {previewItems.map((item, index) => (
              <div
                key={item.id}
                className="relative w-8 h-8 border-2 border-white overflow-hidden bg-gray-100"
                style={{ zIndex: previewItems.length - index }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="w-8 h-8 border-2 border-white bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  +{order.items.length - 3}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Package className="w-3 h-3" />
            <span>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-500">Total: </span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(order.total)}
            </span>
          </div>
          {order.trackingNumber && (
            <div className="text-xs text-gray-500">
              Track: {order.trackingNumber}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

OrderCard.displayName = 'OrderCard';