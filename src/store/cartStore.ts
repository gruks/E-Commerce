"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/src/types/database';
import { productsService } from '@/src/services/productsService';
import { localCartService, LocalCartItem, LocalCartItemWithProduct } from '@/src/services/localCartService';

interface CartState {
  // UI State
  isCartOpen: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  isAnimating: boolean;
  
  // Cart Data
  items: LocalCartItemWithProduct[];
  subtotal: number;
  itemCount: number;
  totalQuantity: number;
  error: string | null;
  
  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setAnimating: (animating: boolean) => void;
  
  // Cart Management
  loadCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCartWithServer: (userId: string) => Promise<void>;
  
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

      // Cart Management
      loadCart: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const cartItems = localCartService.getCartItems();
          const itemsWithProducts: LocalCartItemWithProduct[] = [];
          
          // Fetch product details for each cart item
          for (const item of cartItems) {
            const { data: product, error } = await productsService.getProductById(item.productId);
            
            if (product && !error) {
              itemsWithProducts.push({
                ...item,
                product
              });
            } else {
              // Remove invalid items from cart
              localCartService.removeFromCart(item.productId);
            }
          }
          
          const subtotal = itemsWithProducts.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          const itemCount = itemsWithProducts.length;
          const totalQuantity = itemsWithProducts.reduce((sum, item) => sum + item.quantity, 0);

          set({
            items: itemsWithProducts,
            subtotal,
            itemCount,
            totalQuantity,
            isLoading: false,
            error: null
          });
        } catch (error) {
          console.error('Error loading cart:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to load cart',
            isLoading: false 
          });
        }
      },

      addItem: async (productId: string, quantity = 1) => {
        set({ isUpdating: true, error: null });
        
        try {
          // Check if product exists and has stock
          const { data: product, error } = await productsService.getProductById(productId);
          
          if (error || !product) {
            set({ error: 'Product not found', isUpdating: false });
            return;
          }

          if (product.stock_quantity < quantity) {
            set({ error: `Only ${product.stock_quantity} items available in stock`, isUpdating: false });
            return;
          }

          // Add to localStorage
          localCartService.addToCart(productId, quantity);
          
          // Reload cart to get updated data
          await get().loadCart();
          set({ isUpdating: false });
        } catch (error) {
          console.error('Error adding item to cart:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add item',
            isUpdating: false 
          });
        }
      },

      updateQuantity: async (productId: string, quantity: number) => {
        set({ isUpdating: true, error: null });
        
        try {
          if (quantity <= 0) {
            await get().removeItem(productId);
            return;
          }

          // Check stock availability
          const { data: product, error } = await productsService.getProductById(productId);
          
          if (error || !product) {
            set({ error: 'Product not found', isUpdating: false });
            return;
          }

          if (product.stock_quantity < quantity) {
            set({ error: `Only ${product.stock_quantity} items available in stock`, isUpdating: false });
            return;
          }

          // Update in localStorage
          localCartService.updateQuantity(productId, quantity);
          
          // Reload cart to get updated data
          await get().loadCart();
          set({ isUpdating: false });
        } catch (error) {
          console.error('Error updating cart item:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update item',
            isUpdating: false 
          });
        }
      },

      removeItem: async (productId: string) => {
        set({ isUpdating: true, error: null });
        
        try {
          // Remove from localStorage
          localCartService.removeFromCart(productId);
          
          // Reload cart to get updated data
          await get().loadCart();
          set({ isUpdating: false });
        } catch (error) {
          console.error('Error removing cart item:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to remove item',
            isUpdating: false 
          });
        }
      },

      clearCart: async () => {
        set({ isUpdating: true, error: null });
        
        try {
          localCartService.clearCart();
          
          set({
            items: [],
            subtotal: 0,
            itemCount: 0,
            totalQuantity: 0,
            isUpdating: false,
            error: null
          });
        } catch (error) {
          console.error('Error clearing cart:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to clear cart',
            isUpdating: false 
          });
        }
      },

      // Sync cart with server when user logs in (future enhancement)
      syncCartWithServer: async (userId: string) => {
        // This function can be called when user logs in
        // to sync localStorage cart with server cart
        try {
          const localItems = localCartService.getCartItems();
          
          // TODO: Implement server sync logic here
          // For now, we'll just keep using localStorage
          console.log('Cart sync with server for user:', userId, 'Items:', localItems);
          
          // Reload cart to ensure consistency
          await get().loadCart();
        } catch (error) {
          console.error('Error syncing cart with server:', error);
        }
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
      name: 'cart-storage',
      partialize: (state) => ({
        // Only persist UI state, cart data comes from localStorage
        isCartOpen: state.isCartOpen
      })
    }
  )
);