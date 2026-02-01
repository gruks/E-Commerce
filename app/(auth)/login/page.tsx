import Link from 'next/link';
import { signIn } from '@/lib/actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface LoginPageProps {
  searchParams: {
    message?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-600">
          Welcome Back
        </CardTitle>
        <p className="text-gray-600">Sign in to your account</p>
      </CardHeader>
      
      <CardContent>
        {searchParams.message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {searchParams.message}
          </div>
        )}
        
        <form action={signIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>
          
          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}