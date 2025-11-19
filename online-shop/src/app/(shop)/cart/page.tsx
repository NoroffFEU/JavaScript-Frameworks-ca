"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useCart } from "@/store/cart.store";
import { useAuth } from "@/store/auth.store";
import CartLine from "@/components/cart/CartLine";
import { money } from "@/lib/format";
import { createOrder } from "@/lib/orders";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const clear = useCart((s) => s.clear);
  const { user } = useAuth();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);

  function handlePurchase() {
    if (!items.length || isProcessing) return;

    if (!user) {
      toast.error("Please login before purchasing.");
      router.push("/auth/login");
      return;
    }

    setIsProcessing(true);
    try {
      const order = createOrder(user.email, items, total);
      sessionStorage.setItem("lastOrder", JSON.stringify(order));
      clear(); // clear cart after saving the order
      router.push("/checkout/success");
    } finally {
      setIsProcessing(false);
    }
  }

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

      <div className="mt-8 flex items-center justify-between rounded-xl border border-gray-200 p-6">
        <p className="text-lg">
          Total:{" "}
          <span className="font-bold px-2 text-red-600">{money(total)}</span>
        </p>
        <button
          type="button"
          onClick={handlePurchase}
          disabled={isProcessing}
          className="rounded-lg bg-amber-600 px-5 py-3 text-white font-bold hover:bg-amber-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Order Now"}
        </button>
      </div>
    </main>
  );
}
