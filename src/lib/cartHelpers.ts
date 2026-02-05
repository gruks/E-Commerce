import { useCartStore } from '@/src/store/cartStore';
import { CartItemType } from '@/src/components/cart';

/**
 * Helper function to add a product to cart and open the cart drawer
 */
export const addToCartAndOpen = (product: {
  id: string;
  name: string;
  price: number;
  image?: string;
  subtitle?: string;
  quantity?: number;
}) => {
  const { addItem, openCart } = useCartStore.getState();
  
  const cartItem: CartItemType = {
    id: product.id,
    name: product.name,
    subtitle: product.subtitle,
    price: product.price,
    quantity: product.quantity || 1,
    image: product.image || '/placeholder.svg',
    inStock: true
  };
  
  addItem(cartItem);
  openCart();
};

/**
 * Hook to get cart actions for components
 */
export const useCartActions = () => {
  const { addItem, openCart, toggleCart, closeCart } = useCartStore();
  
  const addToCart = (product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    subtitle?: string;
    quantity?: number;
  }) => {
    const cartItem: CartItemType = {
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      quantity: product.quantity || 1,
      image: product.image || '/placeholder.svg',
      inStock: true
    };
    
    addItem(cartItem);
  };
  
  const addToCartAndOpenDrawer = (product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    subtitle?: string;
    quantity?: number;
  }) => {
    addToCart(product);
    openCart();
  };
  
  return {
    addToCart,
    addToCartAndOpenDrawer,
    openCart,
    toggleCart,
    closeCart
  };
};