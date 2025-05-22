'use client';

import { getSelectedWishlist } from "@/lib/getSelectedWishlist";

const WishlistSelected = () => {
  const selectedWishlist = getSelectedWishlist();

  return (
    <>
      {selectedWishlist && (
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">
            Wishlist: {selectedWishlist.name}
          </h2>
          {selectedWishlist.description && (
            <p className="text-gray-600">{selectedWishlist.description}</p>
          )}
        </div>
      )}
    </>
  );
};

export default WishlistSelected;