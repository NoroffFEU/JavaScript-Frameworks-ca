import { getProduct } from "@/lib/api";
import { effectivePrice, money, discountPercent } from "@/lib/format";
import Image from "next/image";
import RatingStars from "@/components/RatingStars";
import AddToCartButton from "@/components/AddToCartButton";

type PageProps = { params: { id: string } };

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.id);
  const eff = effectivePrice(product);
  const pct = discountPercent(product);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-xl border">
            <Image
              src={product.image.url}
              alt={product.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {pct > 0 && (
              <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-xs text-white">
                -{pct}%
              </span>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>

          <div className="mt-2 flex items-center gap-3">
            <RatingStars rating={product.rating ?? 0} />
            <span className="text-sm text-gray-500">
              {product.rating ?? 0}/5
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {product.discountedPrice < product.price && (
              <span className="text-gray-500 line-through">
                {money(product.price)}
              </span>
            )}
            <span className="text-xl font-bold">{money(eff)}</span>
          </div>

          <p className="mt-4 text-gray-700">{product.description}</p>

          {product.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs"
                >
                  #{t}
                </span>
              ))}
            </div>
          ) : null}

          <AddToCartButton
            id={product.id}
            title={product.title}
            imageUrl={product.image.url}
            unitPrice={eff}
          />
        </div>
      </div>

      {product.reviews?.length ? (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Reviews</h2>
          <ul className="space-y-4">
            {product.reviews.map((r) => (
              <li key={r.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{r.username}</p>
                  <RatingStars rating={r.rating} />
                </div>
                {r.description ? (
                  <p className="mt-2 text-gray-700">{r.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
