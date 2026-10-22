import SpendingSummary from "@/src/features/spendingSummary";
import { render, screen } from "@testing-library/react";

describe("SpendingSummary", () => {
  it("mounts and displays the heading", () => {
    render(<SpendingSummary />);

    expect(
      screen.getByRole("heading", { name: "Spending Summary" }),
    ).toBeInTheDocument();
  });

  it("renders four stat cards", () => {
    const { container } = render(<SpendingSummary />);

    expect(container.querySelector(".grid")?.children).toHaveLength(4);
  });
});
