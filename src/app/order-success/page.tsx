"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          {/* Order Details */}
          {orderId && (
            <div className="bg-gray-50 border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Details</h2>
              <p className="text-gray-600">
                <span className="font-medium">Order ID:</span> {orderId.slice(-8).toUpperCase()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                You will receive an email confirmation shortly with your order details and tracking information.
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
            <div className="text-left space-y-2 text-blue-800">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>We'll send you an email confirmation with your order details</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Your order will be processed and prepared for shipment</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>You'll receive tracking information once your order ships</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/track-orders"
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              Track Your Order
            </Link>
            <Link
              href="/shop"
              className="btn btn-secondary flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Support */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Need help with your order?{' '}
              <a href="mailto:support@necter.com" className="text-brand-primary hover:text-brand-secondary">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}