import { fireEvent, render, screen } from "@testing-library/react";
import FiltersPanel from "@/src/features/filtersPanel";
import {
  DashboardFiltersProvider,
  useDashboardFilters,
} from "@/src/context/filters/dashboardFilters";
import { filtersData } from "@/src/mockdata/filtersMock";

function AppliedFilters() {
  const { filters } = useDashboardFilters();
  return (
    <output aria-label="Applied filters">
      {filters.range}|{filters.category ?? "all"}
    </output>
  );
}

function renderFiltersPanel() {
  const scroll = jest.fn();

  return {
    scroll,
    ...render(
      <DashboardFiltersProvider>
        <FiltersPanel data={filtersData} scroll={scroll} />
        <AppliedFilters />
      </DashboardFiltersProvider>,
    ),
  };
}

describe("FiltersPanel", () => {
  it("renders date range and category filter controls", () => {
    renderFiltersPanel();

    expect(screen.getByRole("heading", { name: "Filters" })).toBeInTheDocument();
    expect(screen.getByRole("radiogroup", { name: "Date range" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Last 30 days" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("button", { name: "Filter by category" })).toHaveTextContent(
      "All categories",
    );
    expect(screen.getByRole("button", { name: "Apply Filters" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear all" })).toBeInTheDocument();
  });

  it("applies draft date range and category only when Apply Filters is pressed", () => {
    const { scroll } = renderFiltersPanel();

    fireEvent.click(screen.getByRole("radio", { name: "Last 7 days" }));
    fireEvent.click(screen.getByRole("button", { name: "Filter by category" }));
    fireEvent.click(screen.getByRole("option", { name: "Groceries" }));

    expect(screen.getByLabelText("Applied filters")).toHaveTextContent(
      "30d|all",
    );

    fireEvent.click(screen.getByRole("button", { name: "Apply Filters" }));

    expect(scroll).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Applied filters")).toHaveTextContent(
      "7d|Groceries",
    );
  });

  it("resets applied filters when Clear all is pressed", () => {
    renderFiltersPanel();

    fireEvent.click(screen.getByRole("radio", { name: "Last 90 days" }));
    fireEvent.click(screen.getByRole("button", { name: "Apply Filters" }));
    expect(screen.getByLabelText("Applied filters")).toHaveTextContent(
      "90d|all",
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));

    expect(screen.getByLabelText("Applied filters")).toHaveTextContent(
      "30d|all",
    );
    expect(screen.getByRole("radio", { name: "Last 30 days" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });
});