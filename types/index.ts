export type Product = {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  imageUrl?: string;
};

export type Wishlist = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  publicId?: string;
  products: WishlistProduct[];
};

export type WishlistProduct = {
  productId: string;
  addedAt: string;
  priceAtAdd: number;
};

export type User = {
  id: string;
  email: string;
  name: string;
};