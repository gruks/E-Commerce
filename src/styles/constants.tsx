type MenuItem = {
  label: string;
  href?: string;
  hasSubcategories?: boolean;
  subcategories?: MenuItem[];
};

type StaggeredMenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

export const NAVBAR_ITEMS = [
  {
    label: "Best Seller",
    href: "/best-sellers",
    hasSubcategories: false
  },
  {
    label: "Track Order",
    href: "/track-order",
    hasSubcategories: false,
  },
  {
    label: "Categories",
    href: "/categories",
    hasSubcategories: true,
    subcategories: [
      { label: "Electronics", href: "/categories/electronics" },
      { label: "Clothing", href: "/categories/clothing" },
      { label: "Home & Garden", href: "/categories/home-garden" },
      { label: "Sports & Outdoors", href: "/categories/sports" },
      { label: "Beauty & Health", href: "/categories/beauty" },
      { label: "Books & Media", href: "/categories/books" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    hasSubcategories: false
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
