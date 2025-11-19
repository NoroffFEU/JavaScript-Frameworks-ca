"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Product } from "@/lib/types";
import { matchesProductQuery } from "@/lib/search";

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
        className="w-full rounded-md border  border-gray-300 px-3 py-2"
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
          className="absolute left-0 right-0 z-10 mt-1 max-h-72 overflow-auto rounded-md border  bg-white shadow"
        >
          {results.map((p) => (
            <li key={p.id} role="option">
              <Link
                href={`/product/${p.id}`}
                className="block px-3 py-2 hover:bg-gray-100"
                onClick={() => setQuery("")}
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
