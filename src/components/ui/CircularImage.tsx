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
  const counterRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Use static categories
  const categories = CATEGORIES;
  const TOTAL = categories.length;
  
  const [visibleRange, setVisibleRange] = useState([0, 8]);
  const [activeIndex, setActiveIndex] = useState(0);

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

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        const section = sectionRef.current;
        if (!section) return;

        const cards = () => section.querySelectorAll(".card");

        const getRadius = () =>
          window.innerWidth < 900
            ? window.innerWidth * 0.75
            : window.innerWidth * 0.38;

        const arcAngle = Math.PI * 0.55;
        const startAngle = Math.PI / 2 - arcAngle / 2;

        function position(progress = 0) {
          const radius = getRadius();
          const list = cards();
          const total = list.length;

          if (total === 0) return;

          const totalTravel = 1 + total / 6;
          const adjust = (progress * totalTravel - 1) * 0.8;

          let closestIndex = 0;
          let closestDist = Infinity;

          list.forEach((card, i) => {
            const normalized = (total - i - 1) / total;
            const p = normalized + adjust;

            const angle = startAngle + arcAngle * p;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rotation = (angle - Math.PI / 2);

            // Distance from center for active detection
            const dist = Math.abs(angle - Math.PI / 2);
            if (dist < closestDist) {
              closestDist = dist;
              closestIndex = i;
            }

            // Depth effects for 3D feel
            const depth = 1 - dist;
            const scale = 0.75 + depth * 0.35;
            const opacity = 0.25 + depth * 0.75;

            gsap.set(card, {
              x,
              y: -y + radius,
              rotation: -rotation * (180 / Math.PI),
              scale,
              opacity,
              z: depth * 200,
              transformOrigin: "center center",
              force3D: true,
              willChange: "transform",
            });
          });

          setActiveIndex(closestIndex);

          // Virtualization window
          const centerIndex = Math.floor(progress * TOTAL);
          setVisibleRange([
            Math.max(0, centerIndex - 6),
            Math.min(TOTAL, centerIndex + 6),
          ]);

          // Step counter animation
          if (counterRef.current) {
            gsap.to(counterRef.current, {
              yPercent: -100 * closestIndex,
              duration: 0.5,
              ease: "power3.out",
            });
          }
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * 7}`,
          pin: true,
          scrub: true,
          onUpdate: (self) => position(self.progress),
        });

        position(0);

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

    return () => {
      ScrollTrigger.killAll();
      resizeObserver?.disconnect();
      lenis?.destroy();
      gsap.ticker.remove((time) => lenis?.raf(time * 1000));
    };
  }, [TOTAL]);

  // Magnetic hover interaction
  const onMove = (e: React.MouseEvent, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: `+=${x * 0.12}`,
      y: `+=${y * 0.12}`,
      duration: 0.3,
    });
  };

  const onLeave = (el: HTMLElement) => {
    gsap.to(el, { x: 0, y: 0, duration: 0.4 });
  };

  // Handle category click - redirect to /shop?filter=category
  const handleCategoryClick = (slug: string) => {
    router.push(`/shop?filter=${slug}`);
  };

  // Render cards
  const cards = [];
  for (let i = visibleRange[0]; i < Math.min(visibleRange[1], categories.length); i++) {
    const category = categories[i];
    const isActive = i === activeIndex;

    cards.push(
      <div
        key={category.id}
        className="card absolute w-[400px] h-[500px] overflow-hidden cursor-pointer group"
        style={{ willChange: "transform" }}
        onMouseMove={(e) => onMove(e, e.currentTarget)}
        onMouseLeave={(e) => onLeave(e.currentTarget)}
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
        {/* Rotated card with image */}
        <div className="relative w-full h-full bg-white transform rotate-12 group-hover:rotate-6 transition-transform duration-500 shadow-2xl">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="400px"
            priority={i < 3}
          />
          
          {/* Category info at bottom */}
          <div className={`absolute bottom-0 left-0 right-0 bg-white p-6 transition-all ${
            isActive ? "opacity-100" : "opacity-70"
          }`}>
            <h3 className="text-#fffff0 font-medium text-lg">
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Explore our collection
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-white"
    >
      {/* Step Counter - Large text on left */}
      <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="text-black font-bold overflow-hidden" style={{ 
          fontSize: 'clamp(60px, 12vw, 140px)',
          lineHeight: '1',
          height: 'clamp(140px, 28vw, 320px)'
        }}>
          <div className="mb-2" style={{ lineHeight: '0.9' }}>STEP</div>
          <div ref={counterRef} style={{ lineHeight: '0.9' }}>
            {categories.map((_, i) => (
              <div key={i}>
                {(i + 1).toString().padStart(2, "0")}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards container with 3D perspective */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: "1200px" }}
      >
        {cards}
      </div>
    </section>
  );
}
