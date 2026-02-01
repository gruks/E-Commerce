'use client';

import Link from 'next/link';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';

export function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">EcomStore</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCartIcon className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <UserIcon className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}