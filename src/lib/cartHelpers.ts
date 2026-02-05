import { useCartStore } from '@/src/store/cartStore';
import { useAuth } from '@/src/contexts/AuthContext';

/**
 * Hook to get cart actions for components
 * Works with both authenticated and guest users
 */
export const useCartActions = () => {
  const { 
    openCart, 
    toggleCart, 
    closeCart, 
    addItem, 
    updateQuantity, 
    removeItem, 
    clearCart,
    loadCart
  } = useCartStore();
  
  const { user } = useAuth();
  
  const addToCart = async (productId: string, quantity = 1) => {
    // Works for both authenticated and guest users
    await addItem(productId, quantity);
  };
  
  const addToCartAndOpenDrawer = async (productId: string, quantity = 1) => {
    await addToCart(productId, quantity);
    openCart();
  };

  const updateCartQuantity = async (productId: string, quantity: number) => {
    await updateQuantity(productId, quantity);
  };

  const removeFromCart = async (productId: string) => {
    await removeItem(productId);
  };

  const clearUserCart = async () => {
    await clearCart();
  };

  const loadUserCart = async () => {
    await loadCart();
  };
  
  return {
    addToCart,
    addToCartAndOpenDrawer,
    updateQuantity: updateCartQuantity,
    removeItem: removeFromCart,
    clearCart: clearUserCart,
    loadCart: loadUserCart,
    openCart,
    toggleCart,
    closeCart,
    // Expose user state for components that need it
    user,
    isAuthenticated: !!user
  };
};