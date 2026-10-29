"use client";

import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDashboardFilters } from "@/src/context/filters/dashboardFilters";
import CategorySelect from "./categorySelect";
import DateRangePills from "./dateRangePills";
import type { FiltersData } from "@/src/types/filterTypes";

export default function FiltersPanel({ data }: { data: FiltersData }) {
  const { filters, setFilters, resetFilters } = useDashboardFilters();

  // Draft values: nothing changes on the dashboard until "Apply Filters" is pressed
  const [draftRange, setDraftRange] = useState(filters.range);
  const [draftCategory, setDraftCategory] = useState(filters.category);

  // Stay in step when the applied filters change elsewhere (top bar selector, "Clear all")
  useEffect(() => {
    setDraftRange(filters.range);
    setDraftCategory(filters.category);
  }, [filters.range, filters.category]);

  return (
    <section className="min-w-0 rounded-2xl bg-surface p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-lg font-bold text-primary">
          <FaFilter aria-hidden className="h-4 w-4 text-secondary" />
          Filters
        </h2>
        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-semibold text-secondary">
            Date Range
          </p>
          <DateRangePills
            presets={data.dateRangePresets}
            value={draftRange}
            onChange={setDraftRange}
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-secondary">
            Categories
          </p>
          <CategorySelect
            categories={data.categories}
            value={draftCategory}
            onChange={setDraftCategory}
          />
        </div>

        <button
          type="button"
          onClick={() =>
            setFilters({ range: draftRange, category: draftCategory })
          }
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <FaFilter aria-hidden className="h-3.5 w-3.5" />
          Apply Filters
        </button>
      </div>
    </section>
  );
}
