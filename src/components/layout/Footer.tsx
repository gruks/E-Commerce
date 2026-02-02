import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-bg-primary">
      {/* Newsletter Section */}
      <div className="border-b border-text-secondary">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-heading-2 mb-4 font-spartan font-semibold text-bg-primary">Stay in the loop</h2>
            <p className="text-body-large text-text-muted mb-8 font-quicksand font-light">
              Get the latest updates on new products, exclusive offers, and skincare tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1 bg-text-secondary border-text-muted text-bg-primary placeholder-text-subtle focus:border-brand-primary font-quicksand font-light"
              />
              <button className="btn btn-primary whitespace-nowrap font-quicksand font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="necter" width={32} height={32} className="rounded" />
              <span className="text-xl font-spartan font-bold text-bg-primary">necter</span>
            </Link>
            <p className="text-body text-text-muted font-quicksand font-light">
              Clean, effective skincare products formulated with science-backed ingredients for healthy, glowing skin.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-muted hover:text-brand-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-brand-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-brand-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-heading-3 mb-6 font-spartan font-semibold text-bg-primary">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/shop" className="text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/categories/skincare" className="text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="/categories/body-care" className="text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                  Body Care
                </Link>
              </li>
              <li>
                <Link href="/categories/sun-care" className="text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                  Sun Care
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-heading-3 mb-6 font-spartan font-semibold text-bg-primary">Customer Care</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-heading-3 mb-6 font-spartan font-semibold text-bg-primary">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-text-muted" />
                <span className="text-text-muted font-quicksand font-light">hello@necter.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-text-muted" />
                <span className="text-text-muted font-quicksand font-light">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-text-muted mt-0.5" />
                <span className="text-text-muted font-quicksand font-light">
                  123 Beauty Street<br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-text-secondary">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-body-small text-text-muted font-quicksand font-light">
              © {currentYear} necter. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-body-small text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-body-small text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-body-small text-text-muted hover:text-bg-primary transition-colors font-quicksand font-light">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };