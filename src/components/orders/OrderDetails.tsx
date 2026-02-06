"use client";

import { memo, useState } from 'react';
import Image from 'next/image';
import { 
  Download, 
  RotateCcw, 
  MessageCircle, 
  MapPin, 
  CreditCard,
  Package,
  Calendar,
  Truck
} from 'lucide-react';
import { OrderWithItems } from '@/src/types/database';
import { TrackingStep } from '@/src/types/order';
import { TrackingTimeline } from './TrackingTimeline';
import { OrderStatusBadge } from './OrderStatusBadge';
import { useCartActions } from '@/src/lib/cartHelpers';

interface OrderDetailsProps {
  order: OrderWithItems;
  className?: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date(dateString));
};

export const OrderDetails = memo(({ order, className = '' }: OrderDetailsProps) => {
  const [isReordering, setIsReordering] = useState(false);
  const { addToCart, openCart } = useCartActions();

  const handleReorder = async () => {
    setIsReordering(true);
    try {
      // Add all items to cart
      for (const item of order.order_items) {
        await addToCart(item.product_id, item.quantity);
      }
      
      // Open cart drawer to show added items
      openCart();
      
      console.log(`Successfully added ${order.order_items.length} items to cart`);
    } catch (error) {
      console.error('Failed to reorder items:', error);
    } finally {
      setIsReordering(false);
    }
  };

  const handleDownloadInvoice = () => {
    // In a real app, this would download the invoice
    console.log(`Downloading invoice for order ${order.id}`);
  };

  const handleContactSupport = () => {
    // In a real app, this would open support chat or redirect to support page
    console.log(`Contacting support for order ${order.id}`);
  };

  // Generate mock tracking steps based on order status
  const getTrackingSteps = (): TrackingStep[] => {
    const steps: TrackingStep[] = [
      {
        id: '1',
        title: 'Order Placed',
        description: 'Your order has been received and is being processed',
        timestamp: order.created_at,
        isCompleted: true,
        isActive: false
      }
    ];

    if (['processing', 'shipped', 'delivered'].includes(order.status)) {
      steps.push({
        id: '2',
        title: 'Processing',
        description: 'Your order is being prepared for shipment',
        timestamp: order.created_at,
        isCompleted: true,
        isActive: order.status === 'processing'
      });
    }

    if (['shipped', 'delivered'].includes(order.status)) {
      steps.push({
        id: '3',
        title: 'Shipped',
        description: 'Your order has been shipped and is on its way',
        timestamp: order.created_at,
        isCompleted: true,
        isActive: order.status === 'shipped'
      });
    }

    if (order.status === 'delivered') {
      steps.push({
        id: '4',
        title: 'Delivered',
        description: 'Your order has been delivered successfully',
        timestamp: order.created_at,
        isCompleted: true,
        isActive: false
      });
    } else if (order.status === 'shipped') {
      steps.push({
        id: '4',
        title: 'Out for Delivery',
        description: 'Your order is out for delivery',
        timestamp: '',
        isCompleted: false,
        isActive: true
      });
    } else if (order.status === 'processing') {
      steps.push({
        id: '3',
        title: 'Preparing for Shipment',
        description: 'Your order is being prepared for shipment',
        timestamp: '',
        isCompleted: false,
        isActive: true
      });
    }

    return steps;
  };

  return (
    <div className={`bg-gray-50 border border-gray-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Order #{order.id.slice(-8).toUpperCase()}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Ordered {formatDate(order.created_at)}</span>
              </div>
            </div>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={handleReorder}
            disabled={isReordering}
            className="flex items-center gap-2 px-4 py-2 bg-[#0E2A47] text-black hover:bg-[#e55a02] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            {isReordering ? 'Adding to Cart...' : 'Reorder'}
          </button>
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Invoice
          </button>
          <button
            onClick={handleContactSupport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Support
          </button>
        </div>

        {/* Tracking Timeline */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Tracking Progress
          </h3>
          <TrackingTimeline steps={getTrackingSteps()} />
          <div className="mt-4 p-3 bg-gray-100 border border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Order ID:</span> {order.id}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Items Ordered</h3>
          <div className="space-y-4">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200">
                <div className="relative w-16 h-16 overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.product.image_url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm">{item.product.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.product.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Product ID: {item.product_id.slice(-8)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(item.price)}
                  </p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
          <div className="bg-gray-100 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">{formatCurrency(order.total_amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">{formatCurrency(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900">{formatCurrency(0)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Shipping Address
            </h3>
            <div className="bg-gray-100 p-4">
              <p className="text-sm text-gray-600">
                {order.shipping_address}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Status
            </h3>
            <div className="bg-gray-100 p-4">
              <p className="text-sm text-gray-900 capitalize">
                {order.payment_status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

OrderDetails.displayName = 'OrderDetails';