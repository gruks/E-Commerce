import Link from 'next/link';
import { signUp } from '@/lib/actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-600">
          Create Account
        </CardTitle>
        <p className="text-gray-600">Join EcomStore today</p>
      </CardHeader>
      
      <CardContent>
        <form action={signUp} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Enter your full name"
            />
          </div>
          
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
              placeholder="Create a password"
              minLength={6}
            />
          </div>
          
          <Button type="submit" className="w-full" size="lg">
            Create Account
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}