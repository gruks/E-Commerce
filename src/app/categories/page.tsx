import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Complete skincare solutions for healthy, glowing skin',
    image: '/placeholder.svg',
    productCount: 24,
    subcategories: ['Cleansers', 'Serums', 'Moisturizers', 'Treatments'],
    featured: true
  },
  {
    id: 'body-care',
    name: 'Body Care',
    description: 'Nourishing body products for soft, smooth skin',
    image: '/placeholder.svg',
    productCount: 18,
    subcategories: ['Body Wash', 'Moisturizers', 'Scrubs', 'Treatments']
  },
  {
    id: 'hair-care',
    name: 'Hair Care',
    description: 'Clean hair care for healthy, beautiful hair',
    image: '/placeholder.svg',
    productCount: 12,
    subcategories: ['Shampoo', 'Conditioner', 'Treatments', 'Styling']
  },
  {
    id: 'sun-care',
    name: 'Sun Care',
    description: 'Effective sun protection for daily use',
    image: '/placeholder.svg',
    productCount: 8,
    subcategories: ['Sunscreen', 'After Sun', 'Lip Protection']
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    description: 'Gentle, safe products for your little ones',
    image: '/placeholder.svg',
    productCount: 15,
    subcategories: ['Bath Time', 'Moisturizers', 'Diaper Care', 'Gentle Cleansers']
  },
  {
    id: 'mens-care',
    name: "Men's Care",
    description: 'Simplified grooming essentials for men',
    image: '/placeholder.svg',
    productCount: 10,
    subcategories: ['Face Care', 'Body Care', 'Shaving', 'Hair Care']
  }
];

const CategoryCard = ({ category, featured = false }: { category: any; featured?: boolean }) => {
  return (
    <Link href={`/categories/${category.id}`} className="group">
      <div className={`card overflow-hidden ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
        <div className={`relative bg-gray-100 overflow-hidden ${
          featured ? 'aspect-[2/1] lg:aspect-square' : 'aspect-square'
        }`}>
          <Image
            src={category.image}
            alt={category.name}
            width={featured ? 600 : 300}
            height={featured ? 600 : 300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <div className="space-y-2">
              <h3 className={`font-bold ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                {category.name}
              </h3>
              <p className={`${featured ? 'text-lg' : 'text-sm'} opacity-90`}>
                {category.description}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm opacity-75">
                  {category.productCount} products
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Subcategories */}
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {category.subcategories.slice(0, featured ? 4 : 3).map((sub: string) => (
              <span 
                key={sub} 
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {sub}
              </span>
            ))}
            {category.subcategories.length > (featured ? 4 : 3) && (
              <span className="text-xs text-gray-500">
                +{category.subcategories.length - (featured ? 4 : 3)} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function CategoriesPage() {
  const featuredCategory = categories.find(cat => cat.featured);
  const otherCategories = categories.filter(cat => !cat.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-heading-1 text-gray-900 mb-4">Shop by Category</h1>
            <p className="text-body-large text-gray-600">
              Explore our carefully curated categories of clean, effective products 
              designed to simplify your beauty routine.
            </p>
          </div>
        </div>
      </div>

      <div className="container section">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {/* Featured Category */}
          {featuredCategory && (
            <CategoryCard category={featuredCategory} featured />
          )}
          
          {/* Other Categories */}
          {otherCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-heading-2 text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-body-large text-gray-600 mb-8 max-w-lg mx-auto">
            Browse our complete product collection or get in touch with our skincare experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn btn-primary">
              View All Products
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}