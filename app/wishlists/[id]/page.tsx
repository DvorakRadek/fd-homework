"use client"; // Označuje client komponentu

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Wishlist, WishlistProduct } from "@/types";

const WishlistPage = () => {
  const { id } = useParams(); // Správné získání parametru ID
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/wishlists", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": "demoUser", // ID uživatele, který načítá wishlisty
          },
        }); // Fetch z API endpointu
        if (!response.ok) {
          throw new Error("Chyba při načítání wishlistů");
        }
        const wishlists: Wishlist[] = await response.json();

        // Najít wishlist podle ID
        const foundWishlist = wishlists.find((w) => w.id === id);
        if (!foundWishlist) {
          throw new Error("Wishlist nenalezen");
        }

        setWishlist(foundWishlist);
      } catch (error) {
        console.error(error);
        router.push("/wishlists"); // Přesměrování při chybě
      }
    };

    fetchWishlists();
  }, [id, router]);

  if (!wishlist) {
    return <p>Načítám wishlist...</p>;
  }

  return (
    <ul className="max-w-3xl mx-auto p-4">
      {wishlist.products.map((product: WishlistProduct) => (
        <li key={product.productId} className="flex items-center gap-4 border-b pb-2 mb-2">
          <span className="font-semibold">{product.productId}</span>
        </li>
      ))}
    </ul>
  );
};

export default WishlistPage;
