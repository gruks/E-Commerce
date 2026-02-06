"use client";

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, useState, useEffect } from 'react';
import { useLoadingState } from '@/src/contexts/LoadingContext';

export function useTextAnimation(options = {}) {
    const {
        delay = 0.2,
        letterDelay = 0.06,
        lineDelay = 0.06
    } = options;

    const containerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const { isPageLoaded } = useLoadingState();

    useEffect(() => {
        console.log('useTextAnimation - isPageLoaded:', isPageLoaded);
        
        // Set ready when page is loaded OR after a timeout (fallback)
        if (isPageLoaded) {
            console.log('Page loaded, setting animation ready after delay');
            const timer = setTimeout(() => {
                setIsReady(true);
                console.log('Animation ready set to true');
            }, 100);

            return () => clearTimeout(timer);
        } else {
            // Fallback: if page hasn't loaded after 1 second, start animations anyway
            const fallbackTimer = setTimeout(() => {
                console.log('Fallback: Starting animations after timeout');
                setIsReady(true);
            }, 1000);

            return () => clearTimeout(fallbackTimer);
        }
    }, [isPageLoaded]);

    useGSAP(() => {
        console.log('useGSAP running - isReady:', isReady);
        
        if (!containerRef.current || !isReady) {
            console.log('Animation blocked - not ready yet');
            return;
        }

        // Find text elements within this specific container
        const letters = containerRef.current.querySelectorAll(".letter");
        const words = containerRef.current.querySelectorAll(".word");
        const lines = containerRef.current.querySelectorAll(".line");

        console.log('Starting text animation:', {
            letters: letters.length,
            words: words.length,
            lines: lines.length,
            delay
        });

        // Set initial state to ensure elements are visible but positioned
        if (letters.length > 0) {
            gsap.set(letters, { opacity: 0, yPercent: 100 });
        }
        if (words.length > 0) {
            gsap.set(words, { opacity: 0, yPercent: 100 });
        }
        if (lines.length > 0) {
            gsap.set(lines, { opacity: 0, yPercent: 100 });
        }

        // Animate letters/words using your specific animation
        if (letters.length > 0) {
            gsap.to(letters, {
                opacity: 1,
                yPercent: 0,
                duration: 1.8,
                ease: 'expo.out',
                stagger: letterDelay,
                delay: delay + 0.2
            });
        }

        if (words.length > 0) {
            gsap.to(words, {
                opacity: 1,
                yPercent: 0,
                duration: 1.8,
                ease: 'expo.out',
                stagger: letterDelay,
                delay: delay + 0.2
            });
        }

        // Animate lines using your specific animation
        if (lines.length > 0) {
            gsap.to(lines, {
                opacity: 1,
                yPercent: 0,
                duration: 1.8,
                ease: 'expo.out',
                stagger: lineDelay,
                delay: delay + 1
            });
        }
    }, { scope: containerRef, dependencies: [isReady, delay] });

    return containerRef;
}