"use client";

import Button from "@/components/Button";
import { fetchData } from "@/lib/fetchData";
import { Product } from "@/types";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedWishlist, setSelectedWishlist] = useState<any>(null);

  useEffect(() => {
    const wishlistStr =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedWishlist")
        : null;
    setSelectedWishlist(wishlistStr ? JSON.parse(wishlistStr) : null);

    const fetchProducts = async () => {
      const data = await fetchData("products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const addToWishlist = async (product: Product) => {
    if (!selectedWishlist) {
      alert("Nejprve vyberte wishlist.");
      return;
    }

    await fetchData("wishlists-products", {
      method: "PATCH",
      body: {
        action: "addProduct",
        wishlistId: selectedWishlist.id,
        product,
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {selectedWishlist && (
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">
            Wishlist: {selectedWishlist.name}
          </h2>
          {selectedWishlist.description && (
            <p className="text-gray-600">{selectedWishlist.description}</p>
          )}
        </div>
      )}
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Produkty</h3>
        <ul>
          {products.length === 0 && (
            <li className="text-gray-400 italic">Žádné produkty.</li>
          )}
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between border-b py-3 last:border-b-0"
            >
              <div>
                <span className="font-semibold">{product.name}</span>
                <span className="ml-2 text-gray-500">{product.price} Kč</span>
              </div>
              <Button onClick={() => addToWishlist(product)}>
                Přidat do wishlistu
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;