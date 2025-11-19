"use client";

type DiscountStickerProps = {
  /** Original price before discount */
  price: number;
  /** Discounted price (must be lower than price to show sticker) */
  discountedPrice: number;
  /** Extra classes for positioning, etc. (e.g. "absolute left-2 top-2") */
  className?: string;
};

export default function DiscountSticker({
  price,
  discountedPrice,
  className = "",
}: DiscountStickerProps) {
  // If no real discount, render nothing
  if (!price || discountedPrice >= price) {
    return null;
  }

  const percentage = Math.round(((price - discountedPrice) / price) * 100);

  return (
    <span
      className={`rounded bg-red-500 px-2 py-0.5 text-xs font-semibold text-white ${className}`}
    >
      -{percentage}%
    </span>
  );
}
