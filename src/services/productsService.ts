import { supabase } from '@/src/lib/supabase';
import { Product, Database } from '@/src/types/database';

export interface ProductFilters {
  category?: string;
  featured?: boolean;
  inStock?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

export interface ProductsResponse {
  data: Product[];
  count: number;
  error: string | null;
}

class ProductsService {
  async getProducts(
    filters: ProductFilters = {},
    page = 1,
    limit = 20
  ): Promise<ProductsResponse> {
    try {
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.featured !== undefined) {
        query = query.eq('is_featured', filters.featured);
      }

      if (filters.inStock) {
        query = query.gt('stock_quantity', 0);
      }

      if (filters.priceRange) {
        query = query
          .gte('price', filters.priceRange.min)
          .lte('price', filters.priceRange.max);
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      // Order by featured first, then by created_at
      query = query.order('is_featured', { ascending: false })
                   .order('created_at', { ascending: false });

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        return { data: [], count: 0, error: error.message };
      }

      return { data: data || [], count: count || 0, error: null };
    } catch (error) {
      console.error('Error in getProducts:', error);
      return { 
        data: [], 
        count: 0, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async getProductById(id: string): Promise<{ data: Product | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error in getProductById:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async getFeaturedProducts(limit = 8): Promise<ProductsResponse> {
    return this.getProducts({ featured: true, inStock: true }, 1, limit);
  }

  async getBestSellers(limit = 8): Promise<ProductsResponse> {
    // For now, we'll use featured products as best sellers
    // In a real app, you'd have sales data to determine this
    return this.getFeaturedProducts(limit);
  }

  async getProductsByCategory(category: string, limit = 20): Promise<ProductsResponse> {
    return this.getProducts({ category, inStock: true }, 1, limit);
  }

  async searchProducts(query: string, limit = 20): Promise<ProductsResponse> {
    return this.getProducts({ search: query }, 1, limit);
  }

  async getCategories(): Promise<{ data: string[]; error: string | null }> {
    try {
      type CategoryResult = { category: string };
      
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .gt('stock_quantity', 0)
        .returns<CategoryResult[]>();

      if (error) {
        console.error('Error fetching categories:', error);
        return { data: [], error: error.message };
      }

      // Get unique categories
      const categories = [...new Set(data?.map(item => item.category) || [])];
      return { data: categories, error: null };
    } catch (error) {
      console.error('Error in getCategories:', error);
      return { 
        data: [], 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async checkStock(productId: string, quantity: number): Promise<{ available: boolean; currentStock: number; error: string | null }> {
    try {
      type StockResult = { stock_quantity: number };
      
      const { data, error } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', productId)
        .single<StockResult>();

      if (error) {
        console.error('Error checking stock:', error);
        return { available: false, currentStock: 0, error: error.message };
      }

      const currentStock = data.stock_quantity;
      const available = currentStock >= quantity;

      return { available, currentStock, error: null };
    } catch (error) {
      console.error('Error in checkStock:', error);
      return { 
        available: false, 
        currentStock: 0, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Admin functions (would need proper auth checks in real app)
  async updateStock(productId: string, newStock: number): Promise<{ success: boolean; error: string | null }> {
    try {
      const updateData = { stock_quantity: newStock };
      
      const result = await supabase
        .from('products')
        // @ts-ignore - Supabase type inference issue
        .update(updateData)
        .eq('id', productId);

      const { error } = result;

      if (error) {
        console.error('Error updating stock:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error in updateStock:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export const productsService = new ProductsService();