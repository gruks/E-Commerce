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
  ChevronRight,
  Shield,
  Leaf,
  Award,
  Truck
} from "lucide-react";

// Mock product data
const product = {
  id: 1,
  name: "Vitamin C Brightening Serum",
  price: 29.99,
  originalPrice: 39.99,
  rating: 4.8,
  reviews: 124,
  description: "A powerful vitamin C serum that brightens skin, reduces dark spots, and provides antioxidant protection. Formulated with 15% L-Ascorbic Acid and Vitamin E for maximum efficacy.",
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  ingredients: ["Vitamin C (L-Ascorbic Acid)", "Vitamin E", "Hyaluronic Acid", "Ferulic Acid"],
  benefits: ["Brightens skin tone", "Reduces dark spots", "Antioxidant protection", "Improves skin texture"],
  howToUse: "Apply 2-3 drops to clean skin in the morning. Follow with moisturizer and SPF.",
  inStock: true,
  stockCount: 15,
  category: "Skincare",
  tags: ["Vitamin C", "Brightening", "Anti-aging", "Serum"]
};

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    comment: "Amazing results! My skin looks brighter and more even after just one week of use.",
    verified: true
  },
  {
    id: 2,
    name: "Jessica L.",
    rating: 4,
    date: "1 month ago",
    comment: "Great product, but took a few weeks to see results. Worth the wait though!",
    verified: true
  },
  {
    id: 3,
    name: "Maria K.",
    rating: 5,
    date: "3 weeks ago",
    comment: "Love this serum! Gentle on sensitive skin and really effective.",
    verified: true
  }
];

const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[currentImage]}
          alt={product.name}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                currentImage === index ? 'border-black' : 'border-gray-200'
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gray-900">Shop</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Title & Rating */}
      <div>
        <h1 className="text-heading-1 text-gray-900 mb-4">{product.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-body text-gray-900 font-medium">{product.rating}</span>
            <span className="text-body text-gray-600">({product.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">${product.price}</span>
        {product.originalPrice && (
          <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
        )}
        {product.originalPrice && (
          <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
            Save ${(product.originalPrice - product.price).toFixed(2)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-body-large text-gray-600">{product.description}</p>

      {/* Key Benefits */}
      <div>
        <h3 className="text-heading-3 text-gray-900 mb-3">Key Benefits</h3>
        <ul className="space-y-2">
          {product.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 text-body text-gray-700">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decreaseQuantity}
              className="p-3 hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-3 text-body font-medium">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="p-3 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {product.inStock && (
            <span className="text-body-small text-green-600 font-medium">
              {product.stockCount} in stock
            </span>
          )}
        </div>

        <div className="flex gap-4">
          <button className="btn btn-primary flex-1">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`btn ${isWishlisted ? 'btn-primary' : 'btn-secondary'} px-4`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-gray-600" />
          <span className="text-body-small text-gray-700">Dermatologist Tested</span>
        </div>
        <div className="flex items-center gap-3">
          <Leaf className="w-5 h-5 text-gray-600" />
          <span className="text-body-small text-gray-700">Clean Ingredients</span>
        </div>
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-gray-600" />
          <span className="text-body-small text-gray-700">Cruelty Free</span>
        </div>
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-gray-600" />
          <span className="text-body-small text-gray-700">Free Shipping</span>
        </div>
      </div>
    </div>
  );
};

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-black text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'description' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-heading-3 text-gray-900 mb-4">Product Description</h3>
              <p className="text-body text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h4 className="text-heading-3 text-gray-900 mb-3">How to Use</h4>
              <p className="text-body text-gray-700">{product.howToUse}</p>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div>
            <h3 className="text-heading-3 text-gray-900 mb-4">Key Ingredients</h3>
            <ul className="space-y-3">
              {product.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-body text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-heading-3 text-gray-900">Customer Reviews</h3>
              <button className="btn btn-secondary btn-sm">Write a Review</button>
            </div>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{review.name}</span>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-body-small text-gray-500">{review.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-body text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-6">
            <h3 className="text-heading-3 text-gray-900">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">How often should I use this serum?</h4>
                <p className="text-body text-gray-700">Use once daily in the morning. Start with every other day if you have sensitive skin.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Can I use this with other vitamin C products?</h4>
                <p className="text-body text-gray-700">We recommend using only one vitamin C product at a time to avoid irritation.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Is this suitable for sensitive skin?</h4>
                <p className="text-body text-gray-700">Yes, but we recommend patch testing first and starting with every other day application.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <ImageGallery images={product.images} />
          
          {/* Product Info */}
          <ProductInfo />
        </div>
        
        {/* Product Tabs */}
        <ProductTabs />
      </div>
    </div>
  );
}