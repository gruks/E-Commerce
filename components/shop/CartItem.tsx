'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  if (!item.product) return null;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.product_id);
    } else {
      updateQuantity(item.product_id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
      <div className="flex-shrink-0">
        <Image
          src={item.product.image_url}
          alt={item.product.name}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900">
          {item.product.name}
        </h3>
        <p className="text-gray-500 text-sm">
          {formatPrice(item.product.price)} each
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        
        <span className="w-12 text-center font-medium">
          {item.quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold">
          {formatPrice(item.product.price * item.quantity)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.product_id)}
          className="text-red-600 hover:text-red-700 mt-1"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}