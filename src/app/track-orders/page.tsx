"use client";

import { useState, useCallback } from 'react';
import { ChevronRight, Package, AlertCircle } from 'lucide-react';
import { usePageRevealer } from '../../components/ui/PageTransition';
import { Order } from '../../types/order';
import { TrackingFormData } from '../../types/tracking';
import { trackOrder } from '../../lib/orderService';
import { TrackingEntry } from '../../components/tracking/TrackingEntry';
import { OrderDetails } from '../../components/orders/OrderDetails';
import { OrderDetailsSkeleton } from '../../components/orders/OrderSkeleton';

export default function TrackOrdersPage() {
  // Add the page revealer animation with CustomEase "hop" effect
  usePageRevealer();
  
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = useCallback(async (formData: TrackingFormData) => {
    setIsLoading(true);
    setError(null);
    setTrackedOrder(null);
    
    try {
      const result = await trackOrder(formData);
      
      if (result.success && result.data) {
        setTrackedOrder(result.data);
      } else {
        setError(result.error || 'Failed to track order');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Tracking error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNewSearch = useCallback(() => {
    setTrackedOrder(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-36 xl:px-64 py-6">

          {/* Page Title */}
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-[#fc6902]" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
              <p className="text-gray-600 mt-1">
                Enter your Order ID or Tracking ID to get real-time updates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!trackedOrder ? (
          /* Tracking Entry Form */
          <div className="max-w-2xl mx-auto">
            <TrackingEntry
              onTrack={handleTrack}
              isLoading={isLoading}
              error={error}
              className="mb-8"
            />
            
            {/* Help Section */}
            <div className="bg-gray-100 border border-gray-200 p-6 mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Need help finding your tracking information?
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Order ID</h4>
                  <ul className="space-y-1">
                    <li>• Check your order confirmation email</li>
                    <li>• Look for format: ORD-YYYY-XXX</li>
                    <li>• Found in your account order history</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tracking ID</h4>
                  <ul className="space-y-1">
                    <li>• Check your shipping notification email</li>
                    <li>• Look for format: TRK followed by numbers</li>
                    <li>• Provided when your order ships</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Order Details */
          <div className="space-y-6">
            {/* Back to Search */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleNewSearch}
                className="flex items-center gap-2 text-[#fc6902] hover:text-[#e55a02] transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Track another order</span>
              </button>
            </div>
            
            {/* Order Details */}
            <OrderDetails order={trackedOrder} />
          </div>
        )}
      </div>
    </div>
  );
}