type MenuItem = {
  label: string;
  href?: string;
  hasSubcategories?: boolean;
  subcategories?: MenuItem[];
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
  },
  {
    label: "Cart",
    href: "/cart",
    hasSubcategories: false
  },
] as const;

export const LOGO = {
  name: "necter.",
  href: "/",
};
