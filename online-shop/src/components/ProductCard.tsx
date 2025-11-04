import type { Product } from "@/lib/types";
import { discountPercent, effectivePrice, money } from "@/lib/format";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const pct = discountPercent(product);
  const eff = effectivePrice(product);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-xl border p-3"
    >
      <div className="relative">
        {pct > 0 && (
          <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs text-white">
            -{pct}%
          </span>
        )}
        <Image
          src={product.image.url}
          alt={product.image.alt}
          width={600}
          height={400}
          className="h-48 w-full rounded-lg object-cover"
        />
      </div>

      <h3 className="mt-3 line-clamp-1 font-medium">{product.title}</h3>

      <div className="mt-1 flex items-center gap-2">
        {product.discountedPrice < product.price && (
          <span className="text-sm text-gray-500 line-through">
            {money(product.price)}
          </span>
        )}
        <span className="font-semibold">{money(eff)}</span>
      </div>

      {/* rating UI up to you */}
    </Link>
  );
}
