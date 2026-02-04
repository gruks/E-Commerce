"use client";

import { NAVBAR_ITEMS } from "@/src/styles/constants";
import StaggeredMenu from "../ui/StaggeredMenu";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

export default function Menu({ open, onClose }: MenuProps) {
  // Transform NAVBAR_ITEMS to match StaggeredMenu interface
  const menuItems = NAVBAR_ITEMS.map(item => ({
    label: item.label,
    ariaLabel: `Go to ${item.label.toLowerCase()}`,
    link: item.href || '#'
  }));

  // Social media items
  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'Twitter', link: 'https://twitter.com' }
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 45, pointerEvents: open ? 'auto' : 'none' }}>
      <StaggeredMenu
        position="left"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        logoUrl="/path-to-your-logo.svg"
        accentColor="#5227FF"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')} isFixed={false}      />
      
      {/* Hide the StaggeredMenu's built-in button */}
      <style jsx>{`
        :global(.staggered-menu-header) {
          display: none !important;
        }
        :global(.sm-panel-item) {
          font-size: 2.5rem !important;
        }
      `}</style>
    </div>
  );
}