type Props = {
  rating: number;
  outOf?: number;
  className?: string;
};

export default function RatingStars({ rating, outOf = 5, className }: Props) {
  const full = Math.max(0, Math.min(outOf, Math.round(rating)));

  return (
    <div className={className}>
      {/* Screen reader text */}
      <span className="sr-only">
        Rated {rating.toFixed(1)} out of {outOf}
      </span>

      {/* Visual stars only, hidden from screen reader */}
      <div aria-hidden="true">
        {Array.from({ length: outOf }).map((_, i) => (
          <span
            key={i}
            className={i < full ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
