"use client";

import { useCart, type CartItem } from "@/store/cart.store";
import { toast } from "react-hot-toast";

export function useAddToCart() {
  const add = useCart((s) => s.add);

  return (item: CartItem) => {
    add(item);
    toast.success("Added to cart");
  };
}
