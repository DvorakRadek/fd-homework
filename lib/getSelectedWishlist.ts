export const getSelectedWishlist = () => {
  const wishlistStr = localStorage.getItem("selectedWishlist") || null;
    const selectedWishlist = wishlistStr
      ? JSON.parse(wishlistStr)
      : null;
  return selectedWishlist;
};
