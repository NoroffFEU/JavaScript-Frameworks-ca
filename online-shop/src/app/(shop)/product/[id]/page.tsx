/* eslint-disable react-hooks/error-boundaries */
import { getProduct } from "@/lib/api";
import Image from "next/image";
import { money } from "@/lib/format";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { notFound } from "next/navigation";

type PageParams = { id?: string };
type PageProps = { params: Promise<PageParams> };

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  if (!id) return notFound();

  try {
    const product = await getProduct(id);

    const unitPrice =
      product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;

    return (
      <main className="mx-auto max-w-4xl p-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>

        <div className="mt-3 text-lg">
          {product.discountedPrice < product.price ? (
            <>
              <span className="font-semibold text-red-500">
                {money(product.discountedPrice)}
              </span>{" "}
              <span className="text-gray-500 line-through px-2">
                {money(product.price)}
              </span>
            </>
          ) : (
            <span className="font-semibold">{money(product.price)}</span>
          )}
        </div>

        <div className="mt-4 overflow-hidden rounded-lg  bg-white-100 shadow-md">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={product.image.url}
              alt={product.image.alt}
              fill
              className="object-contain"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>

        <p className="m-6 text-gray-900">{product.description}</p>

        <AddToCartButton
          id={product.id}
          title={product.title}
          imageUrl={product.image.url}
          unitPrice={unitPrice}
        />
      </main>
    );
  } catch (e: unknown) {
    // If the API says not found, show 404
    if (e instanceof Error && e.message.includes("API 404")) return notFound();
    throw e;
  }
}
