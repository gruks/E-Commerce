import { supabase } from '@/src/lib/supabase';
import { CartItem, CartItemWithProduct, Product } from '@/src/types/database';
import { productsService } from './productsService';

export interface CartResponse {
  data: CartItemWithProduct[];
  error: string | null;
}

export interface CartSummary {
  items: CartItemWithProduct[];
  subtotal: number;
  itemCount: number;
  totalQuantity: number;
}

class CartService {
  async getCartItems(userId: string): Promise<CartResponse> {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching cart items:', error);
        return { data: [], error: error.message };
      }

      // Filter out items where product might be null (deleted products)
      const validItems = (data || []).filter(item => item.product) as CartItemWithProduct[];

      return { data: validItems, error: null };
    } catch (error) {
      console.error('Error in getCartItems:', error);
      return { 
        data: [], 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async addToCart(
    userId: string, 
    productId: string, 
    quantity: number = 1
  ): Promise<{ success: boolean; error: string | null; item?: CartItemWithProduct }> {
    try {
      // First check if product exists and has enough stock
      const stockCheck = await productsService.checkStock(productId, quantity);
      if (!stockCheck.available) {
        return { 
          success: false, 
          error: `Only ${stockCheck.currentStock} items available in stock` 
        };
      }

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        // Update existing item
        const newQuantity = existingItem.quantity + quantity;
        
        // Check stock for new quantity
        const newStockCheck = await productsService.checkStock(productId, newQuantity);
        if (!newStockCheck.available) {
          return { 
            success: false, 
            error: `Only ${newStockCheck.currentStock} items available in stock` 
          };
        }

        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('id', existingItem.id)
          .select(`
            *,
            product:products(*)
          `)
          .single();

        if (error) {
          console.error('Error updating cart item:', error);
          return { success: false, error: error.message };
        }

        return { success: true, error: null, item: data as CartItemWithProduct };
      } else {
        // Create new item
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            user_id: userId,
            product_id: productId,
            quantity
          })
          .select(`
            *,
            product:products(*)
          `)
          .single();

        if (error) {
          console.error('Error adding to cart:', error);
          return { success: false, error: error.message };
        }

        return { success: true, error: null, item: data as CartItemWithProduct };
      }
    } catch (error) {
      console.error('Error in addToCart:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async updateCartItem(
    userId: string,
    cartItemId: string,
    quantity: number
  ): Promise<{ success: boolean; error: string | null; item?: CartItemWithProduct }> {
    try {
      if (quantity <= 0) {
        return this.removeFromCart(userId, cartItemId);
      }

      // Get the cart item to check product
      const { data: cartItem } = await supabase
        .from('cart_items')
        .select('product_id')
        .eq('id', cartItemId)
        .eq('user_id', userId)
        .single();

      if (!cartItem) {
        return { success: false, error: 'Cart item not found' };
      }

      // Check stock
      const stockCheck = await productsService.checkStock(cartItem.product_id, quantity);
      if (!stockCheck.available) {
        return { 
          success: false, 
          error: `Only ${stockCheck.currentStock} items available in stock` 
        };
      }

      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId)
        .eq('user_id', userId)
        .select(`
          *,
          product:products(*)
        `)
        .single();

      if (error) {
        console.error('Error updating cart item:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null, item: data as CartItemWithProduct };
    } catch (error) {
      console.error('Error in updateCartItem:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async removeFromCart(
    userId: string,
    cartItemId: string
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error removing from cart:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error in removeFromCart:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async clearCart(userId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('Error clearing cart:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error in clearCart:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async getCartSummary(userId: string): Promise<{ data: CartSummary | null; error: string | null }> {
    try {
      const { data: items, error } = await this.getCartItems(userId);

      if (error) {
        return { data: null, error };
      }

      const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = items.length;
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

      return {
        data: {
          items,
          subtotal,
          itemCount,
          totalQuantity
        },
        error: null
      };
    } catch (error) {
      console.error('Error in getCartSummary:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async validateCart(userId: string): Promise<{ 
    valid: boolean; 
    issues: Array<{ itemId: string; productName: string; issue: string; currentStock?: number }>; 
    error: string | null 
  }> {
    try {
      const { data: items, error } = await this.getCartItems(userId);

      if (error) {
        return { valid: false, issues: [], error };
      }

      const issues: Array<{ itemId: string; productName: string; issue: string; currentStock?: number }> = [];

      for (const item of items) {
        // Check if product still exists and is available
        const { data: product } = await productsService.getProductById(item.product_id);
        
        if (!product) {
          issues.push({
            itemId: item.id,
            productName: item.product.name,
            issue: 'Product no longer available'
          });
          continue;
        }

        // Check stock
        const stockCheck = await productsService.checkStock(item.product_id, item.quantity);
        if (!stockCheck.available) {
          issues.push({
            itemId: item.id,
            productName: item.product.name,
            issue: stockCheck.currentStock === 0 ? 'Out of stock' : 'Insufficient stock',
            currentStock: stockCheck.currentStock
          });
        }

        // Check if price has changed (you might want to handle this differently)
        if (product.price !== item.product.price) {
          issues.push({
            itemId: item.id,
            productName: item.product.name,
            issue: 'Price has changed'
          });
        }
      }

      return { valid: issues.length === 0, issues, error: null };
    } catch (error) {
      console.error('Error in validateCart:', error);
      return { 
        valid: false, 
        issues: [], 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export const cartService = new CartService();