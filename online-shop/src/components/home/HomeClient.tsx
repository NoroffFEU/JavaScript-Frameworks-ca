"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";

import ProductGrid from "@/components/product/ProductGrid";
import SearchBox from "@/components/search/SearchBox";
import SortSelect, { type SortValue } from "@/components/search/SortSelect";
import { getUnitPrice } from "@/lib/format";
import { matchesProductQuery } from "@/lib/search";

type Props = { products: Product[] };

export default function HomeClient({ products }: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortValue>("");

  const filteredSorted = useMemo(() => {
    // 1) Filter by query
    const list =
      query.trim() === ""
        ? [...products]
        : products.filter((p) => matchesProductQuery(p, query));

    // 2) Sort by effective price or name
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => getUnitPrice(a) - getUnitPrice(b));
        break;
      case "price-desc":
        list.sort((a, b) => getUnitPrice(b) - getUnitPrice(a));
        break;
      case "name-asc":
        list.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
        break;
      case "name-desc":
        list.sort((a, b) => (b.title ?? "").localeCompare(a.title ?? ""));
        break;
    }

    return list;
  }, [products, query, sort]);

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <SearchBox products={products} onQueryChange={setQuery} />
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <ProductGrid products={filteredSorted} />
    </section>
  );
}
