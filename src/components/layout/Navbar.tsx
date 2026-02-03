"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Searchbar from "./Searchbar";
import Menu from "./Menu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleMenuOpen = () => {
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  // GSAP ScrollTrigger for backdrop blur
  useGSAP(() => {
    if (!headerRef.current) return;

    gsap.fromTo(headerRef.current,
      {
        backgroundColor: "rgba(255,255,255,0)",
        backdropFilter: "blur(10px)",
      },
      {
        backgroundColor: "rgba(255,255,255,0)",
        backdropFilter: "blur(12px)",
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "body",
          start: "top -1",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: headerRef });

  // Handle menu state changes with GSAP
  useGSAP(() => {
    if (!headerRef.current) return;

    if (showMenu) {
      // Menu open: solid white background, override scroll trigger
      gsap.to(headerRef.current, {
        backgroundColor: "rgba(255,255,255,1)",
        backdropFilter: "blur(0px)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: true, // Override scroll trigger animation
      });
    } else {
      // Menu closed: let scroll trigger take control again
      ScrollTrigger.refresh();
    }
  }, { dependencies: [showMenu], scope: headerRef });

  return (
    <>
      {/* NAVBAR */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 text-black"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0)", // Initial transparent
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        }}
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

      {/* MENU COMPONENT */}
      <Menu open={showMenu} onClose={handleMenuClose} />

      {/* SEARCHBAR OVERLAY */}
      <Searchbar open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}
