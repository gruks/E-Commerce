"use client";

import { useEffect, useRef } from "react";

interface SearchbarProps {
  open: boolean;
  onClose: () => void;
}

export default function Searchbar({ open, onClose }: SearchbarProps) {
  const searchbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchbarRef.current && !searchbarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Only add the event listener when the searchbar is open
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <div
      ref={searchbarRef}
      className={`fixed top-0 right-0 h-16 w-full bg-white z-[60]
        transform transition-transform duration-500 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="h-full !pl-12 !pr-8 md:!pl-16 md:!pr-12 lg:!pl-20 lg:!pr-16 flex items-center gap-4 w-full">
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 border-b border-black outline-none text-sm py-1"
          autoFocus={open}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-xl font-light ml-auto hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
