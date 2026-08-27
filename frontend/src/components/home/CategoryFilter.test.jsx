import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CategoryFilter from "./CategoryFilter.jsx";

describe("CategoryFilter", () => {
  it("changes the selected category when a category is clicked", () => {
    render(<CategoryFilter />);

    const reactCategory = screen.xxgetByRole("button", {
      name: "React",
    });

    fireEvent.click(reactCategory);

    expect(reactCategory).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});