"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItemType, SuggestedProduct, PromotionProgressType, OrderSummary } from '@/src/components/cart';

interface CartState {
  // UI State
  isCartOpen: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  isAnimating: boolean;
  
  // Cart Data
  items: CartItemType[];
  appliedCoupon: string;
  
  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setAnimating: (animating: boolean) => void;
  
  // Cart Management
  addItem: (item: CartItemType) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<void>;
  
  // Computed Values
  getItemCount: () => number;
  getOrderSummary: () => OrderSummary;
  getPromotionProgress: () => PromotionProgressType | undefined;
  getSuggestedProducts: () => SuggestedProduct[];
}

const TAX_RATE = 0.08;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

// Mock suggested products
const mockSuggestedProducts: SuggestedProduct[] = [
  {
    id: "s1",
    name: "Vitamin C Brightening Serum",
    price: 29.99,
    image: "/placeholder.svg",
    rating: 4.8
  },
  {
    id: "s2",
    name: "Hyaluronic Acid Moisturizer",
    price: 24.99,
    image: "/placeholder.svg",
    rating: 4.6
  },
  {
    id: "s3",
    name: "SPF 50 Sunscreen",
    price: 27.99,
    image: "/placeholder.svg",
    rating: 4.9
  }
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial State
      isCartOpen: false,
      isLoading: false,
      isUpdating: false,
      isAnimating: false,
      items: [],
      appliedCoupon: '',

      // UI Actions
      openCart: () => {
        set({ isCartOpen: true, isAnimating: true });
        // Prevent body scroll when cart is open
        if (typeof window !== 'undefined') {
          document.body.style.overflow = 'hidden';
        }
      },
      closeCart: () => {
        set({ isAnimating: true });
        // Delay state change to allow animation
        setTimeout(() => {
          set({ isCartOpen: false, isAnimating: false });
          // Restore body scroll
          if (typeof window !== 'undefined') {
            document.body.style.overflow = 'unset';
          }
        }, 300);
      },
      toggleCart: () => {
        const { isCartOpen } = get();
        if (isCartOpen) {
          get().closeCart();
        } else {
          get().openCart();
        }
      },
      setAnimating: (animating: boolean) => set({ isAnimating: animating }),

      // Cart Management
      addItem: (newItem: CartItemType) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === newItem.id);
          
          if (existingItem) {
            // Update quantity if item exists
            return {
              items: state.items.map(item =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              )
            };
          } else {
            // Add new item
            return {
              items: [...state.items, newItem]
            };
          }
        });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      clearCart: () => {
        set({
          items: [],
          appliedCoupon: ''
        });
      },

      applyCoupon: async (code: string) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock coupon validation
          const validCoupons = ['SAVE10', 'WELCOME20', 'FIRST15'];
          
          if (validCoupons.includes(code.toUpperCase())) {
            set({ appliedCoupon: code.toUpperCase() });
          } else {
            throw new Error('Invalid coupon code');
          }
        } finally {
          set({ isLoading: false });
        }
      },

      // Computed Values
      getItemCount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getOrderSummary: (): OrderSummary => {
        const { items, appliedCoupon } = get();
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        let discount = 0;
        if (appliedCoupon === 'SAVE10') discount = subtotal * 0.1;
        else if (appliedCoupon === 'WELCOME20') discount = subtotal * 0.2;
        else if (appliedCoupon === 'FIRST15') discount = subtotal * 0.15;
        
        const tax = subtotal * TAX_RATE;
        const estimatedTotal = subtotal - discount + tax;
        
        return {
          subtotal,
          discount,
          estimatedTotal,
          tax,
          shipping: 0,
          savings: discount
        };
      },

      getPromotionProgress: (): PromotionProgressType | undefined => {
        const { items } = get();
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (subtotal < 50) {
          return {
            current: subtotal,
            target: 50,
            message: "for free shipping",
            nextMilestone: {
              amount: 50 - subtotal,
              reward: "Free shipping"
            }
          };
        } else if (subtotal < 100) {
          return {
            current: subtotal,
            target: 100,
            message: "for 10% off your order",
            nextMilestone: {
              amount: 100 - subtotal,
              reward: "10% discount"
            }
          };
        }
        
        return undefined;
      },

      getSuggestedProducts: () => {
        const { items } = get();
        // Filter out products already in cart
        return mockSuggestedProducts.filter(
          product => !items.some(item => item.id === product.id)
        );
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon
      })
    }
  )
);