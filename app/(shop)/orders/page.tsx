'use client';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/protected/AuthGuard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { formatPrice, formatDate } from '@/lib/utils';
import { Order } from '@/lib/types';

interface OrdersPageProps {
  searchParams: {
    success?: string;
  };
}

export default function OrdersPage({ searchParams }: OrdersPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchParams.success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Order placed successfully! Thank you for your purchase.
          </div>
        )}
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">You haven't placed any orders yet.</p>
            <a
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Placed on {formatDate(order.created_at)}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{item.product?.name}</p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} × {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Shipping Address:</p>
                          <p className="text-sm">{order.shipping_address}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            Total: {formatPrice(order.total_amount)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Payment: {order.payment_status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}