"use client"; // Označuje, že tato komponenta běží na klientovi

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Wishlist App</h1>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/products" className="hover:underline">Produkty</Link></li>
          <li><Link href="/wishlists" className="hover:underline">Wishlisty</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;