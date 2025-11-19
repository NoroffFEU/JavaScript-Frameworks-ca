import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  if (!products?.length) {
    return <p className="text-center text-gray-900">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
