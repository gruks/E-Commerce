'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatDate } from '@/lib/utils';
import { Order } from '@/lib/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus as any } : order
        ));
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders Management</h1>
      
      {orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders found.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Orders ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{order.user_id.slice(0, 8)}...</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">
                            {order.shipping_address}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          {order.order_items?.slice(0, 2).map((item) => (
                            <div key={item.id} className="text-sm">
                              {item.product?.name} × {item.quantity}
                            </div>
                          ))}
                          {(order.order_items?.length || 0) > 2 && (
                            <div className="text-sm text-gray-500">
                              +{(order.order_items?.length || 0) - 2} more
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {formatPrice(order.total_amount)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {order.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                            >
                              Process
                            </Button>
                          )}
                          {order.status === 'processing' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'shipped')}
                            >
                              Ship
                            </Button>
                          )}
                          {order.status === 'shipped' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                            >
                              Deliver
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}