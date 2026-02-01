'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { 
  CubeIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, you'd have dedicated API endpoints for dashboard stats
        const [productsRes, ordersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
        ]);

        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();

        const products = productsData.products || [];
        const orders = ordersData.orders || [];

        const revenue = orders.reduce((sum: number, order: any) => sum + order.total_amount, 0);
        const customers = new Set(orders.map((order: any) => order.user_id)).size;

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalRevenue: revenue,
          totalCustomers: customers,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: CubeIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBagIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: CurrencyDollarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: UsersIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/admin/products/add"
                className="block w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-blue-900">Add New Product</div>
                <div className="text-sm text-blue-600">Create a new product listing</div>
              </a>
              
              <a
                href="/admin/products"
                className="block w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-green-900">Manage Products</div>
                <div className="text-sm text-green-600">Edit or remove existing products</div>
              </a>
              
              <a
                href="/admin/orders"
                className="block w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-purple-900">View Orders</div>
                <div className="text-sm text-purple-600">Manage customer orders</div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b">
                <span>System initialized</span>
                <span className="text-gray-500">Just now</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span>Admin panel accessed</span>
                <span className="text-gray-500">Just now</span>
              </div>
              <div className="text-gray-500 text-center py-4">
                More activity will appear here as you use the system
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}