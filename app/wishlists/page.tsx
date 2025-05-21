"use client"; // Označuje client komponentu

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wishlist } from "@/types";

const WishlistsPage = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/wishlists", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": "demoUser", // ID uživatele, který načítá wishlisty
          },
        }); // Načítání z API endpointu
        if (!response.ok) {
          throw new Error("Chyba při načítání wishlistů");
        }
        const data: Wishlist[] = await response.json();
        setWishlists(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlists();
  }, []);

  return (
    <ul className="max-w-3xl mx-auto p-4">
      {wishlists.map((wishlist) => (
        <li key={wishlist.id} className="border-b pb-2 mb-2">
          <Link href={`/wishlists/${wishlist.id}`} className="hover:underline font-semibold">
            {wishlist.name} ({wishlist.products.length} položek)
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default WishlistsPage;