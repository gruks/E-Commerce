export type OrderStatus = 
  | 'processing' 
  | 'shipped' 
  | 'out-for-delivery' 
  | 'delivered' 
  | 'cancelled';

export type TrackingStep = {
  id: string;
  title: string;
  description: string;
  timestamp?: string;
  isCompleted: boolean;
  isActive: boolean;
};

export type OrderItem = {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  quantity: number;
  image: string;
  sku?: string;
};

export type ShippingAddress = {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type PaymentMethod = {
  type: 'card' | 'paypal' | 'apple-pay' | 'google-pay';
  last4?: string;
  brand?: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  estimatedDelivery?: string;
  trackingSteps: TrackingStep[];
};

export type OrderFilters = {
  status?: OrderStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  searchQuery?: string;
};