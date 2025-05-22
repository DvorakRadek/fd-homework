'use client';

import { Product } from "@/common/types";
import Button from "./Button";
import { getSelectedWishlist } from "@/lib/getSelectedWishlist";
import { fetchData } from "@/lib/fetchData";
import { useState } from "react";

type ProductButtonProps = {
  product: Product;
  buttonText: string;
  buttonFn?: (product: Product) => void;
};

const ProductButton = ({ product, buttonText, buttonFn }: ProductButtonProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const selectedWishlist = getSelectedWishlist();
  
  const addToWishlist = async (product: Product) => {
    if (!selectedWishlist) {
      alert("Nejprve vyberte wishlist.");
      return;
    }

    if (
      products &&
      products.some((p: Product) => p.id === product.id)
    ) {
      alert("Produkt je již ve wishlistu.");
      return;
    }

    const data = await fetchData("wishlists-products", {
      method: "PATCH",
      body: {
        action: "addProduct",
        wishlistId: selectedWishlist.id,
        product,
      },
    });
    setProducts(data.wishlist.products);
  };

  return (
    <Button onClick={() => buttonFn?.(product) || addToWishlist(product)} className="ml-4">
      { buttonText }
    </Button>
  );
};

export default ProductButton;