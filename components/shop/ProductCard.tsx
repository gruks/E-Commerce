'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="flex items-center gap-2"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
        
        {product.stock_quantity < 10 && (
          <p className="text-orange-600 text-sm mt-2">
            Only {product.stock_quantity} left in stock!
          </p>
        )}
      </CardContent>
    </Card>
  );
}