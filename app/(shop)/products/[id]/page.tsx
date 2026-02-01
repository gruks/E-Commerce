'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          <p className="text-2xl font-bold text-blue-600 mb-6">
            {formatPrice(product.price)}
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-6">
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock_quantity > 0 ? (
              <p className="text-green-600 font-medium">
                ✓ In Stock ({product.stock_quantity} available)
              </p>
            ) : (
              <p className="text-red-600 font-medium">
                ✗ Out of Stock
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          {product.stock_quantity > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                
                <span className="w-12 text-center font-medium">
                  {quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  disabled={quantity >= product.stock_quantity}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            size="lg"
            className="flex items-center justify-center gap-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}