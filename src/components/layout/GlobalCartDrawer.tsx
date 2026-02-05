"use client";

import { useEffect } from "react";
import { useCartStore } from "@/src/store/cartStore";
import { CartDrawer } from "@/src/components/cart";

export const GlobalCartDrawer = () => {
  const {
    isCartOpen,
    isLoading,
    isUpdating,
    items,
    appliedCoupon,
    closeCart,
    updateQuantity,
    removeItem,
    addItem,
    applyCoupon,
    getOrderSummary,
    getPromotionProgress,
    getSuggestedProducts
  } = useCartStore();

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

  const handleAddSuggested = (product: any) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      inStock: true
    };
    addItem(cartItem);
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
              items={items}
              suggestedProducts={getSuggestedProducts()}
              promotionProgress={getPromotionProgress()}
              orderSummary={getOrderSummary()}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onAddSuggested={handleAddSuggested}
              onApplyCoupon={applyCoupon}
              onCheckout={handleCheckout}
              appliedCoupon={appliedCoupon}
              isLoading={isLoading}
              isUpdating={isUpdating}
            />
          </div>
        </div>
      </div>
    </>
  );
};