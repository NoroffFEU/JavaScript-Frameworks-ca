"use client";

import Image from "next/image";
import QtyStepper from "./QtyStepper";
import { useCart } from "@/store/cart.store";
import { money } from "@/lib/format";
import { toast } from "react-hot-toast";

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  unitPrice: number;
  qty: number;
};

export default function CartLine({
  id,
  title,
  imageUrl,
  unitPrice,
  qty,
}: Props) {
  const updateQty = useCart((s) => s.updateQty);
  const remove = useCart((s) => s.remove);

  return (
    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4 rounded-xl border p-3 sm:grid-cols-[100px_1fr_auto]">
      <div className="relative h-20 w-20 overflow-hidden rounded-lg sm:h-24 sm:w-24">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600">{money(unitPrice)}</p>
        <QtyStepper value={qty} onChange={(v) => updateQty(id, v)} />
      </div>

      <div className="text-right">
        <p className="font-semibold">{money(unitPrice * qty)}</p>
        <button
          onClick={() => {
            remove(id);
            toast.success("Removed from cart");
          }}
          className="mt-2 text-sm text-red-600 hover:underline"
          aria-label={`Remove ${title}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
