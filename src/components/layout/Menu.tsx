"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { NAVBAR_ITEMS } from "@/src/styles/constants";
import gsap from "gsap";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

// Define MenuItem type locally since it's not exported
interface MenuItem {
  label: string;
  href: string;
  hasSubcategories: boolean;
  subcategories?: MenuItem[];
}

export default function Menu({ open, onClose }: MenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP Animation for menu slide in/out
  useEffect(() => {
    if (!menuRef.current) return;

    if (open) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 1.1,
        ease: "power4.out",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "-100%",
        duration: 0.8,
        ease: "power4.in"
      });
    }
  }, [open]);

  // GSAP Animation for submenu transitions
  useEffect(() => {
    if (!contentRef.current) return;

    // Animate content when submenu changes
    gsap.fromTo(contentRef.current, 
      { 
        opacity: 0,
        x: 20
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out"
      }
    );
  }, [activeSubmenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (
            menuRef.current &&
            !menuRef.current.contains(target) &&
            !target.closest('[data-menu-toggle]')
        ) {
            onClose();
        }
    };

    if (open) {
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
  }, [open, onClose]);

  const handleSubmenuClose = () => {
    // Animate out before changing state
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveSubmenu(null);
        }
      });
    } else {
      setActiveSubmenu(null);
    }
  };

  const getCurrentItems = (): MenuItem[] => {
    if (!activeSubmenu) {
      return NAVBAR_ITEMS as MenuItem[];
    }
    
    const activeItem = (NAVBAR_ITEMS as MenuItem[]).find(
      item => item.label === activeSubmenu
    );
    
    return activeItem?.subcategories ?? [];
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.hasSubcategories) {
      // Animate out current content before showing submenu
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          x: 20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setActiveSubmenu(item.label);
          }
        });
      } else {
        setActiveSubmenu(item.label);
      }
    } else {
      onClose();
    }
  };

  const handleSubcategoryClick = () => {
    onClose();
    setActiveSubmenu(null);
  };

  return (
    <>
      {open && (
        <>
          {/* Transparent Overlay */}
          <div 
            className={`fixed inset-0 z-40 transition-all duration-700 ease-out ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              background: open ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)',
              backdropFilter: open ? 'blur(4px)' : 'blur(0px)',
              WebkitBackdropFilter: open ? 'blur(4px)' : 'blur(0px)',
              transitionProperty: 'opacity, backdrop-filter, -webkit-backdrop-filter, background-color',
              transitionDuration: '0.7s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          />

          {/* Menu Drawer */}
          <div
            ref={menuRef}
            className="fixed left-0 h-screen bg-white z-50 font-quicksand overflow-hidden shadow-2xl"
            style={{
              width: '400px',
              maxWidth: '70vw',
              padding: '0',
              backgroundColor: 'rgb(255, 255, 255)',
              zIndex: 100,
              transform: 'translateX(-100%)', // Initial position for GSAP
              top: '65px',
              height: 'calc(100vh - 65px)',
            }}
          >
            {/* Main Menu Container */}
            <div className="flex flex-col h-full">
              {/* Navigation Content - Scrollable */}
              <div className="flex-1 overflow-y-auto" style={{ paddingTop: '0px' }}>
                <nav 
                  className="py-0"
                  style={{
                    paddingLeft: '2rem',
                    paddingInlineStart: '2rem'
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
                  
                  <div ref={contentRef}>
                    <ul 
                      className="list-none p-0 m-0" 
                      style={{ 
                        listStyle: 'none', 
                        padding: 0, 
                        margin: 0
                      }}
                    >
                      {/* Back button and heading for subcategories */}
                      {activeSubmenu && (
                        <li className="border-b border-gray-900" style={{ borderBottomWidth: '0.05rem' }}>
                          <div
                            className="flex items-center hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                            style={{ 
                              padding: '1.2rem 0rem',
                              flex: '0 0 100%'
                            }}
                            onClick={handleSubmenuClose}
                          >
                            <ArrowLeft className="w-4 h-4 text-gray-600" style={{ marginRight: '1rem' }} />
                            <span
                              className="flex font-bold text-gray-900 tracking-wide uppercase"
                              style={{ 
                                fontSize: '0.82rem',
                                fontFamily: 'var(--font-navigation-family, var(--font-heading-family, inherit))',
                                color: 'rgb(0, 0, 0)',
                                letterSpacing: '0.05rem',
                              }}
                            >
                              {activeSubmenu}
                            </span>
                          </div>
                        </li>
                      )}
                      
                      {(() => {
                        const items = getCurrentItems();
                        return items.map((item, index) => (
                          <li 
                            key={item.label} 
                            className={`${index === items.length - 1 ? '' : 'border-b border-gray-900'}`} 
                            style={{ 
                              borderBottomWidth: index === items.length - 1 ? '0' : '0.05rem'
                            }}
                          >
                            <div
                              className="flex items-center justify-between hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                              style={{ 
                                padding: '1.2rem 0rem',
                                flex: '0 0 100%'
                              }}
                              onClick={() => {
                                if (item.hasSubcategories) {
                                  handleItemClick(item);
                                } else if (activeSubmenu) {
                                  // We're in a submenu, so this is a subcategory click
                                  handleSubcategoryClick();
                                }
                                // For main menu items without subcategories, let the Link handle navigation
                              }}
                            >
                              <Link
                                href={item.href}
                                className="flex font-medium text-gray-900 tracking-wide uppercase no-underline"
                                style={{ 
                                  fontSize: '0.75rem',
                                  fontFamily: 'var(--font-navigation-family, var(--font-heading-family, inherit))',
                                  color: 'rgb(0, 0, 0)',
                                  letterSpacing: '0.05rem'
                                }}
                                onClick={(e) => {
                                  if (item.hasSubcategories) {
                                    e.preventDefault();
                                  } else {
                                    // For items without subcategories, close the menu and allow navigation
                                    onClose();
                                  }
                                }}
                              >
                                {item.label}
                              </Link>
                              
                              {item.hasSubcategories && (
                                <ChevronRight className="w-2 h-2 text-gray-400 group-hover:text-gray-600 transition-colors duration-200 mr-2" />
                              )}
                            </div>
                          </li>
                        ));
                      })()}
                    </ul>
                  </div>
                </nav>
              </div>

              {/* Footer - Fixed at bottom */}
              <div className="bg-white border-t border-gray-900 mt-auto" style={{ borderTopWidth: '0.05rem' }}>
                <div style={{ paddingLeft: '2rem', paddingInlineStart: '2rem' }}>
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
                    className="footer-content flex flex-wrap items-center justify-between"
                    style={{
                      rowGap: '0.5rem',
                      columnGap: '1.5rem',
                      padding: '1.5rem'
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
                      onClick={onClose}
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
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
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
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
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
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}