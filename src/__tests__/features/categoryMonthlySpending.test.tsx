import { render, screen } from "@testing-library/react";
import CategoryMonthlySpending from "@/src/features/categoryMonthlySpending";
import {
  DashboardFiltersProvider,
  DEFAULT_FILTERS,
} from "@/src/context/filters/dashboardFilters";
import { useCategories } from "@/src/lib/services/category";
import type { Category } from "@/src/types/categoryTypes";
import type { MonthlyPoint } from "@/src/types/trendTypes";

jest.mock("../../lib/services/category", () => ({
  useCategories: jest.fn(),
}));

const mockedUseCategories = jest.mocked(useCategories);

const categories: Category[] = [
  {
    name: "Groceries",
    amount: 1250.3,
    percentage: 29.4,
    transactionCount: 15,
    color: "#FF6B6B",
    icon: "shopping-cart",
  },
];

const monthlySpending: MonthlyPoint[] = [
  { month: "Jun 2024", amount: 4250.75 },
];

function renderComponent() {
  return render(
    <DashboardFiltersProvider>
      <CategoryMonthlySpending />
    </DashboardFiltersProvider>,
  );
}

describe("CategoryMonthlySpending", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading skeletons and marks the content busy", () => {
    mockedUseCategories.mockReturnValue({
      categories: [],
      monthlySpending: [],
      isLoading: true,
      isError: false,
    });

    const { container } = renderComponent();

    expect(screen.getByText("Loading category spending…")).toBeInTheDocument();
    expect(
      screen.getByText("Loading monthly spending trends…"),
    ).toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute("aria-busy", "true");
    expect(mockedUseCategories).toHaveBeenCalledWith(DEFAULT_FILTERS);
  });

  it("shows an error message when the data request fails", () => {
    mockedUseCategories.mockReturnValue({
      categories: [],
      monthlySpending: [],
      isLoading: false,
      isError: true,
    });

    renderComponent();

    expect(
      screen.getByText("Couldn't load category and monthly spending data."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Loading category spending…"),
    ).not.toBeInTheDocument();
  });

  it("renders category and monthly trend views after data loads", () => {
    mockedUseCategories.mockReturnValue({
      categories,
      monthlySpending,
      isLoading: false,
      isError: false,
    });

    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Spending by Category" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Monthly Spending Trends" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByLabelText("Select time period")).toBeInTheDocument();
    expect(mockedUseCategories).toHaveBeenCalledWith(DEFAULT_FILTERS);
  });
});