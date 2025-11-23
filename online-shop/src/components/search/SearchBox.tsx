"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { Product } from "@/lib/types";
import { matchesProductQuery } from "@/lib/search";
import { getUnitPrice, money } from "@/lib/format";

type Props = {
  products: Product[];
  onQueryChange?: (q: string) => void;
};

export default function SearchBox({ products, onQueryChange }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // debounce external query callback
  useEffect(() => {
    const id = setTimeout(() => onQueryChange?.(query), 200);
    return () => clearTimeout(id);
  }, [query, onQueryChange]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((p) => matchesProductQuery(p, query)).slice(0, 8);
  }, [products, query]);

  const hasResults = open && results.length > 0;
  const listId = "search-results";

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder="Search products…"
        className="w-full rounded-md border border-gray-300 px-3 py-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label="Search products"
        role="combobox"
        aria-expanded={hasResults}
        aria-controls={hasResults ? listId : undefined}
      />

      {hasResults && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 z-10 mt-1 max-h-72 overflow-auto rounded-md border bg-white shadow"
        >
          {results.map((p) => {
            const unitPrice = getUnitPrice(p);
            return (
              <li key={p.id} role="option" aria-selected="false">
                <Link
                  href={`/product/${p.id}`}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                  onClick={() => setQuery("")}
                >
                  {/* Thumbnail */}
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={p.image.url}
                      alt={p.image.alt}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>

                  {/* Title + price */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm">{p.title}</span>
                    <span className="text-xs text-gray-500">
                      {money(unitPrice)}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
