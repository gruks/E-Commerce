"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ShoppingBag, Tag, ExternalLink } from "lucide-react";
import { CartDrawerProps } from "./types";
import { CartItem } from "./CartItem";
import { PromotionProgress } from "./PromotionProgress";
import { SuggestedProducts } from "./SuggestedProducts";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  suggestedProducts,
  promotionProgress,
  orderSummary,
  onUpdateQuantity,
  onRemoveItem,
  onAddSuggested,
  onApplyCoupon,
  onCheckout,
  appliedCoupon,
  isLoading = false,
  isUpdating = false
}: CartDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleFocusTrap);
    
    // Focus first focusable element
    setTimeout(() => {
      const firstFocusable = drawerRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleFocusTrap);
    };
  }, [isOpen]);

  const handleApplyCoupon = useCallback(async () => {
    if (!couponCode.trim() || isApplyingCoupon) return;
    
    setIsApplyingCoupon(true);
    try {
      await onApplyCoupon(couponCode.trim().toUpperCase());
      setCouponCode("");
    } finally {
      setIsApplyingCoupon(false);
    }
  }, [couponCode, onApplyCoupon, isApplyingCoupon]);

  if (!isOpen) return null;

  const isEmpty = items.length === 0;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      ref={drawerRef}
      className="h-full bg-white flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              <h2 id="cart-drawer-title" className="text-lg font-semibold text-gray-900">
                Your Cart
              </h2>
              {itemCount > 0 && (
                <span className="bg-[#0E2A47] text-[#fffff0] text-xs font-medium px-2 py-1 rounded-full">
                  {itemCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col text-[#0E2A47]">
            {isEmpty ? (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some products to get started!</p>
                <button
                  onClick={onClose}
                  className="bg-[#0E2A47] text-[#fffff0] px-6 py-2 rounded-lg hover:bg-[#e55a02] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {/* Promotion Progress */}
                    {promotionProgress && (
                      <PromotionProgress promotion={promotionProgress} />
                    )}

                    {/* Cart Items */}
                    <div className="space-y-0">
                      {isLoading ? (
                        /* Loading Skeleton */
                        Array.from({ length: 2 }).map((_, i) => (
                          <div key={i} className="flex gap-4 py-4 border-b border-gray-200 animate-pulse">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-3/4" />
                              <div className="h-3 bg-gray-200 rounded w-1/2" />
                              <div className="flex justify-between items-center">
                                <div className="h-4 bg-gray-200 rounded w-16" />
                                <div className="h-8 bg-gray-200 rounded w-24" />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        items.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemove={onRemoveItem}
                            isUpdating={isUpdating}
                          />
                        ))
                      )}
                    </div>

                    {/* Coupon Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">Promo Code</span>
                      </div>
                      
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-green-700">
                              {appliedCoupon} Applied
                            </span>
                            <span className="text-xs text-green-600">
                              You saved {formatCurrency(orderSummary.savings || 0)}!
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter promo code"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E2A47] focus:border-transparent"
                            onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                            disabled={isApplyingCoupon}
                          />
                          <button
                            onClick={handleApplyCoupon}
                            disabled={!couponCode.trim() || isApplyingCoupon}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                          >
                            {isApplyingCoupon ? 'Applying...' : 'Apply'}
                          </button>
                        </div>
                      )}
                      
                      <button className="flex items-center gap-1 text-xs text-[#0E2A47] hover:text-[#e55a02] mt-2 transition-colors">
                        <span>View all offers</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Suggested Products */}
                    <SuggestedProducts
                      products={suggestedProducts}
                      onAdd={onAddSuggested}
                      isLoading={isLoading}
                    />
                  </div>
                </div>

                {/* Footer - Order Summary & Checkout */}
                <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                  {/* Order Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">{formatCurrency(orderSummary.subtotal)}</span>
                    </div>
                    
                    {orderSummary.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-{formatCurrency(orderSummary.discount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-semibold text-base border-t border-gray-200 pt-2">
                      <span className="text-gray-900">Estimated Total</span>
                      <span className="text-gray-900">{formatCurrency(orderSummary.estimatedTotal)}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Taxes and shipping calculated at checkout
                    </p>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={onCheckout}
                    disabled={isLoading || isUpdating}
                    className="w-full bg-[#0E2A47] text-[#fffff0] py-3 rounded-lg font-medium hover:bg-[#e55a02] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading || isUpdating ? 'Updating...' : 'Checkout'}
                  </button>

                  {/* Payment Methods */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <span className="text-xs text-gray-500">Secure payment with</span>
                    <div className="flex gap-1">
                      <div className="px-2 py-1 bg-blue-600 text-black text-xs rounded font-medium">Shop Pay</div>
                      <div className="px-2 py-1 bg-yellow-400 text-#fffff0 text-xs rounded font-medium">PayPal</div>
                      <div className="px-2 py-1 bg-white text-black text-xs rounded font-medium">GPay</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
  );
};