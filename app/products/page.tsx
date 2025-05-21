"use client";

import Button from "@/components/Button";
import { Product } from "@/types";
import { useEffect, useState } from "react";

const ProductsPage = () => {
const [products, setProducts] = useState<Product[]>([]);
const [selectedWishlist, setSelectedWishlist] = useState<any>(null);
;

  useEffect(() => {
  const wishlistStr = typeof window !== "undefined" ? localStorage.getItem("selectedWishlist") : null;
  setSelectedWishlist(wishlistStr ? JSON.parse(wishlistStr) : null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (!response.ok) {
        throw new Error("Chyba při načítání produktů");
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProducts();
}, []);

  const addToWishlist = async (product: Product) => {
  if (!selectedWishlist) {
    alert("Nejprve vyberte wishlist.");
    return;
  }
  try {
    await fetch("http://localhost:3000/api/wishlists-products", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: 'addProduct',
        wishlistId: selectedWishlist.id,
        product,
      }),
    });
    console.log(`Produkt ${product.id} přidán do wishlistu!`);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <ul className="max-w-3xl mx-auto p-4">
       {selectedWishlist && (
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Wishlist: {selectedWishlist.name}
        </h2>
      </div>
    )}
      {products.map((product) => (
        <li key={product.id} className="flex items-center gap-4 border-b pb-2 mb-2">
          <span className="font-semibold">{product.name}</span>
          <span className="text-gray-500">{product.price} Kč</span>
          <Button onClick={() => addToWishlist(product)}>
            Přidat do wishlistu
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ProductsPage;