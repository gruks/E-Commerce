"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getProductById, StaticProduct } from '@/src/styles/constants';

// Cart item with product details
interface CartItemWithProduct {
  productId: string;
  quantity: number;
  addedAt: string;
  product: StaticProduct;
}

interface CartState {
  // UI State
  isCartOpen: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  isAnimating: boolean;
  
  // Cart Data (stored in localStorage via Zustand persist)
  items: CartItemWithProduct[];
  subtotal: number;
  itemCount: number;
  totalQuantity: number;
  error: string | null;
  
  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setAnimating: (animating: boolean) => void;
  
  // Cart Management (no DB calls - pure client-side)
  loadCart: () => void;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  
  // Computed Values
  getItemCount: () => number;
  getTotalQuantity: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial State
      isCartOpen: false,
      isLoading: false,
      isUpdating: false,
      isAnimating: false,
      items: [],
      subtotal: 0,
      itemCount: 0,
      totalQuantity: 0,
      error: null,

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

      // Cart Management - Pure client-side, no DB calls
      loadCart: () => {
        // Cart is automatically loaded from localStorage via persist middleware
        // This function recalculates totals
        const { items } = get();
        
        const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const itemCount = items.length;
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

        set({
          subtotal,
          itemCount,
          totalQuantity,
          error: null
        });
      },

      addItem: (productId: string, quantity = 1) => {
        set({ isUpdating: true, error: null });
        
        try {
          // Get product from static data
          const product = getProductById(productId);
          
          if (!product) {
            set({ error: 'Product not found', isUpdating: false });
            return;
          }

          if (!product.inStock) {
            set({ error: 'Product is out of stock', isUpdating: false });
            return;
          }

          const { items } = get();
          const existingItemIndex = items.findIndex(item => item.productId === productId);

          let updatedItems: CartItemWithProduct[];

          if (existingItemIndex >= 0) {
            // Update existing item quantity
            updatedItems = [...items];
            updatedItems[existingItemIndex].quantity += quantity;
          } else {
            // Add new item
            updatedItems = [
              ...items,
              {
                productId,
                quantity,
                addedAt: new Date().toISOString(),
                product
              }
            ];
          }

          // Calculate new totals
          const subtotal = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          const itemCount = updatedItems.length;
          const totalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

          set({
            items: updatedItems,
            subtotal,
            itemCount,
            totalQuantity,
            isUpdating: false,
            error: null
          });
        } catch (error) {
          console.error('Error adding item to cart:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add item',
            isUpdating: false 
          });
        }
      },

      updateQuantity: (productId: string, quantity: number) => {
        set({ isUpdating: true, error: null });
        
        try {
          if (quantity <= 0) {
            get().removeItem(productId);
            return;
          }

          const { items } = get();
          const updatedItems = items.map(item => 
            item.productId === productId 
              ? { ...item, quantity }
              : item
          );

          // Calculate new totals
          const subtotal = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          const itemCount = updatedItems.length;
          const totalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

          set({
            items: updatedItems,
            subtotal,
            itemCount,
            totalQuantity,
            isUpdating: false,
            error: null
          });
        } catch (error) {
          console.error('Error updating cart item:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update item',
            isUpdating: false 
          });
        }
      },

      removeItem: (productId: string) => {
        set({ isUpdating: true, error: null });
        
        try {
          const { items } = get();
          const updatedItems = items.filter(item => item.productId !== productId);

          // Calculate new totals
          const subtotal = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          const itemCount = updatedItems.length;
          const totalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

          set({
            items: updatedItems,
            subtotal,
            itemCount,
            totalQuantity,
            isUpdating: false,
            error: null
          });
        } catch (error) {
          console.error('Error removing cart item:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to remove item',
            isUpdating: false 
          });
        }
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          itemCount: 0,
          totalQuantity: 0,
          isUpdating: false,
          error: null
        });
      },

      // Computed Values
      getItemCount: () => {
        const { itemCount } = get();
        return itemCount;
      },

      getTotalQuantity: () => {
        const { totalQuantity } = get();
        return totalQuantity;
      },

      getSubtotal: () => {
        const { subtotal } = get();
        return subtotal;
      }
    }),
    {
      name: 'necter-cart-storage', // localStorage key
      // Persist cart items and totals
      partialize: (state) => ({
        items: state.items,
        subtotal: state.subtotal,
        itemCount: state.itemCount,
        totalQuantity: state.totalQuantity
      })
    }
  )
);