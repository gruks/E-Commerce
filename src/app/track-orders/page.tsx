"use client";

import { useState, useCallback } from 'react';
import { ChevronRight, Package } from 'lucide-react';
import { usePageRevealer } from '../../components/ui/PageTransition';
import { TrackingFormData } from '../../types/tracking';
import { TrackingEntry } from '../../components/tracking/TrackingEntry';

export default function TrackOrdersPage() {
  // Add the page revealer animation with CustomEase "hop" effect
  usePageRevealer();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const handleTrack = useCallback(async (formData: TrackingFormData) => {
    setIsLoading(true);
    setError(null);
    setTrackingResult(null);
    
    try {
      // Simulate tracking lookup
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, show a mock result
      setTrackingResult(`Tracking information for ${formData.method}: ${formData.identifier}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Tracking error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNewSearch = useCallback(() => {
    setTrackingResult(null);
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
                Enter your Order ID or Tracking ID to get updates (Demo Mode)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!trackingResult ? (
          <div className="space-y-8">
            {/* Tracking Entry Form */}
            <div className="max-w-2xl mx-auto">
              <TrackingEntry
                onTrack={handleTrack}
                isLoading={isLoading}
                error={error}
                className="mb-8"
              />
              
              {/* Demo Notice */}
              <div className="bg-blue-50 border border-blue-200 p-4 mb-8">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Mode</h3>
                <p className="text-sm text-blue-800">
                  This is a demonstration of the order tracking interface. 
                  In a real application, this would connect to your order management system.
                </p>
              </div>
              
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
          </div>
        ) : (
          /* Tracking Result */
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
            
            {/* Mock Tracking Result */}
            <div className="bg-gray-50 border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tracking Result</h2>
              <p className="text-gray-600 mb-4">{trackingResult}</p>
              <div className="bg-green-50 border border-green-200 p-4">
                <p className="text-green-800 text-sm">
                  ✅ This is a demo result. In a real application, you would see actual order status, 
                  shipping updates, and delivery information here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}