"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Lock } from "lucide-react";
import { usePageRevealer } from "../../components/ui/PageTransition";

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Vitamin C Brightening Serum",
    price: 29.99,
    quantity: 2,
    image: "/placeholder.svg",
    inStock: true
  },
  {
    id: 2,
    name: "Hyaluronic Acid Moisturizer",
    price: 24.99,
    quantity: 1,
    image: "/placeholder.svg",
    inStock: true
  },
  {
    id: 3,
    name: "SPF 50 Sunscreen",
    price: 27.99,
    quantity: 1,
    image: "/placeholder.svg",
    inStock: false
  }
];

const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: any; 
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) => {
  const increaseQuantity = () => onUpdateQuantity(item.id, item.quantity + 1);
  const decreaseQuantity = () => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1));

  return (
    <div className="flex gap-4 py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${item.id}`} className="text-heading-3 text-gray-900 hover:text-gray-600 transition-colors">
            {item.name}
          </Link>
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={decreaseQuantity}
                className="p-2 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-2 text-body font-medium">{item.quantity}</span>
              <button
                onClick={increaseQuantity}
                className="p-2 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            {/* Stock Status */}
            {!item.inStock && (
              <span className="text-body-small text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
          
          {/* Price */}
          <div className="text-right">
            <div className="text-heading-3 text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
            <div className="text-body-small text-gray-500">${item.price} each</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSummary = ({ items }: { items: any[] }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
      <h2 className="text-heading-2 text-gray-900">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-body">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-body">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        {shipping > 0 && (
          <div className="text-body-small text-gray-500">
            Free shipping on orders over $50
          </div>
        )}
        
        <div className="flex justify-between text-body">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-300 pt-3">
          <div className="flex justify-between text-heading-3">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 pt-4">
        <button className="btn btn-primary w-full">
          <Lock className="w-4 h-4" />
          Proceed to Checkout
        </button>
        
        <div className="text-center">
          <Link href="/shop" className="btn btn-ghost">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
      
      {/* Trust Badges */}
      <div className="pt-4 border-t border-gray-300">
        <div className="text-body-small text-gray-600 text-center space-y-1">
          <div>🔒 Secure checkout</div>
          <div>📦 Free returns within 30 days</div>
          <div>🚚 Fast & reliable shipping</div>
        </div>
      </div>
    </div>
  );
};

const EmptyCart = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
        <ShoppingBag className="w-8 h-8 text-gray-400" />
      </div>
      <h2 className="text-heading-2 text-gray-900 mb-4">Your cart is empty</h2>
      <p className="text-body-large text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
      </p>
      <Link href="/shop" className="btn btn-primary">
        Start Shopping
      </Link>
    </div>
  );
};

export default function CartPage() {
  // Add the page revealer animation with CustomEase "hop" effect
  usePageRevealer();
  
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container py-8">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-heading-1 text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-body-large text-gray-600">
            Review your items and proceed to checkout when ready.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-heading-2 text-gray-900">
                  Cart Items ({cartItems.length})
                </h2>
                <button 
                  onClick={() => setCartItems([])}
                  className="text-body-small text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear all
                </button>
              </div>
              
              <div className="space-y-0">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary items={cartItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}