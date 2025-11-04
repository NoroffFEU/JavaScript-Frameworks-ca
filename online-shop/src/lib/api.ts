import type { ApiItemResponse, ApiListResponse, Product } from "./types";

const BASE = "https://v2.api.noroff.dev/online-shop";

// Small helper to unwrap JSON consistently
async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, cache: "no-store" });
  if (!res.ok) throw new Error(`API ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

export async function listProducts() {
  const json = await getJson<ApiListResponse<Product>>(BASE);
  return json.data; // return just the array for convenience
}

export async function getProduct(id: string) {
  const json = await getJson<ApiItemResponse<Product>>(`${BASE}/${id}`);
  return json.data; // return the Product
}
