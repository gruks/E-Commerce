// Cart Types and Interfaces
export interface CartItem {
  id: string;
  name: string;
  subtitle?: string;
  variant?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  inStock: boolean;
  maxQuantity?: number;
}

export interface SuggestedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rating?: number;
}

export interface PromotionProgress {
  current: number;
  target: number;
  message: string;
  nextMilestone?: {
    amount: number;
    reward: string;
  };
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  estimatedTotal: number;
  tax?: number;
  shipping?: number;
  savings?: number;
}

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  suggestedProducts: SuggestedProduct[];
  promotionProgress?: PromotionProgress;
  orderSummary: OrderSummary;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onAddSuggested: (product: SuggestedProduct) => void;
  onApplyCoupon: (code: string) => void;
  onCheckout: () => void;
  appliedCoupon?: string;
  isLoading?: boolean;
  isUpdating?: boolean;
}

export interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isUpdating?: boolean;
}

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
}