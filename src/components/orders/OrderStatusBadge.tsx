"use client";

import { OrderStatus } from '@/src/types/order';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig = {
  processing: {
    label: 'Processing',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  'out-for-delivery': {
    label: 'Out for Delivery',
    className: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-800 border-green-200'
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 border-red-200'
  }
};

export const OrderStatusBadge = ({ status, className = '' }: OrderStatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
        ${config.className} ${className}
      `}
      role="status"
      aria-label={`Order status: ${config.label}`}
    >
      {config.label}
    </span>
  );
};