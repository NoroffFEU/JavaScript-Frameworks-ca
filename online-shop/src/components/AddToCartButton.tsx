"use client";

import { useCart } from "@/store/cart.store";
import { toast } from "react-hot-toast";

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  unitPrice: number;
};

export default function AddToCartButton({
  id,
  title,
  imageUrl,
  unitPrice,
}: Props) {
  const add = useCart((s) => s.add);

  function handleAdd() {
    add({ id, title, imageUrl, unitPrice }, 1);
    toast.success("Added to cart");
  }

  return (
    <button
      onClick={handleAdd}
      className="mt-4 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
      aria-label={`Add ${title} to cart`}
    >
      Add to Cart
    </button>
  );
}
