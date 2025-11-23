"use client";

import Link from "next/link";
import Image from "next/image";
import type { MouseEvent } from "react";
import type { Product } from "@/lib/types";
import { getUnitPrice } from "@/lib/format";
import { Price } from "@/components/product/Price";
import DiscountSticker from "@/components/product/DiscountSticker";
import { useAddToCart } from "@/hooks/useAddToCart";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useAddToCart();
  const unitPrice = getUnitPrice(product);

  function handleAdd(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // don't navigate when clicking the icon
    addToCart({
      id: product.id,
      title: product.title,
      imageUrl: product.image.url,
      unitPrice,
      qty: 1,
    });
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative block overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(min-width: 768px) 25vw, 100vw"
        />
      </div>

      {/* quick add icon */}
      <button
        type="button"
        onClick={handleAdd}
        aria-label="Add to cart"
        className="absolute right-2 top-2 rounded-full bg-white px-2 py-0.5 text-amber-900 opacity-60 transition group-hover:opacity-100"
        title="Add to cart"
      >
        +
      </button>

      {/* discount sticker overlay */}
      <DiscountSticker
        price={product.price}
        discountedPrice={product.discountedPrice}
        className="absolute left-2 top-2"
      />

      <div className="space-y-1 p-3">
        <h3 className="line-clamp-1 text-sm font-medium">{product.title}</h3>

        <div className="flex items-center gap-2 text-gray-900">
          <Price
            price={product.price}
            discountedPrice={product.discountedPrice}
          />
        </div>

        {/* tags  */}
        {product.tags?.length ? (
          <p className="mt-1 line-clamp-1 text-xs text-gray-500">
            {product.tags.slice(0, 3).join(" • ")}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
