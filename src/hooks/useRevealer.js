"use client";

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useRevealer(options = {}) {
    const {
        delay = 0.5,
        duration = 1.2,
        ease = "power3.inOut",
        revealerColor = "#fc6902",
        onComplete = null
    } = options;

    const pathname = usePathname();
    const previousPathname = useRef(pathname);
    const hasAnimated = useRef(false);

    useGSAP(() => {
        // Check if we're on the same page (no transition needed)
        const isSamePage = previousPathname.current === pathname;
        
        // Skip animation if same page or already animated
        if (isSamePage && hasAnimated.current) {
            // Hide revealer immediately for same page
            gsap.set(".revealer", { scaleY: 0 });
            return;
        }

        // Reset animation flag for new pages
        if (!isSamePage) {
            hasAnimated.current = false;
        }

        // Animate the revealer out with smooth transition
        gsap.to(".revealer", {
            scaleY: 0,
            duration: duration,
            delay: delay,
            ease: ease,
            onComplete: () => {
                hasAnimated.current = true;
                onComplete?.();
            }
        });

        // Update previous pathname
        previousPathname.current = pathname;
    }, [pathname, delay, duration, ease]);

    // Reset animation state when pathname changes
    useEffect(() => {
        if (previousPathname.current !== pathname) {
            hasAnimated.current = false;
        }
    }, [pathname]);

    return { revealerColor };
}