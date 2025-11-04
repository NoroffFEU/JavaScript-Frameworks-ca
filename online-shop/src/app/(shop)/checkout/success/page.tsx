"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart.store";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const clear = useCart((s) => s.clear);
  const hasItems = useCart((s) => s.items.length > 0);

  useEffect(() => {
    // Clear once when landing here from /cart
    if (hasItems) {
      clear();
    }
    toast.success("Checkout successful");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Thank you! 🎉</h1>
      <p className="mt-3 text-gray-700">
        Your order has been placed. A confirmation has been sent to your email.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="rounded-lg bg-black px-5 py-2.5 text-white hover:bg-gray-800"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
