"use client";

import { useEffect, useState } from "react";
import { usePageRevealer } from "../../components/ui/PageTransition";
import TransitionLink from "../../components/ui/TransitionLink";
import { productsService } from "../../services/productsService";

interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
}

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <TransitionLink href={category.href} className="group category-card-wrapper">
      {/* Image Container */}
      <div className="category-image-container bg-gray-100 overflow-hidden mb-4">
        <img
          src={category.image}
          alt={category.name}
          className="category-card-image w-full h-full object-cover transition-all duration-500 ease-out"
        />
      </div>
      
      {/* Category Name */}
      <div className="category-text-container text-center">
        <h3 className="category-title text-base font-light text-text-primary transition-colors duration-300 relative">
          {category.name}
        </h3>
      </div>
    </TransitionLink>
  );
};

export default function CategoriesPage() {
  // Add the page revealer animation
  usePageRevealer();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load categories from Supabase
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const { data, error } = await productsService.getCategories();
        
        if (error) {
          setError(error);
          return;
        }

        // Convert categories to UI format
        const categoryList: Category[] = [
          ...data.map(categoryName => ({
            id: categoryName.toLowerCase().replace(/\s+/g, '-'),
            name: categoryName,
            image: '/placeholder.svg',
            href: `/shop?category=${encodeURIComponent(categoryName)}`
          })),
          {
            id: 'best-sellers',
            name: 'Best Sellers',
            image: '/placeholder.svg',
            href: '/best-sellers'
          },
          {
            id: 'all-products',
            name: 'All Products',
            image: '/placeholder.svg',
            href: '/shop'
          }
        ];

        setCategories(categoryList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-body-large text-text-muted">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-body-large text-red-600 mb-4">Error loading categories: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="text-left md:px-12 sm:px-4">
            <h1 className="text-heading-1 text-gray-900">Collections</h1>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-4 py-16 mb-16 max-w-7xl mx-auto">
        <div className="categories-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}