"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react";

// Define the tracking data type
interface TrackingData {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  trackingNumber: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  timeline: {
    status: string;
    date: string;
    description: string;
    completed: boolean;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
  };
}

const TrackOrdersPage = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [trackingResult, setTrackingResult] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking data
  const mockTrackingData: TrackingData = {
    orderNumber: "NCT-2024-001234",
    status: "In Transit",
    estimatedDelivery: "Tomorrow, Feb 3",
    trackingNumber: "1Z999AA1234567890",
    items: [
      { name: "Vitamin C Serum", quantity: 1, price: 29.99 },
      { name: "Hyaluronic Moisturizer", quantity: 1, price: 24.99 }
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "Jan 30, 2:30 PM",
        description: "Your order has been confirmed and is being prepared.",
        completed: true
      },
      {
        status: "Processing",
        date: "Jan 30, 6:45 PM",
        description: "Your items are being carefully packaged.",
        completed: true
      },
      {
        status: "Shipped",
        date: "Jan 31, 10:15 AM",
        description: "Your package is on its way to you.",
        completed: true
      },
      {
        status: "Out for Delivery",
        date: "Feb 2, 8:00 AM",
        description: "Your package is out for delivery today.",
        completed: true
      },
      {
        status: "Delivered",
        date: "Expected Feb 3",
        description: "Your package will be delivered to your address.",
        completed: false
      }
    ],
    shippingAddress: {
      name: "Sarah Johnson",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001"
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (orderNumber.toLowerCase().includes('nct') || orderNumber.includes('123')) {
        setTrackingResult(mockTrackingData);
      } else {
        setTrackingResult(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="w-5 h-5 text-success" />;
    }
    
    switch (status) {
      case "Order Placed":
        return <Package className="w-5 h-5 text-text-muted" />;
      case "Processing":
        return <Clock className="w-5 h-5 text-text-muted" />;
      case "Shipped":
      case "Out for Delivery":
        return <Truck className="w-5 h-5 text-text-muted" />;
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-text-muted" />;
      default:
        return <Clock className="w-5 h-5 text-text-muted" />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border-default">
        <div className="container py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Package className="w-6 h-6 text-brand-primary" />
              <span className="text-body-small text-brand-primary font-quicksand font-medium uppercase tracking-wide">Order Tracking</span>
            </div>
            <h1 className="text-heading-1 text-text-primary mb-4 font-spartan font-bold">Track Your Order</h1>
            <p className="text-body-large text-text-secondary font-quicksand font-light">
              Enter your order details below to get real-time updates on your package delivery status.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Tracking Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="card p-8 bg-bg-tertiary">
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div>
                <label htmlFor="orderNumber" className="block text-body-medium text-text-primary mb-2 font-quicksand font-medium">
                  Order Number *
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g., NCT-2024-001234"
                  className="input w-full font-quicksand font-light"
                  required
                />
                <p className="text-body-small text-text-muted mt-1 font-quicksand font-light">
                  You can find this in your order confirmation email
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-body-medium text-text-primary mb-2 font-quicksand font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="input w-full font-quicksand font-light"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full font-quicksand font-medium"
              >
                {isLoading ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Track Order
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Order Summary */}
            <div className="card p-8 bg-bg-tertiary">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-heading-2 text-text-primary font-spartan font-semibold mb-2">
                    Order {trackingResult.orderNumber}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="badge badge-primary font-quicksand">
                      {trackingResult.status}
                    </span>
                    <span className="text-body-small text-text-muted font-quicksand font-light">
                      Tracking: {trackingResult.trackingNumber}
                    </span>
                  </div>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-body-small text-text-muted font-quicksand font-light">Estimated Delivery</div>
                  <div className="text-heading-3 text-text-primary font-spartan font-semibold">
                    {trackingResult.estimatedDelivery}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-border-default pt-6">
                <h3 className="text-heading-3 text-text-primary mb-4 font-spartan font-semibold">Items in this order</h3>
                <div className="space-y-3">
                  {trackingResult.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className="text-body text-text-primary font-quicksand font-light">{item.name}</span>
                        <span className="text-body-small text-text-muted font-quicksand font-light ml-2">
                          × {item.quantity}
                        </span>
                      </div>
                      <span className="text-body text-text-primary font-quicksand font-medium">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="card p-8 bg-bg-tertiary">
              <h3 className="text-heading-2 text-text-primary mb-6 font-spartan font-semibold">Tracking Timeline</h3>
              <div className="space-y-6">
                {trackingResult.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(event.status, event.completed)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h4 className={`text-body-medium font-quicksand font-medium ${
                          event.completed ? 'text-text-primary' : 'text-text-muted'
                        }`}>
                          {event.status}
                        </h4>
                        <span className="text-body-small text-text-muted font-quicksand font-light">
                          {event.date}
                        </span>
                      </div>
                      <p className="text-body-small text-text-muted font-quicksand font-light">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card p-8 bg-bg-tertiary">
              <h3 className="text-heading-3 text-text-primary mb-4 font-spartan font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h3>
              <div className="text-body text-text-secondary font-quicksand font-light">
                <div className="font-medium text-text-primary">{trackingResult.shippingAddress.name}</div>
                <div>{trackingResult.shippingAddress.address}</div>
                <div>{trackingResult.shippingAddress.city}</div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="max-w-2xl mx-auto mt-16 pt-12 border-t border-border-default text-center">
          <h3 className="text-heading-2 text-text-primary mb-4 font-spartan font-semibold">
            Need Help?
          </h3>
          <p className="text-body text-text-secondary mb-8 font-quicksand font-light">
            Can't find your order or having issues with tracking? We're here to help.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="tel:+1-555-123-4567" className="btn btn-secondary font-quicksand">
              <Phone className="w-4 h-4" />
              Call Support
            </a>
            <a href="mailto:support@necter.com" className="btn btn-secondary font-quicksand">
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrdersPage;