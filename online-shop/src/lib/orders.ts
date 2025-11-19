import type { CartItem } from "@/store/cart.store";

export type Order = {
  id: string;
  email: string;
  items: CartItem[];
  total: number;
  createdAt: string;
};

export function createOrder(
  email: string,
  items: CartItem[],
  total: number
): Order {
  return {
    id: crypto.randomUUID(),
    email,
    items,
    total,
    createdAt: new Date().toISOString(),
  };
}
