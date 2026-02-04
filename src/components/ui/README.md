# Product Grid Components

Reusable components for displaying products with GSAP flip animations.

## Components

### ProductGrid
A responsive grid wrapper that adapts to different screen sizes:
- **Desktop (≥1024px)**: 4 cards per row
- **Mobile (≤640px)**: 2 cards per row

### ProductCard
Individual product card with GSAP flip animation on hover/tap.

## Usage

```tsx
import ProductGrid from "@/components/ui/ProductGrid";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/product";

const products: Product[] = [
  {
    id: "1",
    name: "Product Name",
    subtitle: "Product description",
    price: 299,
    rating: 5,
    imageFront: "/products/product-front.png",
    imageBack: "/products/product-back.png",
    hasSizes: false
  }
];

export default function MyPage() {
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGrid>
  );
}
```

## Image Structure

Place product images in:
```
public/
  products/
    product-name-front.png
    product-name-back.png
```

## Features

- **Responsive Grid**: Automatically adjusts columns based on screen size
- **GSAP Flip Animation**: Smooth 3D flip effect on hover
- **Touch Support**: Works on mobile devices with tap
- **Customizable**: Easy to modify styling and behavior
- **TypeScript**: Full type safety with Product interface