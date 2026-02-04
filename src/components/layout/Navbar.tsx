"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import Searchbar from "./Searchbar";
import StaggeredMenu from "../ui/StaggeredMenu";
import TransitionLink from "../ui/TransitionLink";
import { STAGGERED_MENU_ITEMS, SOCIAL_ITEMS } from "../../styles/constants";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 text-black bg-white/0 backdrop-blur-sm">
        <div className="h-16 px-4 md:px-8 flex items-center justify-end w-full max-w-8xl mx-auto !pl-2">
          
          {/* Center: Logo */}
          <TransitionLink href="/" className="text-lg font-bold tracking-widest absolute left-1/2 transform -translate-x-1/2">
            necter<span className="text-[#fc6902]">.</span>
          </TransitionLink>

          {/* Right: Search & Cart */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowSearch(true)}
              className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors px-2 py-1"
            >
              Search
            </button>
            
            <TransitionLink
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
            </TransitionLink>
          </div>
        </div>
      </header>

      {/* STAGGERED MENU COMPONENT - Fixed width, only blocks when open */}
      <div className="fixed z-60">
        <StaggeredMenu
          position="left"
          items={STAGGERED_MENU_ITEMS}
          socialItems={SOCIAL_ITEMS}
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