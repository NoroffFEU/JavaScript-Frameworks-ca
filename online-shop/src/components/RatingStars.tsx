type Props = { rating: number; outOf?: number; className?: string };

export default function RatingStars({ rating, outOf = 5, className }: Props) {
  const full = Math.max(0, Math.min(outOf, Math.round(rating)));
  return (
    <div className={className} aria-label={`Rating: ${full} out of ${outOf}`}>
      {Array.from({ length: outOf }).map((_, i) => (
        <span
          key={i}
          className={i < full ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}
