"use client";

import { useState } from 'react';
import Link from "next/link";
import StaggeredMenu from '../ui/StaggeredMenu';
import { CartIcon } from './CartIcon';

interface MenuProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Menu({ open, onClose }: MenuProps) {
  const [showSearch, setShowSearch] = useState(false);

  // E-commerce focused menu items (removed cart from menu items)
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Shop', ariaLabel: 'Browse all products', link: '/shop' },
    { label: 'Categories', ariaLabel: 'View product categories', link: '/categories' },
    { label: 'Best Sellers', ariaLabel: 'View best selling products', link: '/best-sellers' },
    { label: 'Track Orders', ariaLabel: 'Track your orders', link: '/track-orders' }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'Twitter', link: 'https://twitter.com' }
  ];

  return (
    <>
      <StaggeredMenu
        position="left"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#000000"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={false}
        colors={['#f8f9fa', '#ffffff']}
        logoUrl="/logo.png"
        accentColor="#fc6902"
        isFixed={true}
        closeOnClickAway={true}
        onMenuOpen={onClose}
        onMenuClose={onClose}
      />
      
      {/* Custom navbar overlay with proper organization */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 h-16 max-w-7xl mx-auto">
          
          {/* Left: Search */}
          <button
            onClick={() => setShowSearch(true)}
            className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors px-3 py-2 rounded-md"
            aria-label="Open search"
          >
            Search
          </button>

          {/* Center: Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold tracking-wider text-black hover:text-[#fc6902] transition-colors absolute left-1/2 transform -translate-x-1/2"
          >
            necter<span className="text-[#fc6902]">.</span>
          </Link>

          {/* Right: Cart */}
          <CartIcon className="text-sm font-medium tracking-wide" />
        </div>
      </div>
    </>
  );
}