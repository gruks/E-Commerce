"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Searchbar from "./Searchbar";
import StaggeredMenu from "../ui/StaggeredMenu";
import TransitionLink from "../ui/TransitionLink";
import { CartIcon } from "./CartIcon";
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
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <button
              onClick={() => setShowSearch(true)}
              className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors px-2 py-1 flex items-center"
            >
              {/* Search text - hidden on small screens */}
              <span className="hidden sm:inline">Search</span>
              {/* Search icon - shown on small screens */}
              <Search className="w-4 h-4 sm:hidden" />
            </button>
            
            <CartIcon className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors" />
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