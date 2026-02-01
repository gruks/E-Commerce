import { db } from '@/lib/supabase';
import { ProductCard } from '@/components/shop/ProductCard';

interface ProductsPageProps {
  searchParams: {
    category?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = searchParams;
  const { data: products } = await db.getProducts(category ? { category } : {});

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              <a
                href="/products"
                className={`block px-3 py-2 rounded-md text-sm ${
                  !category ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Products
              </a>
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className={`block px-3 py-2 rounded-md text-sm ${
                    category === cat ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {category ? `${category} Products` : 'All Products'}
            </h1>
            <p className="text-gray-600">
              {products?.length || 0} products found
            </p>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}