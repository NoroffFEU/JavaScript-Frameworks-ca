import type { ApiItemResponse, ApiListResponse, Product } from "./types";

const BASE_URL = "https://v2.api.noroff.dev/online-shop";

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, cache: "no-store" });

  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
    } catch {
      // ignore body read errors
    }

    //  terminal / server logs
    console.error("API ERROR", { url, status: res.status, body });
    throw new Error(`API ${res.status} for ${url}`);
  }

  return res.json() as Promise<T>;
}

export async function listProducts(): Promise<Product[]> {
  const json = await getJson<ApiListResponse<Product>>(BASE_URL);
  return json.data; // return just the array
}

export async function getProduct(id: string): Promise<Product> {
  const json = await getJson<ApiItemResponse<Product>>(`${BASE_URL}/${id}`);
  return json.data; // return the Product
}
