'use client';

import Link from 'next/link';
import { CartItem } from '@/components/shop/CartItem';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBagIcon className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Cart Items ({getTotalItems()})
              </h2>
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700"
              >
                Clear Cart
              </Button>
            </div>
            
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Link href="/products" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}