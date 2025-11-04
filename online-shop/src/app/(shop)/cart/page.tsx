"use client";

import { useCart } from "@/store/cart.store";
import CartLine from "@/components/CartLine";
import { money } from "@/lib/format";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const router = useRouter();

  if (!items.length) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">Add some products to get started.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Your Cart</h1>

      <div className="grid gap-4">
        {items.map((i) => (
          <CartLine key={i.id} {...i} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-xl border p-4">
        <p className="text-lg">
          Total: <span className="font-bold">{money(total)}</span>
        </p>
        <button
          onClick={() => router.push("/checkout/success")}
          className="rounded-lg bg-black px-5 py-2.5 text-white hover:bg-gray-800"
        >
          Checkout
        </button>
      </div>
    </main>
  );
}
