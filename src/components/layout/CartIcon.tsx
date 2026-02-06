"use client";

import { ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/src/store/cartStore";

interface CartIconProps {
  className?: string;
  showBadge?: boolean;
}

export const CartIcon = ({ 
  className = "", 
  showBadge = true 
}: CartIconProps) => {
  const { isCartOpen, toggleCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCart();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCart();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`relative p-2 hover:text-[#0E2A47] transition-all duration-300`}
      aria-label={isCartOpen ? 'Close cart' : `Open cart${itemCount > 0 ? ` (${itemCount} items)` : ''}`}
      type="button"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Cart Icon */}
        <ShoppingBag 
          className={`w-6 h-6 absolute transition-all duration-300 ${
            isCartOpen 
              ? 'opacity-0 rotate-90 scale-75' 
              : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        
        {/* Close Icon */}
        <X 
          className={`w-6 h-6 absolute transition-all duration-300 ${
            isCartOpen 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-75'
          }`} 
        />
      </div>
      
      {/* Badge */}
      {showBadge && itemCount > 0 && !isCartOpen && (
        <span 
          className="absolute -top-1 -right-1 bg-[#0E2A47] text-['#fffff0'] text-xs font-medium rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1 transition-all duration-300"
          aria-hidden="true"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};