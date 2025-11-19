"use client";

import type { CartItem } from "@/store/cart.store";
import { useAddToCart } from "@/hooks/useAddToCart";

type Props = Omit<CartItem, "qty"> & {
  qty?: number; // default to 1
};

export default function AddToCartButton({
  id,
  title,
  imageUrl,
  unitPrice,
  qty = 1,
}: Props) {
  const addToCart = useAddToCart();

  function handleAdd() {
    addToCart({ id, title, imageUrl, unitPrice, qty });
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="mt-4 inline-flex items-center justify-center rounded-xl bg-amber-600 px-6 py-2.5 text-lg font-semibold text-white-100 shadow-sm transition 
hover:bg-amber-800 hover:shadow-md "
      aria-label={`Add ${title} to cart`}
    >
      Add to Cart
    </button>
  );
}
