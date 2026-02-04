"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";

type Props = {
  product: {
    name: string;
    subtitle: string;
    price: number;
    rating: number;
    imageFront: string;
    imageBack: string;
    hasSizes?: boolean;
  };
};

export default function ProductCard({ product }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    gsap.to(frontRef.current, {
      rotateY: 180,
      duration: 0.6,
      ease: "power3.inOut",
    });
    gsap.to(backRef.current, {
      rotateY: 0,
      duration: 0.6,
      ease: "power3.inOut",
    });
  };

  const onLeave = () => {
    gsap.to(frontRef.current, {
      rotateY: 0,
      duration: 0.6,
      ease: "power3.inOut",
    });
    gsap.to(backRef.current, {
      rotateY: -180,
      duration: 0.6,
      ease: "power3.inOut",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group p-4
                 transition-shadow hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative h-[280px] perspective-[1200px]">
        {/* FRONT */}
        <div
          ref={frontRef}
          className="absolute inset-0 backface-hidden"
        >
          <Image
            src={product.imageFront}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        {/* BACK */}
        <div
          ref={backRef}
          className="absolute inset-0 backface-hidden rotate-y-[-180deg]"
        >
          <Image
            src={product.imageBack}
            alt={`${product.name} info`}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-semibold text-neutral-900">
          {product.name}
        </h3>

        <p className="text-xs text-neutral-500 mt-1">
          {product.subtitle}
        </p>

        {/* RATING */}
        <div className="flex gap-1 text-xs text-black mt-1">
          {"★".repeat(product.rating)}
          {"☆".repeat(5 - product.rating)}
        </div>

        {/* PRICE */}
        <p className="text-sm font-medium">
          On Sale from ₹{product.price}
        </p>

        {/* BUTTON */}
        <button
          className="w-full mt-3 py-2
                     bg-black text-white text-sm
                     hover:bg-neutral-800 transition"
        >
          {product.hasSizes ? "Select Size" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}