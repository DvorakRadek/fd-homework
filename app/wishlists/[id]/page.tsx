"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Wishlist, Product } from "@/types";
import { fetchData } from "@/lib/fetchData";
import ProductList from "@/components/ProductList";
import Link from "next/link";

const WishlistPage = () => {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const data = await fetchData("wishlists");
        const foundWishlist = data.find((w: Wishlist) => w.id === id);
        if (!foundWishlist) {
          alert("Wishlist nenalezen");
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
      await fetchData("wishlists-products", {
        method: "PATCH",
        body: {
          action: "removeProduct",
          wishlistId: id,
          product,
        },
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
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded shadow p-6 text-center">
          <p className="text-gray-500">Načítám wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{wishlist.name}</h2>
        {wishlist.description && (
          <p className="text-gray-600">{wishlist.description}</p>
        )}
      </div>
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Produkty ve wishlistu</h3>
        <ul>
          {wishlist.products.length === 0
            ? <li className="text-gray-400 italic">Tento wishlist je prázdný. Přejít na <Link href="/products" className="text-blue-500 hover:underline">produkty</Link>.</li>
            : <ProductList products={wishlist.products} buttonFn={removeFromWishlist} buttonText="Smazat" />
          }
        </ul>
      </div>
    </div>
  );
};

export default WishlistPage;