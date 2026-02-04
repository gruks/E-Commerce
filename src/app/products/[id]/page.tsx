"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  ChevronLeft,
  ArrowLeft
} from "lucide-react";
import { usePageRevealer } from "../../../components/ui/PageTransition";

// Mock product data
const product = {
  id: 1,
  name: "Vitamin C Brightening Serum",
  price: 29.99,
  originalPrice: 39.99,
  rating: 4.8,
  reviews: 124,
  description: "A powerful vitamin C serum that brightens skin tone and reduces the appearance of dark spots.",
  image: "/placeholder.svg",
  inStock: true,
  stockCount: 15,
  category: "Skincare"
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Add the page revealer animation with CustomEase "hop" effect
  usePageRevealer();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-heading-1 text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-body-large text-gray-600">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-body-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-body-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <button className="flex-1 btn btn-primary flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="btn btn-secondary p-3">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Stock Status */}
            {product.inStock ? (
              <p className="text-sm text-green-600">
                ✓ In stock ({product.stockCount} available)
              </p>
            ) : (
              <p className="text-sm text-red-600">Out of stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}