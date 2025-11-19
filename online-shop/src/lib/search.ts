import type { Product } from "./types";

export function matchesProductQuery(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const title = (product.title ?? "").toLowerCase();
  const tags = (product.tags ?? []).map((t) => t.toLowerCase());

  return title.includes(q) || tags.some((t) => t.includes(q));
}
