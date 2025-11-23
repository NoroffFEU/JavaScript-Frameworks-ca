import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Price } from "./Price";
import { money } from "@/lib/format";

describe("Price", () => {
  it("shows discounted and original price when discountedPrice is lower", () => {
    render(<Price price={100} discountedPrice={80} />);

    expect(screen.getByText(money(80))).toBeInTheDocument();

    const original = screen.getByText(money(100));
    expect(original).toBeInTheDocument();
    expect(original.className).toMatch(/line-through/);
  });

  it("shows only the normal price when there is no discount", () => {
    render(<Price price={100} discountedPrice={80} />);

    expect(screen.getByText(money(100))).toBeInTheDocument();
  });
});
