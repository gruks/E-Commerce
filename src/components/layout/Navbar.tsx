"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Searchbar from "./Searchbar";
import StaggeredMenu from "../ui/StaggeredMenu";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);

  // E-commerce focused menu items
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Shop', ariaLabel: 'Browse all products', link: '/shop' },
    { label: 'Categories', ariaLabel: 'View product categories', link: '/categories' },
    { label: 'Best Sellers', ariaLabel: 'View best selling products', link: '/best-sellers' },
    { label: 'Cart', ariaLabel: 'View shopping cart', link: '/cart' },
    { label: 'Track Orders', ariaLabel: 'Track your orders', link: '/track-orders' }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'Twitter', link: 'https://twitter.com' }
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 text-black bg-white/80 backdrop-blur-sm">
        <div className="h-16 px-4 md:px-8 lg:px-12 flex items-center justify-end w-full max-w-7xl mx-auto">
          
          {/* Center: Logo */}
          <Link href="/" className="text-lg font-bold tracking-widest absolute left-1/2 transform -translate-x-1/2">
            necter<span className="text-[#fc6902]">.</span>
          </Link>

          {/* Right: Search & Cart */}
          <div className="flex items-center gap-6 ml-auto">
            <button
              onClick={() => setShowSearch(true)}
              className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors px-2 py-1"
            >
              Search
            </button>
            
            <Link
              href="/cart"
              className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors flex items-center gap-2 px-2 py-1 relative"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {/* Cart Counter */}
                <span className="absolute -top-2 -right-2 bg-[#fc6902] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  3
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* STAGGERED MENU COMPONENT - Fixed width, only blocks when open */}
      <div className="fixed z-60">
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
          logoUrl=""
          accentColor="#fc6902"
          isFixed={true}
          closeOnClickAway={true}
          onMenuOpen={() => {}}
          onMenuClose={() => {}}
        />
      </div>

      {/* SEARCHBAR OVERLAY */}
      <Searchbar open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}