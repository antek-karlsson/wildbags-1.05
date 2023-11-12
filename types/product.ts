export interface Product {
  id: string;
  name: string;
  price: number;
  status: 'private' | 'public';
  images: string[];
  description: string;
  features: string[];
  sizes: string[];
  categories: string[];
}
