"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useCartActions } from "../../lib/cartHelpers";

type Props = {
  product: {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    rating: number;
    imageFront: string;
    imageBack: string;
    hasSizes?: boolean;
    availability?: boolean;
  };
};

export default function ProductCard({ product }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { addToCartAndOpenDrawer } = useCartActions();

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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if this is inside a Link
    
    if (!product.availability || isAddingToCart) return;
    
    try {
      setIsAddingToCart(true);
      await addToCartAndOpenDrawer(product.id, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div
        ref={cardRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="group p-4 cursor-pointer
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
          <h3 className="text-sm font-semibold text-#fffff0">
            {product.name}
          </h3>

          <p className="text-xs text-white mt-1">
            {product.subtitle}
          </p>

          {/* RATING */}
          <div className="flex gap-1 text-xs text-#fffff0 mt-1">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </div>

          {/* PRICE */}
          <p className="text-sm font-medium">
            ${product.price}
          </p>

          {/* AVAILABILITY STATUS */}
          {!product.availability && (
            <p className="text-xs text-red-500">Out of Stock</p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            disabled={!product.availability || isAddingToCart}
            className="w-full mt-3 py-2
                       bg-white text-black text-sm
                       hover:bg-white-800 transition
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                Adding...
              </div>
            ) : !product.availability ? (
              "Out of Stock"
            ) : product.hasSizes ? (
              "Select Size"
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}