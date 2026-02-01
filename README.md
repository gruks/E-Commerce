# EcomStore - Production-Ready Next.js E-commerce Platform

A complete MVC e-commerce solution built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## 🏗️ Architecture Overview

### MVC Pattern Implementation
- **Models**: Supabase database tables (products, orders, users, cart_items)
- **Views**: React components + App Router pages
- **Controllers**: API routes + Server Actions

### Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State Management**: Zustand (cart state)
- **UI Components**: Custom components with Tailwind
- **Icons**: Lucide React

## 📁 Project Structure

```
web/
├── app/
│   ├── (auth)/                 # Authentication routes
│   │   ├── layout.tsx         # Auth layout
│   │   ├── login/page.tsx     # Login page
│   │   └── register/page.tsx  # Registration page
│   ├── (shop)/                # Main shopping routes
│   │   ├── layout.tsx         # Shop layout with header/footer
│   │   ├── page.tsx           # Home page
│   │   ├── products/          # Product catalog
│   │   ├── cart/page.tsx      # Shopping cart
│   │   ├── checkout/page.tsx  # Checkout (protected)
│   │   └── orders/page.tsx    # Order history (protected)
│   ├── (admin)/               # Admin panel routes
│   │   ├── layout.tsx         # Admin layout with sidebar
│   │   ├── dashboard/page.tsx # Admin dashboard
│   │   ├── products/          # Product management
│   │   └── orders/page.tsx    # Order management
│   ├── api/                   # API routes (Controllers)
│   │   ├── products/          # Product CRUD operations
│   │   ├── cart/              # Cart management
│   │   └── orders/            # Order processing
│   ├── globals.css            # Global styles
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── shop/                  # Shopping-specific components
│   ├── layout/                # Layout components
│   └── protected/             # Auth guards
├── lib/
│   ├── supabase.ts           # Database client & helpers
│   ├── types.ts              # TypeScript interfaces
│   ├── actions.ts            # Server Actions
│   └── utils.ts              # Utility functions
├── store/
│   └── cartStore.ts          # Zustand cart store
└── supabase-schema.sql       # Database schema
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account

### 1. Clone and Install
```bash
git clone <your-repo>
cd web
npm install
```

### 2. Database Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema in your Supabase SQL editor:
   ```sql
   -- Copy and paste contents of supabase-schema.sql
   ```

### 3. Environment Configuration
```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your e-commerce store!

## 🔐 Authentication & Authorization

### User Roles
- **Customer**: Can browse, purchase, and manage their orders
- **Admin**: Full access to product and order management

### Protected Routes
- `/checkout` - Requires authentication
- `/orders` - Requires authentication  
- `/admin/*` - Requires admin role

### Creating Admin User
1. Register a normal user account
2. In Supabase dashboard, update the user's role:
   ```sql
   UPDATE auth.users 
   SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb 
   WHERE email = 'admin@example.com';
   ```

## 🛍️ Core Features

### Customer Features
- **Product Catalog**: Browse products with filtering and search
- **Product Details**: Detailed product pages with image and description
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Secure checkout process with shipping information
- **Order History**: View past orders and their status
- **User Authentication**: Register, login, and profile management

### Admin Features
- **Dashboard**: Overview of store statistics
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and update order status
- **Inventory Tracking**: Monitor stock levels

## 🎨 UI Components

### Reusable Components
- `Button` - Customizable button with variants
- `Input` - Form input with consistent styling
- `Card` - Content container with header/content sections

### Shop Components
- `ProductCard` - Product display with add to cart
- `CartItem` - Cart item with quantity controls
- `Header` - Navigation with cart indicator
- `Footer` - Site footer with links

### Protected Components
- `AuthGuard` - Protects routes requiring authentication
- `AdminGuard` - Protects admin-only routes

## 🗄️ Database Schema

### Core Tables
- `users` - User profiles and roles
- `products` - Product catalog
- `cart_items` - Shopping cart contents
- `orders` - Order information
- `order_items` - Individual order line items

### Security
- Row Level Security (RLS) enabled
- Users can only access their own data
- Admins have elevated permissions
- Automatic user profile creation on signup

## 🔄 State Management

### Zustand Cart Store
- Persistent cart state across sessions
- Add/remove/update cart items
- Calculate totals and item counts
- Optimistic UI updates

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Structure Guidelines
- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Implement proper error handling
- Use Server Actions for mutations
- Keep components small and focused

## 🛡️ Security Features

- Row Level Security (RLS) in Supabase
- Protected API routes
- Input validation and sanitization
- CSRF protection via Next.js
- Secure authentication flow

## 📈 Performance Optimizations

- Next.js Image optimization
- Static generation where possible
- Efficient database queries
- Client-side state management
- Lazy loading of components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

---

Built with ❤️ using Next.js, TypeScript, and Supabase
