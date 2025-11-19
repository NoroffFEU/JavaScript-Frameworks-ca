"use client";

import Link from "next/link";
import { useCart } from "@/store/cart.store";

export default function CartIcon() {
  const count = useCart((s) => s.count());

  const label =
    count > 0
      ? `Open cart (${count} item${count === 1 ? "" : "s"})`
      : "Open cart";

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center"
      aria-label={label}
    >
      <span aria-hidden="true">Cart🛒</span>
      {count > 0 && (
        <span className="absolute left-9 top-0 inline-flex min-w-2 items-center justify-start rounded-full bg-amber-600 px-1.5 py-0.5 text-xs font-semibold text-white shadow-sm">
          {count}
        </span>
      )}
    </Link>
  );
}
