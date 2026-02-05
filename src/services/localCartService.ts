import { Product } from '@/src/types/database';

export interface LocalCartItem {
  productId: string;
  quantity: number;
  addedAt: string;
}

export interface LocalCartItemWithProduct extends LocalCartItem {
  product: Product;
}

export interface LocalCartSummary {
  items: LocalCartItemWithProduct[];
  subtotal: number;
  itemCount: number;
  totalQuantity: number;
}

const CART_STORAGE_KEY = 'necter_cart';

class LocalCartService {
  private getCartFromStorage(): LocalCartItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  }

  private saveCartToStorage(items: LocalCartItem[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  getCartItems(): LocalCartItem[] {
    return this.getCartFromStorage();
  }

  addToCart(productId: string, quantity: number = 1): LocalCartItem[] {
    const items = this.getCartFromStorage();
    const existingItemIndex = items.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      // Update existing item
      items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      items.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCartToStorage(items);
    return items;
  }

  updateQuantity(productId: string, quantity: number): LocalCartItem[] {
    const items = this.getCartFromStorage();
    
    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }

    const itemIndex = items.findIndex(item => item.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity = quantity;
      this.saveCartToStorage(items);
    }

    return items;
  }

  removeFromCart(productId: string): LocalCartItem[] {
    const items = this.getCartFromStorage();
    const filteredItems = items.filter(item => item.productId !== productId);
    this.saveCartToStorage(filteredItems);
    return filteredItems;
  }

  clearCart(): void {
    this.saveCartToStorage([]);
  }

  getItemCount(): number {
    const items = this.getCartFromStorage();
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  // Merge with server cart when user logs in
  async mergeWithServerCart(serverItems: any[]): Promise<LocalCartItem[]> {
    const localItems = this.getCartFromStorage();
    const mergedItems: LocalCartItem[] = [...serverItems];

    // Add local items that aren't in server cart
    localItems.forEach(localItem => {
      const existsInServer = serverItems.some(serverItem => 
        serverItem.product_id === localItem.productId
      );
      
      if (!existsInServer) {
        mergedItems.push(localItem);
      }
    });

    this.saveCartToStorage(mergedItems);
    return mergedItems;
  }

  // Convert to server format for syncing
  toServerFormat(): Array<{ product_id: string; quantity: number }> {
    const items = this.getCartFromStorage();
    return items.map(item => ({
      product_id: item.productId,
      quantity: item.quantity
    }));
  }
}

export const localCartService = new LocalCartService();