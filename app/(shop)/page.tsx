import { db } from '@/lib/supabase';
import { ProductCard } from '@/components/shop/ProductCard';

export default async function HomePage() {
  const { data: featuredProducts } = await db.getProducts({ featured: true });
  const { data: allProducts } = await db.getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to EcomStore
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Discover amazing products at unbeatable prices
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Shop Now
        </a>
      </section>

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Products */}
      {allProducts && allProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}