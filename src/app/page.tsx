"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Headphones } from "lucide-react";
import StarBorder from "../components/ui/StarBorder";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText"; 

// Hero Section Component
const HeroSection = () => {
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const paragrap = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!taglineRef.current) return;

    const heroSplit = new SplitText(taglineRef.current, { type: 'chars, words'});
    const paragraphSplit = new SplitText(paragrap.current, { type: 'lines'});

    gsap.from(heroSplit.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 0.5
    })

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1
    })
  }, []);

  return (
    <section className="min-h-screen bg-primary from-gray-100 via-gray-50 to-white relative overflow-hidden" 
    style={{ 
      marginLeft: '5rem',
      marginRight: '5rem'
      }}>
      <div className="promo-heading flex justify-between items-end" 
           >
        <h1 
           ref={taglineRef}
           style={{ 
             fontFamily: 'Aeonik, Arial, sans-serif',
             fontSize: '7em',
             lineHeight: '110%',
             letterSpacing: '-0.02em'
           }}
        >
          TagLine
        </h1>
          <Link href="/contact-us">
            <StarBorder
              as="button"
              className="custom-class"
              color="magenta"
              speed="8s"
            >
              Contact Us
            </StarBorder>
          </Link>
      </div>
      <div className="divider-hero-line max-w-full bg-black" 
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
        <span className="font-bold" ref={paragrap}>
            BEAUTY
        </span>
      </div>

    </section>
  );
};

// Category Cards Component
const CategoryCards = () => {
  const categories = [
    {
      id: 1,
      name: "Skincare",
      description: "Face serums, moisturizers & cleansers",
      image: "/placeholder.svg",
      href: "/categories/skincare",
      products: "24 products"
    },
    {
      id: 2,
      name: "Body Care",
      description: "Body lotions, scrubs & treatments",
      image: "/placeholder.svg",
      href: "/categories/body-care",
      products: "18 products"
    },
    {
      id: 3,
      name: "Hair Care",
      description: "Shampoos, conditioners & treatments",
      image: "/placeholder.svg",
      href: "/categories/hair-care",
      products: "12 products"
    },
    {
      id: 4,
      name: "Sun Care",
      description: "Sunscreens & after-sun care",
      image: "/placeholder.svg",
      href: "/categories/sun-care",
      products: "8 products"
    }
  ];

  return (
    <section className="section bg-bg-primary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-heading-1 text-text-primary mb-4 font-spartan font-bold">Shop by Category</h2>
          <p className="text-body-large text-text-secondary max-w-2xl mx-auto font-quicksand font-light">
            Explore our carefully curated categories of clean, effective products for your daily routine.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <div className="card p-0 overflow-hidden bg-bg-tertiary">
                <div className="aspect-square bg-bg-secondary overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-heading-3 text-text-primary mb-2 font-spartan font-semibold">{category.name}</h3>
                  <p className="text-body-small text-text-muted mb-3 font-quicksand font-light">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-caption text-text-subtle font-quicksand">{category.products}</span>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50"
    },
    {
      icon: Shield,
      title: "Clean Ingredients",
      description: "Dermatologist-tested, cruelty-free formulas"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Get skincare advice from our experts"
    }
  ];

  return (
    <section className="section bg-bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-bg-tertiary rounded-full shadow-sm mb-4 border border-border-default">
                <feature.icon className="w-6 h-6 text-text-primary" />
              </div>
              <h3 className="text-heading-3 text-text-primary mb-2 font-spartan font-semibold">{feature.title}</h3>
              <p className="text-body text-text-secondary font-quicksand font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Homepage Component
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoryCards />
      <FeaturesSection />
    </main>
  );
}