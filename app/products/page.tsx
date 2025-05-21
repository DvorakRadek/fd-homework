"use client"; // Označuje client komponentu

import { Product } from "@/types";
import { useEffect, useState } from "react";

const DEFAULT_WISHLIST_ID = "demoWishlist"; // ID výchozího wishlistu

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": "demoUser", // ID uživatele, který načítá produkty
          },
        }); // Načítání z endpointu
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

  const addToWishlist = async (productId: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "demoUser", // ID uživatele, který přidává produkt do wishlistu
        },
        body: JSON.stringify({
          wishlistId: DEFAULT_WISHLIST_ID,
          productId,
        }),
      });

      if (!response.ok) {
        throw new Error("Produkt se nepodařilo přidat do wishlistu.");
      }

      console.log(`Produkt ${productId} přidán do wishlistu!`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className="max-w-3xl mx-auto p-4">
      {products.map((product) => (
        <li key={product.id} className="flex items-center gap-4 border-b pb-2 mb-2">
          <span className="font-semibold">{product.name}</span>
          <span className="text-gray-500">{product.price} Kč</span>
          {/* Tlačítko Přidat do wishlistu */}
          <button 
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => addToWishlist(product.id)}
          >
            Přidat do wishlistu
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProductsPage;