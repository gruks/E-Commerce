"use client";

import { useState } from "react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import Menu from "./Menu";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMenuOpen = () => {
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
          ${hovered || showMenu ? "bg-white text-black" : "bg-transparent text-black"}
        `}
      >
        <div className="h-16 !pl-12 !pr-8 md:!pl-16 md:!pr-12 lg:!pl-20 lg:!pr-16 flex items-center justify-between w-full">
          
          {/* Left: Menu/Close */}
          {showMenu ? (
            <button 
              data-menu-toggle
              onClick={handleMenuClose}
              className="text-sm font-medium tracking-wide transition-colors text-[#fc6902]"
            >
              Close
            </button>
          ) : (
            <button 
              data-menu-toggle
              onClick={handleMenuOpen}
              className="text-sm font-medium tracking-wide transition-colors text-black hover:text-[#fc6902]"
            >
              Menu
            </button>
          )}

          {/* Center: Logo */}
          <Link href="/" className="text-lg font-bold tracking-widest absolute left-1/2 transform -translate-x-1/2">
            necter<span className="text-[#fc6902]">.</span>
          </Link>

          {/* Right: Search */}
          <button
            onClick={() => setShowSearch(true)}
            className="text-sm font-medium tracking-wide ml-auto hover:text-[#fc6902] transition-colors"
          >
            Search
          </button>
        </div>
      </header>

      {/* MENU COMPONENT */}
      <Menu open={showMenu} onClose={handleMenuClose} />

      {/* SEARCHBAR OVERLAY */}
      <Searchbar open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}
