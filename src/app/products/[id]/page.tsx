"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  ArrowLeft
} from "lucide-react";
import { usePageRevealer } from "../../../components/ui/PageTransition";
import { productsService } from "../../../services/productsService";
import { useCartActions } from "../../../lib/cartHelpers";
import { Product as DatabaseProduct } from "../../../types/database";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Add the page revealer animation with CustomEase "hop" effect
  usePageRevealer();
  
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<DatabaseProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);

  const { addToCartAndOpenDrawer } = useCartActions();

  // Load product from Supabase
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await productsService.getProductById(params.id);
        
        if (error) {
          setError(error);
          return;
        }

        if (!data) {
          setError('Product not found');
          return;
        }

        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      setAddingToCart(true);
      await addToCartAndOpenDrawer(product.id, quantity);
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-body-large text-text-muted">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="container mx-auto px-4 py-8">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <div className="text-center py-12">
            <p className="text-body-large text-red-600 mb-4">{error || 'Product not found'}</p>
            <Link href="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <Image
                src={product.image_url}
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
                        i < 4 // Default 4-star rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  4.0 (Based on customer reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            </div>

            {/* Description */}
            <p className="text-body-large text-gray-600">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-body-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50"
                  disabled={addingToCart}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-body-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="p-2 hover:bg-gray-50"
                  disabled={addingToCart}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={!product.stock_quantity || addingToCart}
                className="flex-1 btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="btn btn-secondary p-3">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Stock Status */}
            {product.stock_quantity > 0 ? (
              <p className="text-sm text-green-600">
                ✓ In stock ({product.stock_quantity} available)
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