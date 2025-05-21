"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Wishlist, Product } from "@/types";

const WishlistPage = () => {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/wishlists");
        if (!response.ok) {
          throw new Error("Chyba při načítání wishlistů");
        }
        const wishlists: Wishlist[] = await response.json();

        const foundWishlist = wishlists.find((w) => w.id === id);
        if (!foundWishlist) {
          throw new Error("Wishlist nenalezen");
        }

        setWishlist(foundWishlist);
      } catch (error) {
        console.error(error);
        router.push("/wishlists");
      }
    };

    fetchWishlists();
  }, [id, router]);

  const removeFromWishlist = async (product: Product) => {
    try {
      await fetch("http://localhost:3000/api/wishlists-products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "removeProduct",
          wishlistId: id,
          product,
        }),
      });
      setWishlist((prev) =>
        prev
          ? { ...prev, products: prev.products.filter((p) => p.id !== product.id) }
          : prev
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!wishlist) {
    return <p>Načítám wishlist...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{wishlist.name}</h2>
        {wishlist.description && (
          <p className="text-gray-600 mt-1">{wishlist.description}</p>
        )}
      </div>
      <ul>
        {wishlist.products.length === 0 ? (
          <li className="text-gray-500 italic">Tento wishlist je prázdný.</li>
        ) : (
          wishlist.products.map((product: Product) => (
            <li key={product.id} className="flex items-center gap-4 border-b pb-2 mb-2">
              <span className="font-semibold">{product.name}</span>
              <span className="text-gray-500">{product.price} Kč</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => removeFromWishlist(product)}
              >
                Smazat
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WishlistPage;
