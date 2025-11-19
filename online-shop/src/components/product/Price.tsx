import { money } from "@/lib/format";

type Props = {
  price: number;
  discountedPrice: number;
  className?: string;
};

export function Price({ price, discountedPrice, className }: Props) {
  const hasDiscount = discountedPrice < price;

  if (!hasDiscount) {
    return <span className={className}>{money(price!)}</span>;
  }

  return (
    <span className={className}>
      <span className="font-semibold text-red-500">
        {money(discountedPrice)}
      </span>{" "}
      <span className="text-xs text-gray-500 line-through">{money(price)}</span>
    </span>
  );
}
