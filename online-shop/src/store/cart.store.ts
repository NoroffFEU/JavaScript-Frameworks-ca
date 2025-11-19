"use client";
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
  add: (item: CartItem) => void; // <-- 1 argument
  changeQty: (id: string, qty: number) => void; // <-- name is changeQty
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add(item) {
        const found = get().items.find((i) => i.id === item.id);
        if (found) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      changeQty(id, qty) {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.id !== id) });
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
        });
      },
      remove(id) {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      clear() {
        set({ items: [] });
      },
      total() {
        return get().items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
      },
      count() {
        return get().items.reduce((n, i) => n + i.qty, 0);
      },
    }),
    { name: "cart" }
  )
);
