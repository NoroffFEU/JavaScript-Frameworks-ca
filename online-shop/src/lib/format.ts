import type { Product } from "./types";

export function effectivePrice(p: Product) {
  return p.discountedPrice < p.price ? p.discountedPrice : p.price;
}

export function discountPercent(p: Product) {
  if (p.price <= 0) return 0;
  if (p.discountedPrice >= p.price) return 0;
  return Math.round(((p.price - p.discountedPrice) / p.price) * 100);
}

export function money(n: number, locale = "en-US", currency = "USD") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    n
  );
}

export function getUnitPrice(product: Product) {
  return product.discountedPrice < product.price
    ? product.discountedPrice
    : product.price;
}
