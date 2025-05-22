import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Vítejte v aplikaci Wishlist!</h1>
        <p className="text-gray-700 mb-6">
          Spravujte své wishlisty a produkty jednoduše a přehledně.
        </p>
        <Link
          href="/wishlists"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-semibold"
        >
          Přejít na wishlisty
        </Link>
      </div>
    </div>
  );
}