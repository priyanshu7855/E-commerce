export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  shippingAddress: Address;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';