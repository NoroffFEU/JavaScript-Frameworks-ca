"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";

import { useCart, type CartItem } from "@/store/cart.store";
import { money } from "@/lib/format";
import QtyStepper from "@/components/cart/QtyStepper";

type Props = CartItem;

export default function CartLine({
  id,
  title,
  imageUrl,
  unitPrice,
  qty,
}: Props) {
  const changeQty = useCart((s) => s.changeQty);
  const remove = useCart((s) => s.remove);

  return (
    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4 rounded-xl border border-gray-400 p-3 sm:grid-cols-[100px_1fr_auto]">
      <div className="relative h-20 w-20 overflow-hidden rounded-lg sm:h-24 sm:w-24">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-red-600">{money(unitPrice)}</p>

        <QtyStepper
          value={qty}
          min={1}
          onChange={(newQty) => changeQty(id, newQty)}
        />
      </div>

      <div className="text-right">
        <p className="font-semibold">{money(unitPrice * qty)}</p>
        <button
          type="button"
          onClick={() => {
            remove(id);
            toast.success("Removed from cart");
          }}
          className="mt-2 text-sm text-gray-500 hover:underline"
          aria-label={`Remove ${title}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
