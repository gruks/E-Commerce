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
import { Order } from '@/src/types/order';
import { TrackingTimeline } from './TrackingTimeline';
import { OrderStatusBadge } from './OrderStatusBadge';
import { useCartActions } from '@/src/lib/cartHelpers';

interface OrderDetailsProps {
  order: Order;
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

const formatAddress = (address: Order['shippingAddress']) => {
  return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
};

const getPaymentMethodDisplay = (method: Order['paymentMethod']) => {
  switch (method.type) {
    case 'card':
      return `${method.brand} •••• ${method.last4}`;
    case 'paypal':
      return 'PayPal';
    case 'apple-pay':
      return 'Apple Pay';
    case 'google-pay':
      return 'Google Pay';
    default:
      return 'Unknown';
  }
};

export const OrderDetails = memo(({ order, className = '' }: OrderDetailsProps) => {
  const [isReordering, setIsReordering] = useState(false);
  const { addToCart, openCart } = useCartActions();

  const handleReorder = async () => {
    setIsReordering(true);
    try {
      // Add all items to cart
      for (const item of order.items) {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          subtitle: item.subtitle,
          quantity: item.quantity
        });
      }
      
      // Open cart drawer to show added items
      openCart();
      
      console.log(`Successfully added ${order.items.length} items to cart`);
    } catch (error) {
      console.error('Failed to reorder items:', error);
    } finally {
      setIsReordering(false);
    }
  };

  const handleDownloadInvoice = () => {
    // In a real app, this would download the invoice
    console.log(`Downloading invoice for order ${order.orderNumber}`);
  };

  const handleContactSupport = () => {
    // In a real app, this would open support chat or redirect to support page
    console.log(`Contacting support for order ${order.orderNumber}`);
  };

  return (
    <div className={`bg-gray-50 border border-gray-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {order.orderNumber}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Ordered {formatDate(order.date)}</span>
              </div>
              {order.estimatedDelivery && (
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>Est. {formatDate(order.estimatedDelivery)}</span>
                </div>
              )}
            </div>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={handleReorder}
            disabled={isReordering}
            className="flex items-center gap-2 px-4 py-2 bg-[#fc6902] text-white hover:bg-[#e55a02] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
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
          <TrackingTimeline steps={order.trackingSteps} />
          {order.trackingNumber && (
            <div className="mt-4 p-3 bg-gray-100 border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
              </p>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Items Ordered</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200">
                <div className="relative w-16 h-16 overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                  {item.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                  )}
                  {item.sku && (
                    <p className="text-xs text-gray-400 mt-1">SKU: {item.sku}</p>
                  )}
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
              <span className="text-gray-900">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">{formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900">{formatCurrency(order.tax)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{formatCurrency(order.total)}</span>
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
              <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
              <p className="text-sm text-gray-600 mt-1">
                {formatAddress(order.shippingAddress)}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </h3>
            <div className="bg-gray-100 p-4">
              <p className="text-sm text-gray-900">
                {getPaymentMethodDisplay(order.paymentMethod)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

OrderDetails.displayName = 'OrderDetails';