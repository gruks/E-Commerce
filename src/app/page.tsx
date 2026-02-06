"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Truck, Shield, Headphones, Star } from "lucide-react";
import StarBorder from "../components/ui/StarBorder";
import { AnimatedLetters, AnimatedWords, AnimatedLines } from "../components/ui/AnimatedText";
import { usePageRevealer } from "../components/ui/PageTransition";
import ClientWrapper from "../components/ui/ClientWrapper";
import { CATEGORIES, getBestSellers } from "../styles/constants";
import ProductCard from "../components/ui/ProductCard";
import {
  FlaskConical,
  Eye,
  Wallet,
  Globe
} from "lucide-react";

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="min-h-screen bg-primary from-gray-100 via-gray-50 to-white relative overflow-hidden px-4 sm:px-8 md:px-12 lg:px-20"
    >
      <div className="promo-heading flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          style={{
            fontFamily: 'font-heading',
            lineHeight: '110%',
            letterSpacing: '-0.02em'
          }}
        >
          <AnimatedLetters delay={1.3}>Pure Beauty Essence</AnimatedLetters>
        </h1>
        <Link href="/contact-us" className="flex-shrink-0">
          <StarBorder
            as="button"
            className="custom-class text-sm sm:text-base"
            color="magenta"
            speed="8s"
          >
            Contact Us
          </StarBorder>
        </Link>
      </div>
      <div className="divider-hero-line max-w-full bg-white"
        style={{
          marginTop: '1rem',
          marginBottom: '1rem',
          width: '100%',
          height: '0.05rem',
          translate: 'none',
          rotate: 'none',
          scale: 'none',
          transform: 'translate3d(0px, 0px, 0px)'
        }}>
      </div>
      <div className="promo-description">
        <span className="font-bold text-3xl sm:text-1xl md:text-2xl lg:text-3xl">
          <AnimatedWords delay={1.7}>BEAUTY</AnimatedWords>
        </span>
      </div>
    </section>
  );
};

// SECTION 1 — PRODUCT GRID (RESPONSIVE)
const ProductGridSection = () => {
  const router = useRouter();
  const products = getBestSellers().slice(0, 12);

  const scrollContainerRef = useRef(null);

  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ---------- RESPONSIVE CALC ----------
  const calcItems = () => {
    const w = window.innerWidth;

    if (w < 640) return 1;
    if (w < 768) return 2;
    if (w < 1024) return 3;
    return 4;
  };

  useEffect(() => {
    const update = () => setItemsPerSlide(calcItems());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  // ---------- SCROLL TO SLIDE ----------
  const scrollToSlide = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      left: container.clientWidth * index,
      behavior: "smooth",
    });
  };

  // ---------- TRACK ACTIVE SLIDE ----------
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const index = Math.round(
      container.scrollLeft / container.clientWidth
    );

    setCurrentSlide(index);
  };

  // ---------- PRODUCT CHUNKING ----------
  const slides = [];
  for (let i = 0; i < products.length; i += itemsPerSlide) {
    slides.push(products.slice(i, i + itemsPerSlide));
  }

  // ---------- TRANSFORM TO PRODUCTCARD FORMAT ----------
  const transformProduct = (product) => ({
    id: product.id,
    name: product.name,
    subtitle: product.description,
    price: product.price,
    rating: 4, // Default rating
    imageFront: product.image,
    imageBack: product.image,
    hasSizes: false,
    availability: product.inStock
  });

  return (
    <section className="bg-bg-tertiary py-16">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <h1 className="text-3xl font-bold text-#fffff0 mb-8">
          <AnimatedLetters>Our Best Sellers</AnimatedLetters>
        </h1>

        {/* SCROLLER */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          <div className="flex">

            {slides.map((slide, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full grid gap-6 snap-start"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerSlide}, minmax(0,1fr))`,
                }}
              >
                {slide.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={transformProduct(product)}
                  />
                ))}
              </div>
            ))}

          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center mt-8">
          <ul className="flex gap-2">
            {slides.map((_, i) => (
              <li key={i}>
                <button
                  onClick={() => scrollToSlide(i)}
                  className={`h-3 rounded-full transition-all ${
                    currentSlide === i
                      ? "bg-white w-8"
                      : "bg-gray-400 w-3"
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTER */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push("/shop")}
            className="px-8 py-3 bg-white text-black hover:bg-gray-800"
          >
            View All Products
          </button>
        </div>

      </div>
    </section>
  );
};


// SECTION 2 — SHOP BY CATEGORY (HORIZONTAL SCROLL)
const ShopByCategorySection = () => {
  const router = useRouter();

  const scrollContainerRef = useRef(null);

  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ---------- RESPONSIVE ITEMS ----------
  const calcItems = () => {
    const w = window.innerWidth;

    if (w < 640) return 1;
    if (w < 768) return 2;
    if (w < 1024) return 3;
    return 4;
  };

  useEffect(() => {
    const update = () => setItemsPerSlide(calcItems());
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ---------- CHUNK INTO SLIDES ----------
  const slides = [];
  for (let i = 0; i < CATEGORIES.length; i += itemsPerSlide) {
    slides.push(CATEGORIES.slice(i, i + itemsPerSlide));
  }

  // ---------- SCROLL ----------
  const scrollToSlide = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      left: container.clientWidth * index,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const index = Math.round(
      container.scrollLeft / container.clientWidth
    );
    setCurrentSlide(index);
  };

  return (
    <section className="bg-bg-tertiary py-16">
      <div className="container mx-auto px-4 max-w-[1280px]">

        <h2 className="text-3xl font-bold text-#fffff0 mb-8">
          Shop by Category
        </h2>

        {/* SCROLLER */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          <div className="flex">

            {slides.map((slide, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full grid gap-6 snap-start"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerSlide}, minmax(0,1fr))`,
                }}
              >
                {slide.map((category) => (
                  <div
                    key={category.id}
                    className="
                      aspect-square
                      cursor-pointer
                      hover:shadow-lg
                      transition
                      flex flex-col
                    "
                    onClick={() =>
                      router.push(`/shop?filter=${category.slug}`)
                    }
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex-1 relative">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="py-3 flex items-center justify-center">
                      <h3 className="text-#fffff0 font-medium text-center px-4">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ))}

          </div>
        </div>

        {/* DOT NAVIGATION */}
        <div className="flex justify-center mt-8">
          <ul className="flex gap-2">
            {slides.map((_, i) => (
              <li key={i}>
                <button
                  onClick={() => scrollToSlide(i)}
                  className={`h-3 rounded-full transition-all ${
                    currentSlide === i
                      ? "bg-white w-8"
                      : "bg-gray-400 w-3"
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

// SECTION 3 — FUTURE OF PERSONAL CARE
const FutureOfPersonalCareSection = () => {
  const features = [
    {
      title: "Transparency",
      text: "Full disclosure of ingredients used & their concentration",
      icon: Eye
    },
    {
      title: "Efficacy",
      text: "Formulations developed in our in-house laboratories",
      icon: FlaskConical
    },
    {
      title: "Affordable",
      text: "Skincare, accessible to all",
      icon: Wallet
    },
    {
      title: "Only the best",
      text: "Ingredients sourced from across the world",
      icon: Globe
    }
  ];

  return (
    <section className="bg-bg-tertiary py-20 hidden sm:block">
      <div className="container mx-auto px-4 max-w-[1280px]">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-#fffff0 text-center mb-4">
          The future of personal care is here
        </h2>

        <p className="text-#fffff0 text-center mb-14 max-w-3xl mx-auto text-sm md:text-base">
          Embrace Minimalist, where each element is chosen for its scientific merit,
          offering you authentic, effective skincare solutions.
        </p>

        {/* Feature Grid */}
        <div className="feature grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:hidden sm:hidden">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  aspect-square
                  bg-bg-tertiary
                  p-8
                  flex flex-col
                  items-center
                  justify-center
                  text-center
                  transition-all
                  duration-300
                "
              >
                {/* Icon Circle */}
                <div className="
                  w-16 h-16 mb-5
                  flex items-center justify-center
                  rounded-full
                  bg-white/5
                ">
                  <Icon className="w-8 h-8 text-#fffff0" />
                </div>

                <h3 className="text-#fffff0 font-semibold text-lg mb-2">
                  {feature.title}
                </h3>

                <p className="text-#fffff0 text-sm leading-relaxed max-w-[220px]">
                  {feature.text}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

// SECTION 4 — CUSTOMER REVIEWS AUTO SHIFT
const CustomerReviewsSection = () => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Anusha Jain",
      rating: 5,
      text: "I switched to the bamboo toothbrush and honestly didn’t expect much — but it’s fantastic. Comfortable grip, minimal packaging, and feels good knowing it’s sustainable.",
      date: "4 days ago"
    },
    {
      id: 2,
      name: "Rohan Mehta",
      rating: 5,
      text: "Delivery was fast and the product quality surprised me. The reusable pads are soft, durable, and easy to clean. Definitely ordering again.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Priya Kapoor",
      rating: 5,
      text: "Finally a brand that balances eco-conscious design with aesthetics. Everything looks premium and performs well.",
      date: "2 weeks ago"
    },
    {
      id: 4,
      name: "Arjun Verma",
      rating: 5,
      text: "The deodorant actually works — which I didn’t expect from a zero-waste option. No irritation, long lasting, and smells subtle.",
      date: "3 weeks ago"
    },
    {
      id: 5,
      name: "Meera Shah",
      rating: 5,
      text: "Packaging is beautiful, products are thoughtful, and customer support was responsive. Small details make a big difference.",
      date: "1 month ago"
    },
    {
      id: 6,
      name: "Kunal Gupta",
      rating: 5,
      text: "Tried the beeswax wraps and now I can’t go back to plastic. Practical and eco-friendly — exactly what I was looking for.",
      date: "1 month ago"
    },
    {
      id: 7,
      name: "Sneha Iyer",
      rating: 5,
      text: "These products feel carefully designed rather than mass produced. Quality materials and everything just feels intentional.",
      date: "5 days ago"
    },
    {
      id: 8,
      name: "Aditya Singh",
      rating: 5,
      text: "I appreciate the transparency about ingredients and sourcing. Builds trust and makes shopping easier.",
      date: "2 weeks ago"
    },
    {
      id: 9,
      name: "Neha Chatterjee",
      rating: 5,
      text: "Smooth experience from browsing to checkout. The brand story and sustainability focus really resonate.",
      date: "3 weeks ago"
    }
  ];


  // ---------- Responsive visible count ----------
  const calcVisible = () => {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  };

  const [visible, setVisible] = useState(calcVisible());

  useEffect(() => {
    const r = () => setVisible(calcVisible());
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  // ---------- Smooth auto animation ----------
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, 1000);

    return () => clearInterval(t);
  }, []);

  // ---------- Render ----------
  return (
    <section className="bg-bg-tertiary py-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-#fffff0 mb-6 tracking-tight">
          What Our Customers Say
        </h2>

        <div className="overflow-hidden">

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-10"
            style={{
              transform: `translate3d(-${index * (100 / visible)}%,0,0)`,
              transition: "transform 900ms cubic-bezier(0.42,0,0.58,1)",
              willChange: "transform",
            }}
          >
            {reviews.concat(reviews).map((review, i) => {

              const center = i === index + Math.floor(visible / 2);

              return (
                <div
                  key={i}
                  className={`
                    flex-shrink-0
                    aspect-square
                    w-full sm:w-1/2 lg:w-1/3
                    p-10
                    relative
                    transition-all duration-900
                    ${center
                      ? "scale-[1.08] opacity-100"
                      : "scale-[0.92] opacity-60"}
                  `}
                >

                  {/* Soft Glow Highlight */}
                  {center && (
                    <div className="absolute pointer-events-none"/>
                  )}

                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-semibold text-#fffff0">
                      {review.name[0]}
                    </div>

                    <div>
                      <div className="font-semibold text-#fffff0">
                        {review.name}
                      </div>
                      <div className="text-xs text-#fffff0/60">
                        {review.date}
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, x) => (
                      <Star
                        key={x}
                        className="w-4 h-4 fill-#fffff0 text-#fffff0 opacity-90"
                      />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-#fffff0 text-lg leading-relaxed font-light">
                    “{review.text}”
                  </p>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};


// Main Homepage Component
export default function HomePage() {
  // Add the page revealer animation
  usePageRevealer();

  return (
    <ClientWrapper showLoading={true} loadingDuration={3500}>
      <main>
        <HeroSection />
        <ProductGridSection />
        <ShopByCategorySection />
        <FutureOfPersonalCareSection />
        <CustomerReviewsSection />
      </main>
    </ClientWrapper>
  );
}
