'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { formatPrice, formatDate } from '@/lib/utils';
import { Product } from '@/lib/types';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Link href="/admin/products/add">
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No products found.</p>
            <Link href="/admin/products/add">
              <Button>Add Your First Product</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Stock</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Created</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600 truncate max-w-xs">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {formatPrice(product.price)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${
                          product.stock_quantity > 10 ? 'text-green-600' : 
                          product.stock_quantity > 0 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {product.stock_quantity}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {product.is_featured && (
                          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDate(product.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {/* Edit functionality would go here */}}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
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