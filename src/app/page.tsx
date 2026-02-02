import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Truck, Shield, Headphones } from "lucide-react";

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-bg-secondary to-bg-primary overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-12 lg:py-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-display text-text-primary font-spartan font-bold">
                Clean Beauty,
                <span className="block text-text-secondary">Simplified</span>
              </h1>
              <p className="text-body-large text-text-secondary max-w-lg font-quicksand font-light">
                Discover our curated collection of necter skincare essentials. 
                Science-backed formulas with clean ingredients for healthy, glowing skin.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="btn btn-primary btn-lg font-quicksand font-medium">
                Shop Best Sellers
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="btn btn-ghost btn-lg font-quicksand">
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8 border-t border-border-default">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-body-small text-text-muted font-quicksand font-light">4.8/5 (2.1k reviews)</span>
              </div>
              <div className="text-body-small text-text-muted font-quicksand font-light">
                <strong className="text-text-primary font-medium">50k+</strong> Happy Customers
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-bg-secondary to-border-default rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Clean skincare products"
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-bg-tertiary rounded-full p-4 shadow-md border border-border-default">
              <div className="text-center">
                <div className="text-heading-3 text-text-primary font-spartan font-bold">10%</div>
                <div className="text-caption text-text-muted font-quicksand">Cashback</div>
              </div>
            </div>
          </div>
        </div>
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