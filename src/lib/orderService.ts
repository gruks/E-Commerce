import { Order, OrderStatus, OrderFilters } from '@/src/types/order';
import { TrackingFormData, TrackingResult } from '@/src/types/tracking';

// Mock data - replace with actual API calls
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15T10:30:00Z',
    status: 'delivered',
    items: [
      {
        id: '1',
        name: 'Vitamin C Brightening Serum',
        subtitle: '30ml',
        price: 29.99,
        quantity: 1,
        image: '/placeholder.svg',
        sku: 'VCS-001'
      },
      {
        id: '2',
        name: 'Hyaluronic Acid Moisturizer',
        subtitle: '50ml',
        price: 24.99,
        quantity: 2,
        image: '/placeholder.svg',
        sku: 'HAM-002'
      }
    ],
    subtotal: 79.97,
    tax: 6.40,
    shipping: 5.99,
    total: 92.36,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'Visa'
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-01-20T18:00:00Z',
    trackingSteps: [
      {
        id: '1',
        title: 'Order Placed',
        description: 'Your order has been confirmed',
        timestamp: '2024-01-15T10:30:00Z',
        isCompleted: true,
        isActive: false
      },
      {
        id: '2',
        title: 'Packed',
        description: 'Your order has been packed and ready for shipment',
        timestamp: '2024-01-16T14:20:00Z',
        isCompleted: true,
        isActive: false
      },
      {
        id: '3',
        title: 'Shipped',
        description: 'Your order is on its way',
        timestamp: '2024-01-17T09:15:00Z',
        isCompleted: true,
        isActive: false
      },
      {
        id: '4',
        title: 'Out for Delivery',
        description: 'Your order is out for delivery',
        timestamp: '2024-01-19T08:30:00Z',
        isCompleted: true,
        isActive: false
      },
      {
        id: '5',
        title: 'Delivered',
        description: 'Your order has been delivered',
        timestamp: '2024-01-19T16:45:00Z',
        isCompleted: true,
        isActive: true
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20T14:15:00Z',
    status: 'shipped',
    items: [
      {
        id: '3',
        name: 'SPF 50 Sunscreen',
        subtitle: '75ml',
        price: 27.99,
        quantity: 1,
        image: '/placeholder.svg',
        sku: 'SPF-003'
      }
    ],
    subtotal: 27.99,
    tax: 2.24,
    shipping: 5.99,
    total: 36.22,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    paymentMethod: {
      type: 'paypal'
    },
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2024-01-25T18:00:00Z',
    trackingSteps: [
      {
        id: '1',
        title: 'Order Placed',
        description: 'Your order has been confirmed',
        timestamp: '2024-01-20T14:15:00Z',
        isCompleted: true,
        isActive: false
      },
      {
        id: '2',
        title: 'Packed',
        description: 'Your order has been packed and ready for shipment',
        timestamp: '2024-01-21T11:30:00Z',
        isCompleted: true,
        isActive: false
      },
      {
        id: '3',
        title: 'Shipped',
        description: 'Your order is on its way',
        timestamp: '2024-01-22T08:45:00Z',
        isCompleted: true,
        isActive: true
      },
      {
        id: '4',
        title: 'Out for Delivery',
        description: 'Your order is out for delivery',
        isCompleted: false,
        isActive: false
      },
      {
        id: '5',
        title: 'Delivered',
        description: 'Your order has been delivered',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-25T09:00:00Z',
    status: 'processing',
    items: [
      {
        id: '4',
        name: 'Retinol Night Cream',
        subtitle: '30ml',
        price: 34.99,
        quantity: 1,
        image: '/placeholder.svg',
        sku: 'RNC-004'
      },
      {
        id: '5',
        name: 'Gentle Cleanser',
        subtitle: '150ml',
        price: 19.99,
        quantity: 1,
        image: '/placeholder.svg',
        sku: 'GC-005'
      }
    ],
    subtotal: 54.98,
    tax: 4.40,
    shipping: 5.99,
    total: 65.37,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    paymentMethod: {
      type: 'card',
      last4: '1234',
      brand: 'Mastercard'
    },
    estimatedDelivery: '2024-01-30T18:00:00Z',
    trackingSteps: [
      {
        id: '1',
        title: 'Order Placed',
        description: 'Your order has been confirmed',
        timestamp: '2024-01-25T09:00:00Z',
        isCompleted: true,
        isActive: true
      },
      {
        id: '2',
        title: 'Packed',
        description: 'Your order has been packed and ready for shipment',
        isCompleted: false,
        isActive: false
      },
      {
        id: '3',
        title: 'Shipped',
        description: 'Your order is on its way',
        isCompleted: false,
        isActive: false
      },
      {
        id: '4',
        title: 'Out for Delivery',
        description: 'Your order is out for delivery',
        isCompleted: false,
        isActive: false
      },
      {
        id: '5',
        title: 'Delivered',
        description: 'Your order has been delivered',
        isCompleted: false,
        isActive: false
      }
    ]
  }
];

export const getOrders = async (filters?: OrderFilters): Promise<Order[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredOrders = [...mockOrders];
  
  if (filters) {
    // Filter by status
    if (filters.status && filters.status.length > 0) {
      filteredOrders = filteredOrders.filter(order => 
        filters.status!.includes(order.status)
      );
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredOrders = filteredOrders.filter(order =>
        order.orderNumber.toLowerCase().includes(query) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(query) ||
          (item.sku && item.sku.toLowerCase().includes(query))
        )
      );
    }
    
    // Filter by date range
    if (filters.dateRange) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }
    
    // Filter by price range
    if (filters.priceRange) {
      filteredOrders = filteredOrders.filter(order =>
        order.total >= filters.priceRange!.min &&
        order.total <= filters.priceRange!.max
      );
    }
  }
  
  return filteredOrders.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockOrders.find(order => order.id === id) || null;
};

export const reorderItems = async (orderId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, this would add items to cart and return success/failure
  console.log(`Reordering items from order ${orderId}`);
  return true;
};

export const trackByOrderId = async (orderId: string): Promise<TrackingResult> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const order = mockOrders.find(o => o.orderNumber === orderId);
  
  if (!order) {
    return {
      success: false,
      error: 'Order not found. Please check your Order ID and try again.'
    };
  }
  
  return {
    success: true,
    data: order
  };
};

export const trackByTrackingId = async (trackingId: string): Promise<TrackingResult> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const order = mockOrders.find(o => o.trackingNumber === trackingId);
  
  if (!order) {
    return {
      success: false,
      error: 'Tracking ID not found. Please check your Tracking ID and try again.'
    };
  }
  
  return {
    success: true,
    data: order
  };
};

export const trackOrder = async (formData: TrackingFormData): Promise<TrackingResult> => {
  switch (formData.method) {
    case 'order-id':
      return trackByOrderId(formData.identifier);
    case 'tracking-id':
      return trackByTrackingId(formData.identifier);
    default:
      return {
        success: false,
        error: 'Invalid tracking method'
      };
  }
};