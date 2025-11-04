import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  unitPrice: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) => {
        const items = [...get().items];
        const found = items.find((i) => i.id === item.id);
        if (found) found.qty += qty;
        else items.push({ ...item, qty });
        set({ items });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      updateQty: (id, qty) =>
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
        }),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      total: () => get().items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0),
    }),
    { name: "cart" }
  )
);
