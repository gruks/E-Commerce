export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  subtitle: string;
  imageFront: string;
  imageBack: string;
  hasSizes?: boolean;
};