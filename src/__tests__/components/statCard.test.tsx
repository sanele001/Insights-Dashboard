import { render, screen } from "@testing-library/react";
import { FiDollarSign, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import StatCard from "@/src/components/dashboard/statCard";

describe("StatCard", () => {
  it("renders the value, title, and positive change styling", () => {
    render(
      <StatCard
        title="Revenue"
        value="R42,000"
        percentageChange={12.5}
        comparisonText="vs last month"
        Icon={FiDollarSign}
      />,
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("R42,000")).toBeInTheDocument();
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });

  it("renders a negative percentage change with a downward trending icon", () => {
    render(
      <StatCard
        title="Orders"
        value={326}
        percentageChange={-8}
        comparisonText="this week"
        Icon={FiTrendingDown}
      />,
    );

    expect(screen.getByText("Orders")).toBeTruthy;
    expect(screen.getByText("326")).toBeInTheDocument();
    expect(screen.getByText("-8%")).toBeInTheDocument();
    expect(screen.getByText("this week")).toBeInTheDocument();

    const changeBadge = screen.getByText("-8%").closest("span");
    expect(changeBadge).toHaveClass("text-rose-600");
    expect(changeBadge?.querySelector("svg")).toBeInTheDocument();
  });

  it("renders only the comparison text when no percentage change is provided", () => {
    render(
      <StatCard
        title="New users"
        value={1200}
        comparisonText="up from last quarter"
        Icon={FiTrendingUp}
      />,
    );

    expect(screen.getByText("New users")).toBeInTheDocument();
    expect(screen.getByText("1200")).toBeInTheDocument();
    expect(screen.getByText("up from last quarter")).toBeInTheDocument();
  });
});
