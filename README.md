# necter - Modern Ecommerce Website

A modern, necter ecommerce website built with Next.js, featuring clean design, responsive layout, and optimized user experience.

## 🚀 Features

### Design & UX
- **Clean, necter design** with neutral color palette
- **Fully responsive** - optimized for desktop, tablet, and mobile
- **Modern typography** with consistent hierarchy
- **Smooth animations** and micro-interactions
- **Loading skeletons** for better perceived performance
- **Toast notifications** for user feedback

### Pages & Components
- **Homepage** with hero section and category cards
- **Product Listing Page (PLP)** with filters and grid/list view
- **Product Details Page (PDP)** with image gallery and tabs
- **Shopping Cart** with quantity controls and order summary
- **Categories Page** with featured category layout
- **Responsive Navigation** with mobile hamburger menu

### Technical Features
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for consistent icons
- **Custom design system** with CSS variables
- **Optimized images** with Next.js Image component
- **SEO-friendly** with proper meta tags

## 🛠️ Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image
- **Development:** Turbopack (Next.js dev server)

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile:** < 768px (1 column layout)
- **Tablet:** 768px - 1024px (2 column layout)
- **Desktop:** > 1024px (3-4 column layout)

## 🎨 Design System

### Colors
- **Background:** White (#ffffff)
- **Foreground:** Dark Gray (#1a1a1a)
- **Accent:** Black (#000000) for CTAs
- **Muted:** Light Gray (#f8f9fa) for backgrounds
- **Border:** Light Gray (#e5e7eb)

### Typography
- **Display:** Large headings (clamp 2rem - 3.5rem)
- **Heading 1:** Main headings (clamp 1.75rem - 2.5rem)
- **Heading 2:** Section headings (clamp 1.25rem - 1.875rem)
- **Body:** Regular text (1rem)
- **Caption:** Small text (0.75rem)

### Components
- **Buttons:** Primary (black), Secondary (gray), Ghost (transparent)
- **Cards:** White background with subtle shadow and hover effects
- **Inputs:** Clean styling with focus states
- **Navigation:** Sticky header with smooth transitions

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
web/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── categories/        # Categories listing
│   ├── products/[id]/     # Product details page
│   ├── shop/              # Product listing page
│   ├── globals.css        # Global styles and design system
│   ├── layout.tsx         # Root layout with navbar/footer
│   └── page.tsx           # Homepage
├── components/
│   ├── layout/            # Layout components (Navbar, Footer)
│   └── ui/                # Reusable UI components
├── public/                # Static assets
└── tailwind.config.js     # Tailwind configuration
```

## 🎯 Key Features Implemented

### 1. Hero & Homepage ✅
- Full-width hero banner with clear CTA
- Product category cards with hover effects
- Trust indicators and social proof
- Features section with icons

### 2. Product Listing Page ✅
- Responsive grid layout (1-4 columns)
- Product cards with images, ratings, and quick actions
- Collapsible filters sidebar
- Sort dropdown and view mode toggle
- Pagination controls

### 3. Product Details Page ✅
- Image gallery with thumbnails and navigation
- Product information with ratings and reviews
- Quantity selector and add to cart
- Tabbed content (Description, Ingredients, Reviews, FAQ)
- Trust badges and product benefits

### 4. Cart & Checkout Flow ✅
- Item summary with quantity controls
- Price breakdown and order summary
- Empty cart state with CTA
- Responsive layout with sticky summary

### 5. Navigation & Mobile Responsiveness ✅
- Sticky header with search integration
- Mobile hamburger menu with slide animation
- Touch-friendly interface with proper target sizes
- Responsive typography and spacing

### 6. Micro-interactions & Feedback ✅
- Hover effects on buttons and cards
- Loading skeletons for content
- Toast notifications system
- Smooth transitions and animations

## 🔧 Customization

The design system is built with CSS custom properties, making it easy to customize:

```css
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --accent: #000000;
  /* ... other variables */
}
```

## 📈 Performance Optimizations

- **Image optimization** with Next.js Image component
- **Code splitting** with Next.js App Router
- **CSS optimization** with Tailwind CSS purging
- **Loading states** to improve perceived performance
- **Responsive images** with proper sizing

## 🎨 Design Principles

- **Minimalism:** Clean, uncluttered interface
- **Consistency:** Unified design language throughout
- **Accessibility:** Proper contrast ratios and touch targets
- **Performance:** Fast loading and smooth interactions
- **Mobile-first:** Responsive design from the ground up

## 🚀 Deployment

The project is ready for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**

Simply connect your repository and deploy with zero configuration.

---

Built with ❤️ using modern web technologies for optimal user experience.