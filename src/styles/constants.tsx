type MenuItem = {
  label: string;
  href?: string;
};

type StaggeredMenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

// ============================================
// STATIC PRODUCT & CATEGORY DATA
// ============================================

export interface StaticProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

export interface StaticCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
}

// Categories - Sorted alphabetically
export const CATEGORIES: StaticCategory[] = [
  {
    id: 'body-bath',
    name: 'Body & Bath',
    slug: 'body-bath',
    image: '/placeholder.svg'
  },
  {
    id: 'feminine-hygiene',
    name: 'Feminine Hygiene',
    slug: 'feminine-hygiene',
    image: '/placeholder.svg'
  },
  {
    id: 'hair-care',
    name: 'Hair Care',
    slug: 'hair-care',
    image: '/placeholder.svg'
  },
  {
    id: 'oral-care',
    name: 'Oral Care',
    slug: 'oral-care',
    image: '/placeholder.svg'
  },
  {
    id: 'reusable-swaps',
    name: 'Reusable Swaps',
    slug: 'reusable-swaps',
    image: '/placeholder.svg'
  },
  {
    id: 'skin-essentials',
    name: 'Skin Essentials',
    slug: 'skin-essentials',
    image: '/placeholder.svg'
  }
];

// Products - Organized by category
export const PRODUCTS: StaticProduct[] = [
  // Oral Care
  {
    id: 'bamboo-toothbrushes',
    name: 'Bamboo Toothbrushes',
    price: 150,
    image: '/placeholder.svg',
    category: 'oral-care',
    description: 'Eco-friendly bamboo toothbrushes for sustainable oral care',
    inStock: true
  },
  {
    id: 'charcoal-toothpaste-tabs',
    name: 'Charcoal Toothpaste Tabs',
    price: 200,
    image: '/placeholder.svg',
    category: 'oral-care',
    description: 'Natural charcoal toothpaste tablets for fresh breath',
    inStock: true
  },
  {
    id: 'compostable-floss-picks',
    name: 'Compostable Floss Picks',
    price: 90,
    image: '/placeholder.svg',
    category: 'oral-care',
    description: 'Biodegradable floss picks for eco-conscious dental care',
    inStock: true
  },
  
  // Skin Essentials
  {
    id: 'reusable-makeup-pads',
    name: 'Reusable Makeup Pads',
    price: 250,
    image: '/placeholder.svg',
    category: 'skin-essentials',
    description: 'Soft, washable makeup remover pads',
    inStock: true
  },
  {
    id: 'bamboo-cotton-buds',
    name: 'Bamboo Cotton Buds',
    price: 100,
    image: '/placeholder.svg',
    category: 'skin-essentials',
    description: 'Sustainable bamboo cotton swabs',
    inStock: true
  },
  {
    id: 'facial-cleansing-cloths',
    name: 'Facial Cleansing Cloths',
    price: 200,
    image: '/placeholder.svg',
    category: 'skin-essentials',
    description: 'Reusable microfiber facial cleansing cloths',
    inStock: true
  },
  
  // Hair Care
  {
    id: 'bamboo-hair-brush',
    name: 'Bamboo Hair Brush',
    price: 350,
    image: '/placeholder.svg',
    category: 'hair-care',
    description: 'Natural bamboo hair brush with wooden bristles',
    inStock: true
  },
  {
    id: 'compostable-hair-ties',
    name: 'Compostable Hair Ties',
    price: 120,
    image: '/placeholder.svg',
    category: 'hair-care',
    description: 'Biodegradable hair ties made from natural materials',
    inStock: true
  },
  {
    id: 'natural-dry-shampoo-powder',
    name: 'Natural Dry Shampoo Powder',
    price: 280,
    image: '/placeholder.svg',
    category: 'hair-care',
    description: 'Plant-based dry shampoo powder',
    inStock: true
  },
  
  // Body & Bath
  {
    id: 'zero-waste-deodorant',
    name: 'Zero-Waste Deodorant',
    price: 300,
    image: '/placeholder.svg',
    category: 'body-bath',
    description: 'Natural deodorant in compostable packaging',
    inStock: true
  },
  {
    id: 'bamboo-soap-dish',
    name: 'Bamboo Soap Dish',
    price: 180,
    image: '/placeholder.svg',
    category: 'body-bath',
    description: 'Sustainable bamboo soap holder with drainage',
    inStock: true
  },
  {
    id: 'loofah-body-scrubbers',
    name: 'Loofah Body Scrubbers',
    price: 220,
    image: '/placeholder.svg',
    category: 'body-bath',
    description: 'Natural loofah sponges for gentle exfoliation',
    inStock: true
  },
  
  // Feminine Hygiene
  {
    id: 'silicone-menstrual-cups',
    name: 'Silicone Menstrual Cups',
    price: 500,
    image: '/placeholder.svg',
    category: 'feminine-hygiene',
    description: 'Medical-grade silicone menstrual cups',
    inStock: true
  },
  {
    id: 'reusable-pads',
    name: 'Reusable Pads',
    price: 400,
    image: '/placeholder.svg',
    category: 'feminine-hygiene',
    description: 'Washable cloth menstrual pads',
    inStock: true
  },
  {
    id: 'period-underwear',
    name: 'Period Underwear',
    price: 600,
    image: '/placeholder.svg',
    category: 'feminine-hygiene',
    description: 'Leak-proof period underwear',
    inStock: true
  },
  
  // Reusable Swaps
  {
    id: 'silicone-ear-cleaners',
    name: 'Silicone Ear Cleaners',
    price: 180,
    image: '/placeholder.svg',
    category: 'reusable-swaps',
    description: 'Reusable silicone ear cleaning tools',
    inStock: true
  },
  {
    id: 'beeswax-food-wraps',
    name: 'Beeswax Food Wraps',
    price: 250,
    image: '/placeholder.svg',
    category: 'reusable-swaps',
    description: 'Natural beeswax wraps for food storage',
    inStock: true
  },
  {
    id: 'bamboo-cutlery-set',
    name: 'Bamboo Cutlery Set',
    price: 320,
    image: '/placeholder.svg',
    category: 'reusable-swaps',
    description: 'Portable bamboo cutlery set with carrying case',
    inStock: true
  }
];

// Helper functions
export const getProductsByCategory = (categorySlug: string): StaticProduct[] => {
  return PRODUCTS.filter(product => product.category === categorySlug);
};

export const getProductById = (productId: string): StaticProduct | undefined => {
  return PRODUCTS.find(product => product.id === productId);
};

export const getAllProducts = (): StaticProduct[] => {
  return PRODUCTS;
};

export const getBestSellers = (): StaticProduct[] => {
  // Return first 6 products as best sellers
  return PRODUCTS.slice(0, 6);
};

// ============================================
// NAVIGATION & UI CONSTANTS
// ============================================

export const NAVBAR_ITEMS = [
  {
    label: "Best Seller",
    href: "/best-sellers",
  },
  {
    label: "Track Order",
    href: "/track-order",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "Products",
    href: "/shop",
  }
] as const;

export const STAGGERED_MENU_ITEMS: StaggeredMenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Shop', ariaLabel: 'Browse all products', link: '/shop' },
  { label: 'Categories', ariaLabel: 'View product categories', link: '/categories' },
  { label: 'Best Sellers', ariaLabel: 'View best selling products', link: '/best-sellers' },
  { label: 'Track Orders', ariaLabel: 'Track your orders', link: '/track-orders' }
];

export const SOCIAL_ITEMS = [
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'Facebook', link: 'https://facebook.com' },
  { label: 'Twitter', link: 'https://twitter.com' }
];

export const LOGO = {
  name: "necter.",
  href: "/",
};
