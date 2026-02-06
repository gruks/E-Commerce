"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CATEGORIES } from "../../styles/constants";

gsap.registerPlugin(ScrollTrigger);

export default function CircularImage() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  
  // Use static categories - no DB fetch needed
  const categories = CATEGORIES;
  const [visibleRange, setVisibleRange] = useState([0, 6]);

  // Initialize GSAP animations on mount
  useEffect(() => {
    let lenis: any = null;
    let resizeObserver: ResizeObserver | null = null;

    const init = async () => {
      try {
        // SSR-safe Lenis import
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        const section = sectionRef.current;
        if (!section) return;

        const cards = () => section.querySelectorAll(".card");

        // Responsive radius calculation
        const getRadius = () =>
          window.innerWidth < 900
            ? window.innerWidth * 0.7
            : window.innerWidth * 0.35;

        // Arc configuration for circular layout
        const arcAngle = Math.PI * 0.4;
        const startAngle = Math.PI / 2 - arcAngle / 2;

        /**
         * Position cards in circular arc based on scroll progress
         * Uses GPU-accelerated transforms for optimal performance
         */
        function position(progress = 0) {
          const radius = getRadius();
          const list = cards();
          const total = list.length;

          if (total === 0) return;

          // Calculate scroll-based adjustment
          const totalTravel = 1 + total / 7.5;
          const adjust = (progress * totalTravel - 1) * 0.75;

          list.forEach((card, i) => {
            const normalized = (total - i - 1) / total;
            const p = normalized + adjust;

            // Calculate position on arc
            const angle = startAngle + arcAngle * p;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

            // GPU-accelerated transform
            gsap.set(card, {
              x,
              y: -y + radius,
              rotation: -rotation,
              transformOrigin: "center center",
              force3D: true, // Force GPU acceleration
              willChange: "transform",
            });
          });

          // Update virtualization window for performance
          // Only render cards near the viewport
          const centerIndex = Math.floor(progress * categories.length);
          setVisibleRange([
            Math.max(0, centerIndex - 5),
            Math.min(categories.length, centerIndex + 5),
          ]);
        }

        // Create ScrollTrigger for pinning and scrubbing
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * 7}`,
          pin: true,
          scrub: true,
          onUpdate: (self) => position(self.progress),
        });

        // Initial position
        position(0);

        // Handle window resize with debouncing via ResizeObserver
        resizeObserver = new ResizeObserver(() => {
          ScrollTrigger.refresh();
          const currentProgress = ScrollTrigger.getAll()[0]?.progress || 0;
          position(currentProgress);
        });

        resizeObserver.observe(section);
      } catch (err) {
        console.error("Error initializing animations:", err);
      }
    };

    init();

    // Cleanup function to prevent memory leaks
    return () => {
      ScrollTrigger.killAll();
      resizeObserver?.disconnect();
      lenis?.destroy();
      gsap.ticker.remove((time) => lenis?.raf(time * 1000));
    };
  }, [categories.length]);

  // Handle category card click navigation
  const handleCategoryClick = (slug: string) => {
    router.push(`/shop/${slug}`);
  };

  // Render virtualized cards for performance
  // Only render cards within visible range
  const visibleCards = [];
  for (let i = visibleRange[0]; i < Math.min(visibleRange[1], categories.length); i++) {
    const category = categories[i];
    
    visibleCards.push(
      <div
        key={category.id}
        className="card absolute w-[260px] h-[320px] shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
        style={{ willChange: "transform" }}
        onClick={() => handleCategoryClick(category.slug)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCategoryClick(category.slug);
          }
        }}
        aria-label={`View ${category.name} category`}
      >
        {/* Category Image */}
        <div className="relative w-full h-2/3 bg-gray-100">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="260px"
            priority={i < 6} // Prioritize first 6 images
          />
        </div>

        {/* Category Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg text-center">
            {category.name}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="steps relative h-screen w-full overflow-hidden bg-gray-50"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {visibleCards}
      </div>
    </section>
  );
}
