import {
  ShoppingCart,
  PackageSearch,
  Flame,
  List,
  Boxes,
  ChevronRight,
} from "lucide-react";

export const NAVBAR_ITEMS = [
  {
    label: "Best Seller",
    href: "/best-sellers",
    icon: Flame,
  },
  {
    label: "Track Order",
    href: "/track-order",
    icon: PackageSearch,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: List,
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
    icon: Boxes,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: ShoppingCart,
  },
] as const;

export const LOGO = {
  name: "necter.",
  href: "/",
};
