export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  subtitle: string;
  imageFront: string;
  imageBack: string;
  hasSizes?: boolean;
  // Filter properties
  category?: string;
  step?: string;
  productType?: string;
  concern?: string;
  ingredient?: string;
  availability?: boolean;
  createdAt?: Date;
};