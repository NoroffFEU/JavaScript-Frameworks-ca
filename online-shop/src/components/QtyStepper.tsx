"use client";

type Props = {
  value: number;
  min?: number;
  onChange: (v: number) => void;
};

export default function QtyStepper({ value, min = 1, onChange }: Props) {
  return (
    <div className="inline-flex items-center rounded-lg border">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="px-2 py-1"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        className="w-12 border-x px-2 py-1 text-center outline-none"
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value.replace(/\D/g, "")) || min;
          onChange(Math.max(min, n));
        }}
        inputMode="numeric"
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="px-2 py-1"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
