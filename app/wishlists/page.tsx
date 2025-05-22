"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wishlist } from "@/types";
import { fetchData } from "@/lib/fetchData";

const WishlistsPage = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchWishlists = async () => {
    const data = await fetchData("wishlists");
    setWishlists(data);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage(null);
    if (!form.name.trim()) {
      setFormMessage("Název je povinný.");
      return;
    }
    try {
      await fetchData("wishlists", {
        method: "POST",
        body: { name: form.name, description: form.description },
      });
      setForm({ name: "", description: "" });
      setFormMessage("Wishlist byl úspěšně vytvořen!");
      await fetchWishlists();
    } catch (err) {
      setFormMessage("Chyba při vytváření wishlistu.");
    }
  };

  const handleDeleteWishlist = async (wishlistId: string) => {
    try {
      await fetchData("wishlists", {
        method: "DELETE",
        body: { wishlistId },
      });
      await fetchWishlists();
    } catch (err) {
      alert("Chyba při mazání wishlistu.");
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Seznam wishlistů</h2>
        <ul>
          {wishlists.map((wishlist) => (
            <li
              key={wishlist.id}
              className="flex items-center justify-between border-b py-3"
            >
              <div>
                <Link
                  href={`/wishlists/${wishlist.id}`}
                  className="text-blue-700 hover:underline font-semibold"
                  onClick={() =>
                    localStorage.setItem(
                      "selectedWishlist",
                      JSON.stringify(wishlist)
                    )
                  }
                >
                  {wishlist.name}
                </Link>
                <span className="ml-2 text-gray-500">
                  ({wishlist.products.length} položek)
                </span>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                onClick={() => handleDeleteWishlist(wishlist.id)}
              >
                Smazat
              </button>
            </li>
          ))}
          {wishlists.length === 0 && (
            <li className="text-gray-400 italic">Žádné wishlisty.</li>
          )}
        </ul>
      </div>
      <form
        className="bg-white rounded shadow p-6 flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <h3 className="text-lg font-semibold mb-2">Přidat nový wishlist</h3>
        <input
          type="text"
          name="name"
          placeholder="Název wishlistu"
          value={form.name}
          onChange={handleFormChange}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="description"
          placeholder="Popis (volitelné)"
          value={form.description}
          onChange={handleFormChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          Přidat wishlist
        </button>
        {formMessage && (
          <div className="text-red-500 text-sm mt-1">{formMessage}</div>
        )}
      </form>
    </div>
  );
};

export default WishlistsPage;