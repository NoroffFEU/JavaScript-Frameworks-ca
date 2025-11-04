import { listProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export default async function Page() {
  const products = await listProducts(); // typed: Product[]
  return <ProductGrid products={products} />;
}
