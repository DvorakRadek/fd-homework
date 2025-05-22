import { Wishlist } from "@/common/types";
import { fetchData } from "@/lib/fetchData";
import Link from "next/link";

type WishlistsProps = {
  wishlists: Wishlist[];
  setWishlists: (wishlists: Wishlist[]) => void;
}

const Wishlists = ({ wishlists, setWishlists }: WishlistsProps) => {

  const handleDeleteWishlist = async (wishlistId: string) => {
    try {
      await fetchData("wishlists", {
        method: "DELETE",
        body: { wishlistId },
      });
      localStorage.removeItem("selectedWishlist");
      const data = await fetchData("wishlists");
      setWishlists(data);
    } catch (err) {
      alert("Chyba při mazání wishlistu.");
    }
  };

  return (
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
  );
};

export default Wishlists;