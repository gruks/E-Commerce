"use client";

import { useState } from "react";
import { CartDrawer, CartItemType, SuggestedProduct, PromotionProgressType, OrderSummary } from "./index";

// Example usage component
export const CartDrawerExample = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: "1",
      name: "VIP MARSHMALLOW LIP BALM WITH 1% VIT E, 2% SQUALANE & PEPTIDES - 10G",
      subtitle: "Moisturizing lip balm",
      variant: "PEPTIDES - 10G",
      price: 399.00,
      quantity: 1,
      image: "/placeholder.svg",
      inStock: true,
      maxQuantity: 5
    },
    {
      id: "2",
      name: "ALL I NEED 3 IN 1 MOISTURIZING SUNSCREEN",
      subtitle: "SPF 50+ PA++++",
      price: 449.00,
      originalPrice: 499.00,
      quantity: 2,
      image: "/placeholder.svg",
      inStock: true,
      maxQuantity: 3
    }
  ]);

  const [appliedCoupon, setAppliedCoupon] = useState<string>("");

  const suggestedProducts: SuggestedProduct[] = [
    {
      id: "s1",
      name: "Vitamin C Serum",
      price: 299.00,
      image: "/placeholder.svg",
      rating: 4.8
    },
    {
      id: "s2",
      name: "Hydrating Toner",
      price: 199.00,
      image: "/placeholder.svg",
      rating: 4.6
    },
    {
      id: "s3",
      name: "Night Cream",
      price: 599.00,
      image: "/placeholder.svg",
      rating: 4.9
    }
  ];

  const promotionProgress: PromotionProgressType = {
    current: 848,
    target: 1000,
    message: "to Buy 2 @ 20% OFF + 1 Freebie",
    nextMilestone: {
      amount: 152,
      reward: "Free shipping"
    }
  };

  const calculateOrderSummary = (): OrderSummary => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = appliedCoupon === "HYP10" ? subtotal * 0.1 : 0;
    const estimatedTotal = subtotal - discount;
    
    return {
      subtotal,
      discount,
      estimatedTotal,
      savings: discount
    };
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleAddSuggested = (product: SuggestedProduct) => {
    const newItem: CartItemType = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      inStock: true
    };
    setCartItems(items => [...items, newItem]);
  };

  const handleApplyCoupon = async (code: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (code === "HYP10") {
      setAppliedCoupon(code);
    } else {
      throw new Error("Invalid coupon code");
    }
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    setIsCartOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cart Drawer Example</h1>
      
      <button
        onClick={() => setIsCartOpen(true)}
        className="btn btn-primary"
      >
        Open Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
      </button>

      <div className="mt-4 text-sm text-gray-600">
        <p>Try coupon code: <code className="bg-gray-100 px-2 py-1 rounded">HYP10</code> for 10% off</p>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        suggestedProducts={suggestedProducts}
        promotionProgress={promotionProgress}
        orderSummary={calculateOrderSummary()}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddSuggested={handleAddSuggested}
        onApplyCoupon={handleApplyCoupon}
        onCheckout={handleCheckout}
        appliedCoupon={appliedCoupon}
      />
    </div>
  );
};