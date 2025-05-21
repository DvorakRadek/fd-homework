"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wishlist } from "@/types";

const WishlistsPage = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchWishlists = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/wishlists");
      if (!response.ok) {
        throw new Error("Chyba při načítání wishlistů");
      }
      const data: Wishlist[] = await response.json();
      setWishlists(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage(null);
    if (!form.name.trim()) {
      setFormMessage("Název je povinný.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/wishlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, description: form.description }),
      });
      if (!res.ok) throw new Error("Chyba při vytváření wishlistu");
      setForm({ name: "", description: "" });
      setFormMessage("Wishlist byl úspěšně vytvořen!");
      await fetchWishlists(); // Refresh the list here
    } catch (err) {
      setFormMessage("Chyba při vytváření wishlistu.");
    }
  };

  const handleDeleteWishlist = async (wishlistId: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/wishlists", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlistId }),
      });
      if (!res.ok) throw new Error("Chyba při mazání wishlistu");
      await fetchWishlists(); // Refresh the list after deletion
    } catch (err) {
      alert("Chyba při mazání wishlistu.");
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  return (
  <>
        <ul className="max-w-3xl mx-auto p-4">
      {wishlists.map((wishlist) => (
        <li key={wishlist.id} className="border-b pb-2 mb-2 flex items-center gap-4">
          <Link
            href={`/wishlists/${wishlist.id}`}
            className="hover:underline font-semibold flex-1"
            onClick={() => localStorage.setItem("selectedWishlist", JSON.stringify(wishlist))}
          >
            {wishlist.name} ({wishlist.products.length} položek)
          </Link>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => handleDeleteWishlist(wishlist.id)}
          >
            Smazat
          </button>
        </li>
      ))}
    </ul>
    <form
      className="max-w-3xl mx-auto p-4 border rounded mt-8 flex flex-col gap-3"
      onSubmit={handleFormSubmit}
    >
      <h3 className="text-lg font-bold">Přidat nový wishlist</h3>
      <input
        type="text"
        name="name"
        placeholder="Název wishlistu"
        value={form.name}
        onChange={handleFormChange}
        required
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        name="description"
        placeholder="Popis (volitelné)"
        value={form.description}
        onChange={handleFormChange}
        className="border px-2 py-1 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Přidat wishlist
      </button>
      {formMessage && <div className="text-sm mt-2">{formMessage}</div>}
    </form>
  </>
  );
}

export default WishlistsPage;