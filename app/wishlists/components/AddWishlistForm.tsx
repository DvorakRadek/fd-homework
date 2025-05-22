import { fetchData } from "@/lib/fetchData";
import { Wishlist } from "@/types";

type AddWishlistFormProps = {
  setWishlists: (wishlists: Wishlist[]) => void;
}

const AddWishlistForm = ({ setWishlists }: AddWishlistFormProps) => {

    const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const name = formData.get("name") as string;
      const description = formData.get("description") as string;

      try {
        const newWishlist = await fetchData("wishlists", {
          method: "POST",
          body: { name, description },
        });
        localStorage.setItem("selectedWishlist", JSON.stringify(newWishlist));
        form.reset();
        alert("Wishlist byl úspěšně vytvořen!");
        const data = await fetchData("wishlists");
        setWishlists(data);
      } catch (err) {
        alert("Chyba při vytváření wishlistu.");
      }
    };

  return (
    <form
      className="bg-white rounded shadow p-6 flex flex-col gap-4"
      onSubmit={handleFormSubmit}
    >
      <h3 className="text-lg font-semibold mb-2">Přidat nový wishlist</h3>
      <input
        type="text"
        name="name"
        placeholder="Název wishlistu"
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="text"
        name="description"
        placeholder="Popis (volitelné)"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
      >
        Přidat wishlist
      </button>
    </form>
  );
};

export default AddWishlistForm;