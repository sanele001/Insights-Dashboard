import SpendingSummary from "@/src/features/spendingSummary";
import { render, screen } from "@testing-library/react";

describe("SpendingSummary", () => {
  it("renders the finance summary cards", () => {
    render(<SpendingSummary />);

    expect(screen.getByText("Total Spent")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Average Transaction")).toBeInTheDocument();
    expect(screen.getByText("Top Category")).toBeInTheDocument();
  });

  it("renders four stat cards", () => {
    const { container } = render(<SpendingSummary />);

    expect(container.querySelector(".grid")?.children).toHaveLength(4);
  });
});
