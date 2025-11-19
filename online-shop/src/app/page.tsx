import { listProducts } from "@/lib/api";
import HomeClient from "@/components/home/HomeClient";

export default async function Page() {
  const products = await listProducts(); // Server fetch
  return <HomeClient products={products} />; // Client controls search + sort
}
