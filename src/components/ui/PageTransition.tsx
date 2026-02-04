"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Try to import CustomEase, fallback to custom implementation
let CustomEase: any;
try {
  CustomEase = require("gsap/CustomEase");
  gsap.registerPlugin(CustomEase);
} catch (e) {
  // Fallback: Create our own CustomEase-like functionality
  console.log("CustomEase not available, using fallback");
}

// Create the "hop" ease - either with CustomEase or fallback
function initializeHopEase() {
  if (CustomEase && CustomEase.create) {
    // Use the real CustomEase plugin if available
    CustomEase.create("hop", "0.9, 0, 0.1, 1");
    return "hop";
  } else {
    // Fallback: Use a close approximation with built-in eases
    return "power4.out"; // Very close to cubic-bezier(0.9, 0, 0.1, 1)
  }
}

const hopEase = initializeHopEase();

export function useRevealer() {
  useGSAP(() => {
    // Slower, more premium timing for luxury feel
    gsap.to(".revealer", {
      scaleY: 0,
      duration: 2.5, // Increased from 1.5s to 2.5s for premium feel
      delay: 1.5,    // Increased from 1s to 1.5s for more anticipation
      ease: hopEase,
    });
  }, []);
}

function triggerPageTransition() {
  // Premium polygon animation with slower timing
  if (document.documentElement.animate) {
    document.documentElement.animate(
      [
        {
          clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 3000, // Increased from 2000ms to 3000ms for premium feel
        easing: "cubic-bezier(0.9, 0, 0.1, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }
}

interface NavProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function Nav({ children, href, className }: NavProps) {
  const router = useTransitionRouter();
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    
    if (pathname !== href) {
      triggerPageTransition();
      router.push(href);
    }
  }

  return (
    <div className={className}>
      <div className="nav">
        <div className="col">
          <Link href={href} onClick={handleClick}>
            {children}
          </Link>
        </div>
      </div>
    </div>
  );
}

// Export a hook for page-level revealer animations with the "hop" CustomEase effect
export function usePageRevealer() {
  useEffect(() => {
    console.log("🎬 Initializing page revealer with CustomEase 'hop' effect");
    
    // Create revealer element
    let revealer = document.querySelector('.revealer') as HTMLElement;
    if (!revealer) {
      revealer = document.createElement('div');
      revealer.className = 'revealer';
      revealer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #fc6902 0%, #e85f02 100%);
        z-index: 9999;
        pointer-events: none;
        transform-origin: center top;
        transform: scaleY(1);
        opacity: 1;
      `;
      document.body.appendChild(revealer);
      console.log("✅ Revealer element created and visible");
    }

    // Initialize the hop ease and animate
    const easeToUse = initializeHopEase();
    console.log(`🎯 Using ease: ${easeToUse} (CustomEase 'hop' equivalent)`);
    
    // Animate with premium, slower timing for luxury feel
    gsap.to(revealer, {
      scaleY: 0,
      duration: 2.5, // Increased from 1.25s to 2.5s for premium feel
      delay: 1.5,    // Increased from 1s to 1.5s for more anticipation
      ease: easeToUse,
      onStart: () => {
        console.log("🚀 Premium revealer animation started with CustomEase 'hop' (slower timing)");
      },
      onComplete: () => {
        console.log("✨ Premium revealer animation completed - luxurious page reveal!");
        if (revealer.parentNode) {
          revealer.parentNode.removeChild(revealer);
        }
      }
    });
  }, []);
}