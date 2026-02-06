"use client";

import { useMemo } from "react";
import { usePageRevealer } from "../../components/ui/PageTransition";
import TransitionLink from "../../components/ui/TransitionLink";
import { CATEGORIES } from "../../styles/constants";

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

  // Get categories from static constants (instant, no DB call)
  const categories = useMemo(() => {
    // Convert static categories to UI format
    const categoryList: Category[] = [
      ...CATEGORIES.map(cat => ({
        id: cat.id,
        name: cat.name,
        image: cat.image,
        href: `/shop?filter=${cat.slug}`
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

    return categoryList;
  }, []);

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