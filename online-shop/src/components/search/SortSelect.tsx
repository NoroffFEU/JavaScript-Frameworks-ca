"use client";

export type SortValue =
  | ""
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

type Props = {
  value: SortValue;
  onChange: (v: SortValue) => void;
};

export default function SortSelect({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-gray-800">Sort:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortValue)}
        className="rounded-md border border-gray-300 px-2 py-2 text-sm"
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="name-asc">Name: A → Z</option>
        <option value="name-desc">Name: Z → A</option>
      </select>
    </label>
  );
}
