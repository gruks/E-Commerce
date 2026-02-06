"use client";

import { useEffect } from "react";
import { useCartStore } from "@/src/store/cartStore";
import { useAuth } from "@/src/contexts/AuthContext";
import { CartDrawer } from "@/src/components/cart";

export const GlobalCartDrawer = () => {
  const { user } = useAuth();
  const {
    isCartOpen,
    isUpdating,
    items,
    subtotal,
    error,
    closeCart,
    updateQuantity,
    removeItem,
    loadCart
  } = useCartStore();

  // Load cart on component mount (recalculate totals)
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Handle ESC key to close cart
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isCartOpen, closeCart]);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    closeCart();
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Glassmorphism Backdrop */}
      <div 
        className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm transition-all duration-300 ease-out"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      
      {/* Cart Drawer */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        <div className="flex justify-end h-full">
          <div 
            className={`
              pointer-events-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl
              h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out
              ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <CartDrawer
              isOpen={isCartOpen}
              onClose={closeCart}
              items={items.map(item => ({
                id: item.productId,
                name: item.product.name,
                subtitle: item.product.description,
                price: item.product.price,
                quantity: item.quantity,
                image: item.product.image,
                inStock: item.product.inStock
              }))}
              suggestedProducts={[]} // TODO: Implement suggested products
              promotionProgress={undefined} // TODO: Implement promotion progress
              orderSummary={{
                subtotal,
                discount: 0,
                estimatedTotal: subtotal,
                tax: 0,
                shipping: 0,
                savings: 0
              }}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onAddSuggested={() => {}} // TODO: Implement
              onApplyCoupon={async () => {}} // TODO: Implement
              onCheckout={handleCheckout}
              appliedCoupon=""
              isLoading={false}
              isUpdating={isUpdating}
            />
            
            {/* Error Display */}
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">
                {error}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};