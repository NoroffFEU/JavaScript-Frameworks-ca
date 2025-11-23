import { getProduct } from "@/lib/api";
import Image from "next/image";
import { money } from "@/lib/format";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { notFound } from "next/navigation";
import RatingStars from "@/components/product/RatingStars";

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

    const reviewCount = product.reviews?.length ?? 0;

    return (
      <main className="mx-auto max-w-4xl p-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>

        {/* ⭐ Rating + review count  +clickable */}
        <div className="mt-1 flex items-center gap-2">
          <RatingStars rating={product.rating} className="text-amber-500" />
          <a
            href="#reviews"
            className="text-xs text-gray-700 underline-offset-2 hover:underline"
          >
            {product.rating.toFixed(1)} / 5 · {reviewCount} review
            {reviewCount === 1 ? "" : "s"}
          </a>
        </div>

        {/* Price */}
        <div className="mt-3 text-lg">
          {product.discountedPrice < product.price ? (
            <>
              <span className="font-semibold text-red-500">
                {money(product.discountedPrice)}
              </span>{" "}
              <span className="px-2 text-gray-500 line-through">
                {money(product.price)}
              </span>
            </>
          ) : (
            <span className="font-semibold">{money(product.price)}</span>
          )}
        </div>

        {/* Image in frame */}
        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-md">
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

        {/* Description */}
        <p className="mt-6 text-gray-900">{product.description}</p>

        {/* Add to cart */}
        <div className="mt-4">
          <AddToCartButton
            id={product.id}
            title={product.title}
            imageUrl={product.image.url}
            unitPrice={unitPrice}
          />
        </div>

        {/* Reviews list */}
        {reviewCount > 0 && (
          <section id="reviews" className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold">Reviews ({reviewCount})</h2>

            {product.reviews!.map((r) => (
              <article
                key={r.id}
                className="rounded-lg border border-gray-200 bg-white p-3 text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{r.username}</p>
                  <RatingStars rating={r.rating} className="text-amber-500" />
                </div>
                {r.description && (
                  <p className="mt-1 whitespace-pre-line text-gray-700">
                    {r.description}
                  </p>
                )}
              </article>
            ))}
          </section>
        )}
      </main>
    );
  } catch (e: unknown) {
    // If the API says not found, show 404
    if (e instanceof Error && e.message.includes("API 404")) return notFound();
    throw e;
  }
}
