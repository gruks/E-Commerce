import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions
export const db = {
  // Products
  async getProducts(filters?: { category?: string; featured?: boolean }) {
    let query = supabase.from('products').select('*');
    
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    
    if (filters?.featured) {
      query = query.eq('is_featured', true);
    }
    
    return query.order('created_at', { ascending: false });
  },

  async getProduct(id: string) {
    return supabase.from('products').select('*').eq('id', id).single();
  },

  // Cart
  async getCartItems(userId: string) {
    return supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId);
  },

  async addToCart(userId: string, productId: string, quantity: number) {
    return supabase.from('cart_items').upsert({
      user_id: userId,
      product_id: productId,
      quantity
    });
  },

  // Orders
  async getUserOrders(userId: string) {
    return supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          product:products(*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  async createOrder(orderData: any) {
    return supabase.from('orders').insert(orderData).select().single();
  }
};