"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Headphones } from "lucide-react";
import StarBorder from "../components/ui/StarBorder";
import { AnimatedWords, AnimatedLines } from "../components/ui/AnimatedText";
import { usePageRevealer } from "../components/ui/PageTransition";
import ClientWrapper from "../components/ui/ClientWrapper";
import CircularImage from "../components/ui/CircularImage";

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="min-h-screen bg-primary from-gray-100 via-gray-50 to-white relative overflow-hidden"
      style={{
        marginLeft: '5rem',
        marginRight: '5rem'
      }}>
      <div className="promo-heading flex justify-between items-end">
        <h1
          style={{
            fontFamily: 'Aeonik, Arial, sans-serif',
            fontSize: '7em',
            lineHeight: '110%',
            letterSpacing: '-0.02em'
          }}
        >
          <AnimatedWords delay={0.2}>TagLine</AnimatedWords>
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
        <span className="font-bold">
          <AnimatedWords delay={0.5}>BEAUTY</AnimatedWords>
        </span>
      </div>
    </section>
  );
};

// Category Cards Component
const CategoryCards = () => {
  return(
    <CircularImage />
  );
}

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
              <h3 className="text-heading-3 text-text-primary mb-2 font-spartan font-semibold">
                <AnimatedWords delay={5.0}>{feature.title}</AnimatedWords>
              </h3>
              <p className="text-body text-text-secondary font-quicksand font-light">
                <AnimatedLines delay={5.2}>{feature.description}</AnimatedLines>
              </p>
            </div>
          ))}
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
        <CategoryCards />
        <FeaturesSection />
      </main>
    </ClientWrapper>
  );
}