export type Product = {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
};

export type Wishlist = {
  id: string;
  name: string;
  description?: string;
  products: Product[];
};