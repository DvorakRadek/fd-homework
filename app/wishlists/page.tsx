"use client";

import { useEffect, useState } from "react";
import { Wishlist } from "@/types";
import { fetchData } from "@/lib/fetchData";
import AddWishlistForm from "./components/AddWishlistForm";
import Wishlists from "./components/Wishlists";

const WishlistsPage = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  const fetchWishlists = async () => {
    const data = await fetchData("wishlists");
    setWishlists(data);
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Seznam wishlistů</h2>
      <Wishlists wishlists={wishlists} setWishlists={setWishlists} />
      <AddWishlistForm setWishlists={setWishlists} />
    </div>
  );
};

export default WishlistsPage;