import Link from 'next/link';
import { AdminGuard } from '@/components/protected/AdminGuard';
import { 
  ChartBarIcon, 
  CubeIcon, 
  ShoppingBagIcon, 
  ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
            </div>
            
            <nav className="mt-6">
              <div className="px-6 space-y-2">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <ChartBarIcon className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
                
                <Link
                  href="/admin/products"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <CubeIcon className="h-5 w-5 mr-3" />
                  Products
                </Link>
                
                <Link
                  href="/admin/orders"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-3" />
                  Orders
                </Link>
                
                <Link
                  href="/"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                  Back to Store
                </Link>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}