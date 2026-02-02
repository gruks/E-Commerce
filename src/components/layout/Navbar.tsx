"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Instagram, Facebook, Twitter } from "lucide-react";
import Searchbar from "./Searchbar";
import { NAVBAR_ITEMS } from "@/src/styles/constants";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setActiveSubmenu(null);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showMenu]);

  const handleSubmenuOpen = (itemLabel: string) => {
    console.log('handleSubmenuOpen called with:', itemLabel);
    setActiveSubmenu(itemLabel);
  };

  const handleSubmenuClose = () => {
    setActiveSubmenu(null);
  };

  const getCurrentItems = () => {
    if (activeSubmenu) {
      const activeItem = NAVBAR_ITEMS.find(item => item.label === activeSubmenu);
      if (activeItem && 'subcategories' in activeItem && activeItem.subcategories) {
        return activeItem.subcategories;
      }
      return []; // Return empty array if no subcategories found
    }
    return NAVBAR_ITEMS;
  };

  const handleItemClick = (item: (typeof NAVBAR_ITEMS)[number] | { label: string; href: string }) => {
    console.log('handleItemClick called with item:', item);
    if ('hasSubcategories' in item && item.hasSubcategories) {
      console.log('Item has subcategories, opening submenu for:', item.label);
      handleSubmenuOpen(item.label);
    } else {
      console.log('Item has no subcategories, closing menu');
      setShowMenu(false);
    }
  };

  const handleSubcategoryClick = () => {
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
          <button 
            onClick={() => showMenu ? setShowMenu(false) : setShowMenu(true)}
            className="text-sm font-medium tracking-wide hover:text-[#fc6902] transition-colors"
          >
            {showMenu ? "Close" : "Menu"}
          </button>

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

      {/* MENU OVERLAY AND DRAWER */}
      {showMenu && (
        <>
          {/* Transparent Overlay */}
          <div 
            className={`fixed inset-0 z-40 transition-all duration-700 ease-out ${
              showMenu ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              background: showMenu ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)',
              backdropFilter: showMenu ? 'blur(4px)' : 'blur(0px)',
              WebkitBackdropFilter: showMenu ? 'blur(4px)' : 'blur(0px)',
              transitionProperty: 'opacity, backdrop-filter, -webkit-backdrop-filter, background-color',
              transitionDuration: '0.7s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          />

          {/* Menu Drawer */}
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full bg-white z-50 font-quicksand overflow-hidden shadow-2xl ${
              showMenu ? "translate-x-0" : "-translate-x-full"
            } transition-all duration-700 ease-out`}
            style={{
              width: '400px',
              maxWidth: '70vw',
              padding: '0',
              backgroundColor: 'rgb(255, 255, 255)',
              zIndex: 100,
              transform: showMenu ? 'translateX(0)' : 'translateX(-100%)',
              transitionProperty: 'transform, opacity, box-shadow',
              transitionDuration: '0.7s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: showMenu ? 1 : 0
            }}
          >
            {/* Main Menu */}
            <div className={`absolute inset-0 transition-all duration-500 ease-out ${
              activeSubmenu ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
            }`} style={{
              transitionProperty: 'transform, opacity',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}>
              {/* Header - matches navbar height */}
              <div 
                className="flex items-center"
                style={{
                  height: '65px',
                  paddingLeft: '3rem',
                  paddingRight: '2rem',
                  borderBottomWidth: '0.1rem'
                }}
              >
                X
                {/* Empty space to match navbar layout */}
              </div>

              {/* Navigation */}
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '120px' }}>
                  <nav 
                    className="py-0 border-black"
                    style={{
                      paddingLeft: '2rem !important',
                      paddingInlineStart: '2rem !important'
                    }}
                  >
                    <style dangerouslySetInnerHTML={{
                      __html: `
                        @media screen and (min-width: 750px) {
                          nav {
                            padding-left: 3rem !important;
                            padding-inline-start: 3rem !important;
                          }
                        }
                      `
                    }} />
                    
                    <ul 
                      className="list-none p-0 m-0" 
                      style={{ 
                        listStyle: 'none', 
                        padding: 0, 
                        margin: 0
                      }}
                    >
                      {(() => {
                        const items = getCurrentItems();
                        return items.map((item, index) => (
                          <li 
                            key={item.label} 
                            className={`${index === items.length - 1 ? '' : 'border-b border-gray-900'}`} 
                            style={{ 
                              borderBottomWidth: index === items.length - 1 ? '0' : '0.1rem'
                            }}
                          >
                            <div
                              className="flex items-center justify-between hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                              style={{ 
                                padding: '1.2rem 0rem',
                                flex: '0 0 100%'
                              }}
                              onClick={() => handleItemClick(item)}
                            >
                              <Link
                                href={item.href}
                                className="flex-1 font-medium text-gray-900 tracking-wide uppercase no-underline"
                                style={{ 
                                  fontSize: '0.75rem',
                                  fontFamily: 'var(--font-navigation-family, var(--font-heading-family, inherit))',
                                  color: 'rgb(0, 0, 0)',
                                  letterSpacing: '0.05rem'
                                }}
                                onClick={(e) => {
                                  if ('hasSubcategories' in item && item.hasSubcategories) {
                                    e.preventDefault();
                                  } else {
                                    // For subcategories or regular items, close the menu
                                    if (activeSubmenu) {
                                      handleSubcategoryClick();
                                    } else {
                                      setShowMenu(false);
                                    }
                                  }
                                }}
                              >
                                {item.label}
                              </Link>
                              
                              {('hasSubcategories' in item && item.hasSubcategories) && (
                                <ChevronRight className="w-2 h-2 text-gray-400 group-hover:text-gray-600 transition-colors duration-200 mr-2" />
                              )}
                            </div>
                          </li>
                        ));
                      })()}
                    </ul>
                  </nav>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-900 bg-white mt-auto" style={{ borderTopWidth: '0rem', position: 'sticky', bottom: 0 }}>
                  <div style={{ paddingLeft: '2rem !important', paddingInlineStart: '2rem !important' }}>
                    <style dangerouslySetInnerHTML={{
                      __html: `
                        @media screen and (min-width: 750px) {
                          .footer-content {
                            padding-left: 3rem !important;
                            padding-inline-start: 3rem !important;
                          }
                        }
                      `
                    }} />
                    <div 
                      className="footer-content flex flex-wrap items-center justify-between border-t border-black"
                      style={{
                        rowGap: '0.5rem',
                        columnGap: '1.5rem',
                        padding: '1.5rem',
                        borderTopWidth: '0.1rem'
                      }}
                    >
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          @media screen and (min-width: 750px) {
                            .footer-content {
                              column-gap: 2rem !important;
                              padding: 1rem !important;
                            }
                          }
                        `
                      }} />
                      <Link
                        href="/account"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center hover:bg-gray-50 transition-all duration-200 no-underline uppercase font-medium"
                        style={{ 
                          fontSize: '0.75rem',
                          color: 'rgb(0, 0, 0)',
                          fontFamily: 'var(--font-navigation-family, var(--font-heading-family, inherit))',
                          letterSpacing: '0.05rem'
                        }}
                      >
                        <span>My Account</span>
                      </Link>
                        
                        {/* Social Media Icons */}
                        <div className="flex items-center space-x-2">
                          <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-700 hover:bg-black hover:text-white rounded transition-all duration-300 ease-in-out"
                            style={{
                              width: '1.8rem',
                              height: '1.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                          <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-700 hover:bg-black hover:text-white rounded transition-all duration-300 ease-in-out"
                            style={{
                              width: '1.8rem',
                              height: '1.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                          <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-700 hover:bg-black hover:text-white rounded transition-all duration-300 ease-in-out"
                            style={{
                              width: '1.8rem',
                              height: '1.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* SEARCHBAR OVERLAY */}
      <Searchbar open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}
