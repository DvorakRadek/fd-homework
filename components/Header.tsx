'use client';

import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-blue-700 text-white shadow">
      <div className="max-w-3xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight">Wishlist App</h1>
        <ul className="flex gap-6">
          <li>
            <Link
              href="/"
              className="hover:underline hover:text-blue-200 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="hover:underline hover:text-blue-200 transition"
            >
              Produkty
            </Link>
          </li>
          <li>
            <Link
              href="/wishlists"
              className="hover:underline hover:text-blue-200 transition"
            >
              Wishlisty
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;