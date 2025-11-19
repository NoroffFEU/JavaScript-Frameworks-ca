"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

import { money } from "@/lib/format";
import type { Order } from "@/lib/orders";

/* ---------- Helpers ---------- */

function readLastOrder(): Order | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem("lastOrder");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Order;
  } catch {
    return null;
  }
}

/* ---------- Component ---------- */

export default function CheckoutSuccessPage() {
  // Lazy init from sessionStorage (no setState in effect)
  const [order] = useState<Order | null>(() => readLastOrder());

  // Side-effect only: toast (no state updates)
  useEffect(() => {
    if (order) {
      toast.success("Thank you for your order!");
      // Optionally clear once shown:
      // sessionStorage.removeItem("lastOrder");
    }
  }, [order]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl py-5 font-semibold">Thank you for your order!</h1>

      {order ? (
        <>
          <p className="mt-2 text-gray-900">
            Order <span className="font-mono">{order.id}</span> for{" "}
            <strong>{order.email}</strong> placed on{" "}
            {new Date(order.createdAt).toLocaleString()}.
          </p>

          <div className="mt-6 rounded-xl border p-4">
            <h2 className="mb-3 text-lg font-semibold">Items</h2>
            <ul className="space-y-2">
              {order.items.map((it) => (
                <li
                  key={it.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="max-w-[60%] truncate">
                    {it.title} × {it.qty}
                  </span>
                  <span>{money(it.unitPrice * it.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <span className="font-medium">Total</span>
              <span className="font-semibold">{money(order.total)}</span>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-3 text-gray-900">No recent order found.</p>
      )}

      <div className="mt-8">
        <Link href="/" className=" px-5 py-2.5 text-gray-800">
          ← continue Shoping
        </Link>
      </div>
    </main>
  );
}
