"use client";

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, useState, useEffect } from 'react';

export function useTextAnimation(options = {}) {
    const {
        delay = 0.2, // Much shorter since no GSAP revealer
        letterDelay = 0.06,
        lineDelay = 0.06
    } = options;

    const containerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 50);

        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (!containerRef.current || !isReady) return;

        // Find text elements within this specific container
        const letters = containerRef.current.querySelectorAll(".letter");
        const words = containerRef.current.querySelectorAll(".word");
        const lines = containerRef.current.querySelectorAll(".line");

        console.log('Animation hook running:', {
            letters: letters.length,
            words: words.length,
            lines: lines.length,
            delay
        });

        // Set initial state to ensure elements are visible but positioned
        if (letters.length > 0) {
            gsap.set(letters, { opacity: 0, yPercent: 100 });
            console.log('Animating letters with delay:', delay + 0.2);
        }
        if (words.length > 0) {
            gsap.set(words, { opacity: 0, yPercent: 100 });
            console.log('Animating words with delay:', delay + 0.2);
        }
        if (lines.length > 0) {
            gsap.set(lines, { opacity: 0, yPercent: 100 });
            console.log('Animating lines with delay:', delay + 1);
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