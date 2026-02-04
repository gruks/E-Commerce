"use client";

import { usePageRevealer } from "../../components/ui/PageTransition";
import TransitionLink from "../../components/ui/TransitionLink";

const categories = [
  {
    id: 'body',
    name: 'Body',
    image: '/placeholder.svg',
    href: '/shop?category=body'
  },
  {
    id: 'skin',
    name: 'Skin',
    image: '/placeholder.svg',
    href: '/shop?category=skin'
  },
  {
    id: 'best-sellers',
    name: 'Best Sellers',
    image: '/placeholder.svg',
    href: '/best-sellers'
  },
  {
    id: 'new-launches',
    name: 'New Launches',
    image: '/placeholder.svg',
    href: '/shop?filter=new'
  },
  {
    id: 'all-products',
    name: 'All Products',
    image: '/placeholder.svg',
    href: '/shop'
  }
];

const CategoryCard = ({ category }: { category: typeof categories[0] }) => {
  return (
    <TransitionLink href={category.href} className="group category-card-wrapper">
      {/* Image Container */}
      <div className="category-image-container bg-gray-100 overflow-hidden rounded-lg mb-4">
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