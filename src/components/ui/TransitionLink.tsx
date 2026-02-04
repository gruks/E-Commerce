"use client";

import Link from "next/link";
import { useTransitionRouter } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

function closeStaggeredMenu() {
  // Find and close the StaggeredMenu
  const menuButton = document.querySelector('.sm-toggle') as HTMLButtonElement;
  
  // Check if menu is open and close it
  if (menuButton) {
    const isMenuOpen = menuButton.getAttribute('aria-expanded') === 'true';
    if (isMenuOpen) {
      console.log('Closing menu due to page transition');
      menuButton.click(); // Trigger the menu close
    }
  }
}

export default function TransitionLink({ href, children, className }: Props) {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Don't transition if it's the same page
    if (pathname === href) {
      return;
    }

    // Close menu before transition
    closeStaggeredMenu();

    // Use next-view-transitions for smooth page transitions
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}