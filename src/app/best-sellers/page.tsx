"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Award, TrendingUp } from "lucide-react";

// Mock best sellers data
const bestSellers = [
  {
    id: 1,
    name: "Vitamin C Brightening Serum",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviews: 1247,
    image: "/placeholder.svg",
    badge: "#1 Best Seller",
    category: "skincare",
    salesCount: "10k+ sold",
    description: "Our top-rated vitamin C serum for brighter, more even skin tone."
  },
  {
    id: 2,
    name: "Hyaluronic Acid Moisturizer",
    price: 24.99,
    rating: 4.8,
    reviews: 892,
    image: "/placeholder.svg",
    badge: "Top Rated",
    category: "skincare",
    salesCount: "8k+ sold",
    description: "Deeply hydrating moisturizer with hyaluronic acid and ceramides."
  },
  {
    id: 3,
    name: "Gentle Foam Cleanser",
    price: 19.99,
    rating: 4.7,
    reviews: 1156,
    image: "/placeholder.svg",
    badge: "Customer Favorite",
    category: "skincare",
    salesCount: "12k+ sold",
    description: "pH-balanced cleanser that removes impurities without stripping skin."
  },
  {
    id: 4,
    name: "SPF 50 Mineral Sunscreen",
    price: 27.99,
    rating: 4.9,
    reviews: 2103,
    image: "/placeholder.svg",
    badge: "Award Winner",
    category: "suncare",
    salesCount: "15k+ sold",
    description: "Broad-spectrum protection with zinc oxide and titanium dioxide."
  },
  {
    id: 5,
    name: "Niacinamide Pore Treatment",
    price: 22.99,
    rating: 4.6,
    reviews: 678,
    image: "/placeholder.svg",
    badge: "Trending",
    category: "skincare",
    salesCount: "5k+ sold",
    description: "Minimizes pores and controls oil with 10% niacinamide."
  },
  {
    id: 6,
    name: "Retinol Night Serum",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviews: 543,
    image: "/placeholder.svg",
    badge: "Editor's Choice",
    category: "skincare",
    salesCount: "3k+ sold",
    description: "Gentle retinol formula for smoother, younger-looking skin."
  }
];

const ProductCard = ({ product }: { product: any }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "#1 Best Seller":
        return "bg-brand-primary text-text-primary";
      case "Top Rated":
        return "bg-success text-white";
      case "Customer Favorite":
        return "bg-info text-white";
      case "Award Winner":
        return "bg-warning text-text-primary";
      case "Trending":
        return "bg-brand-soft text-brand-primary";
      case "Editor's Choice":
        return "bg-text-primary text-bg-primary";
      default:
        return "bg-brand-primary text-text-primary";
    }
  };

  return (
    <div className="card group overflow-hidden bg-bg-tertiary">
      <div className="relative aspect-square bg-bg-secondary overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badge */}
        <div className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-quicksand font-medium ${getBadgeColor(product.badge)}`}>
          {product.badge}
        </div>
        
        {/* Sales Count */}
        <div className="absolute top-3 right-3 bg-bg-tertiary/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full font-quicksand font-medium text-text-muted">
          {product.salesCount}
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute bottom-3 right-3 p-2 bg-bg-tertiary rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity border border-border-default"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-brand-primary text-brand-primary' : 'text-text-muted'}`} />
        </button>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="btn btn-primary w-full btn-sm font-quicksand font-medium">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-heading-3 text-text-primary mb-2 hover:text-brand-primary transition-colors font-spartan font-semibold">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-body-small text-text-muted mb-3 font-quicksand font-light line-clamp-2">
          {product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-body-small text-text-muted ml-1 font-quicksand font-light">{product.rating}</span>
          </div>
          <span className="text-body-small text-text-subtle font-quicksand font-light">({product.reviews.toLocaleString()})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-heading-3 text-text-primary font-spartan font-bold">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-body-small text-text-subtle line-through font-quicksand font-light">${product.originalPrice}</span>
              <span className="text-body-small text-success font-quicksand font-medium">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function BestSellersPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-softer to-bg-secondary border-b border-border-default">
        <div className="container py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-6 h-6 text-brand-primary" />
              <span className="text-body-small text-brand-primary font-quicksand font-medium uppercase tracking-wide">Best Sellers</span>
            </div>
            <h1 className="text-heading-1 text-text-primary mb-4 font-spartan font-bold">Our Most Loved Products</h1>
            <p className="text-body-large text-text-secondary font-quicksand font-light">
              Discover the products our customers can't stop raving about. These top-rated skincare essentials 
              have earned their place as favorites through proven results and thousands of glowing reviews.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-bg-secondary border-b border-border-default">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-heading-2 text-text-primary font-spartan font-bold mb-1">50k+</div>
              <div className="text-body-small text-text-muted font-quicksand font-light">Happy Customers</div>
            </div>
            <div>
              <div className="text-heading-2 text-text-primary font-spartan font-bold mb-1">4.8★</div>
              <div className="text-body-small text-text-muted font-quicksand font-light">Average Rating</div>
            </div>
            <div>
              <div className="text-heading-2 text-text-primary font-spartan font-bold mb-1">98%</div>
              <div className="text-body-small text-text-muted font-quicksand font-light">Repurchase Rate</div>
            </div>
            <div>
              <div className="text-heading-2 text-text-primary font-spartan font-bold mb-1">24h</div>
              <div className="text-body-small text-text-muted font-quicksand font-light">Fast Shipping</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        {/* Trending Badge */}
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-5 h-5 text-brand-primary" />
          <span className="text-body text-text-muted font-quicksand font-light">
            Showing {bestSellers.length} best-selling products
          </span>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-border-default">
          <h2 className="text-heading-2 text-text-primary mb-4 font-spartan font-semibold">
            Want to see more?
          </h2>
          <p className="text-body-large text-text-secondary mb-8 max-w-lg mx-auto font-quicksand font-light">
            Explore our complete collection of clean, effective skincare products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn btn-primary font-quicksand font-medium">
              Shop All Products
            </Link>
            <Link href="/categories" className="btn btn-secondary font-quicksand">
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}