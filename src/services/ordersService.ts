import { supabase } from '@/src/lib/supabase';
import { Order, OrderWithItems, OrderItem, Database } from '@/src/types/database';
import { cartService } from './cartService';
import { productsService } from './productsService';

export interface CreateOrderData {
  userId: string;
  shippingAddress: string;
  paymentMethod?: string;
}

export interface OrdersResponse {
  data: OrderWithItems[];
  count: number;
  error: string | null;
}

class OrdersService {
  async createOrder(orderData: CreateOrderData): Promise<{ 
    success: boolean; 
    orderId?: string; 
    error: string | null 
  }> {
    try {
      // Start a transaction-like process
      // 1. Get and validate cart
      const cartValidation = await cartService.validateCart(orderData.userId);
      if (!cartValidation.valid) {
        return { 
          success: false, 
          error: `Cart validation failed: ${cartValidation.issues.map(i => i.issue).join(', ')}` 
        };
      }

      const { data: cartSummary } = await cartService.getCartSummary(orderData.userId);
      if (!cartSummary || cartSummary.items.length === 0) {
        return { success: false, error: 'Cart is empty' };
      }

      // 2. Create the order
      type OrderRow = Database['public']['Tables']['orders']['Row'];
      
      const insertData = {
        user_id: orderData.userId,
        total_amount: cartSummary.subtotal,
        status: 'pending' as const,
        payment_status: 'pending' as const,
        shipping_address: orderData.shippingAddress
      };

      const result = await supabase
        .from('orders')
        // @ts-ignore - Supabase type inference issue
        .insert(insertData)
        .select()
        .single();

      const { data: order, error: orderError } = result as { data: OrderRow | null; error: any };

      if (orderError) {
        console.error('Error creating order:', orderError);
        return { success: false, error: orderError.message };
      }

      if (!order) {
        return { success: false, error: 'Failed to create order' };
      }

      // 3. Create order items and update stock
      const orderItems: Array<{
        order_id: string;
        product_id: string;
        quantity: number;
        price: number;
      }> = [];

      for (const cartItem of cartSummary.items) {
        // Double-check stock before deducting
        const stockCheck = await productsService.checkStock(
          cartItem.product_id, 
          cartItem.quantity
        );

        if (!stockCheck.available) {
          // Rollback: delete the order we just created
          await supabase.from('orders').delete().eq('id', order.id);
          return { 
            success: false, 
            error: `Insufficient stock for ${cartItem.product.name}` 
          };
        }

        // Add to order items
        orderItems.push({
          order_id: order.id,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
          price: cartItem.product.price
        });

        // Update stock
        const newStock = stockCheck.currentStock - cartItem.quantity;
        const stockUpdate = await productsService.updateStock(cartItem.product_id, newStock);
        
        if (!stockUpdate.success) {
          // Rollback: delete the order we just created
          await supabase.from('orders').delete().eq('id', order.id);
          return { 
            success: false, 
            error: `Failed to update stock for ${cartItem.product.name}` 
          };
        }
      }

      // 4. Insert all order items
      const result2 = await supabase
        .from('order_items')
        // @ts-ignore - Supabase type inference issue
        .insert(orderItems);

      const { error: itemsError } = result2;

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        // Rollback: delete the order
        await supabase.from('orders').delete().eq('id', order.id);
        return { success: false, error: itemsError.message };
      }

      // 5. Clear the cart
      const clearResult = await cartService.clearCart(orderData.userId);
      if (!clearResult.success) {
        console.warn('Failed to clear cart after order creation:', clearResult.error);
        // Don't fail the order for this, just log it
      }

      return { success: true, orderId: order.id, error: null };
    } catch (error) {
      console.error('Error in createOrder:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async getOrders(
    userId: string,
    page = 1,
    limit = 10
  ): Promise<OrdersResponse> {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:products (*)
          )
        `, { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.error('Error fetching orders:', error);
        return { data: [], count: 0, error: error.message };
      }

      return { data: data as OrderWithItems[] || [], count: count || 0, error: null };
    } catch (error) {
      console.error('Error in getOrders:', error);
      return { 
        data: [], 
        count: 0, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async getOrderById(
    orderId: string,
    userId: string
  ): Promise<{ data: OrderWithItems | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:products (*)
          )
        `)
        .eq('id', orderId)
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
        return { data: null, error: error.message };
      }

      return { data: data as OrderWithItems, error: null };
    } catch (error) {
      console.error('Error in getOrderById:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async updateOrderStatus(
    orderId: string,
    status: Order['status']
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const updateData = { status };
      
      const result = await supabase
        .from('orders')
        // @ts-ignore - Supabase type inference issue
        .update(updateData)
        .eq('id', orderId);

      const { error } = result;

      if (error) {
        console.error('Error updating order status:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error in updateOrderStatus:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async updatePaymentStatus(
    orderId: string,
    paymentStatus: Order['payment_status']
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const updateData = { payment_status: paymentStatus };
      
      const result = await supabase
        .from('orders')
        // @ts-ignore - Supabase type inference issue
        .update(updateData)
        .eq('id', orderId);

      const { error } = result;

      if (error) {
        console.error('Error updating payment status:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error in updatePaymentStatus:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async cancelOrder(
    orderId: string,
    userId: string
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      // Get order details first
      const { data: order, error: fetchError } = await this.getOrderById(orderId, userId);
      
      if (fetchError || !order) {
        return { success: false, error: fetchError || 'Order not found' };
      }

      // Only allow cancellation if order is pending or processing
      if (!['pending', 'processing'].includes(order.status)) {
        return { success: false, error: 'Order cannot be cancelled at this stage' };
      }

      // Restore stock for all items
      for (const item of order.order_items) {
        const { data: product } = await productsService.getProductById(item.product_id);
        if (product) {
          const newStock = product.stock_quantity + item.quantity;
          await productsService.updateStock(item.product_id, newStock);
        }
      }

      // Update order status
      const updateData = { status: 'cancelled' as const };
      
      const result = await supabase
        .from('orders')
        // @ts-ignore - Supabase type inference issue
        .update(updateData)
        .eq('id', orderId)
        .eq('user_id', userId);

      const { error } = result;

      if (error) {
        console.error('Error cancelling order:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error in cancelOrder:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // For tracking integration
  async getOrderByTrackingId(trackingId: string): Promise<{ data: OrderWithItems | null; error: string | null }> {
    try {
      // In a real app, you'd have a tracking_number field
      // For now, we'll use the order ID as tracking ID
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:products (*)
          )
        `)
        .eq('id', trackingId)
        .single();

      if (error) {
        console.error('Error fetching order by tracking ID:', error);
        return { data: null, error: error.message };
      }

      return { data: data as OrderWithItems, error: null };
    } catch (error) {
      console.error('Error in getOrderByTrackingId:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export const ordersService = new OrdersService();