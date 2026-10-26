"use client";

import { useCategories } from "@/src/lib/services/category";
import SpendingByCategory from "@/src/features/spendingByCategory";
import MonthlyTrends from "@/src/features/monthlyTrends";
import { useDashboardFilters } from "@/src/context/filters/dashboardFilters";

export default function CategoryMonthlySpending() {
  const { filters } = useDashboardFilters();
  const { categories, monthlySpending, isLoading, isError } =
    useCategories(filters);

  return (
    <div
      className="grid grid-cols-1 gap-6 2xl:grid-cols-2"
      aria-busy={isLoading}
    >
      {isError ? (
        <p className="col-span-full rounded-2xl bg-white p-6 text-sm text-red-600 shadow-sm">
          Couldn&apos;t load category and monthly spending data.
        </p>
      ) : isLoading ? (
        <>
          <div
            className="min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-6"
            aria-label="Loading category spending"
          >
            <span className="sr-only">Loading category spending…</span>
            <div className="mb-6 h-6 w-48 animate-pulse rounded bg-slate-100" />
            <div className="flex flex-col gap-6 md:flex-row md:items-center 2xl:flex-col">
              <div className="mx-auto h-40 w-40 animate-pulse rounded-full bg-slate-100" />
              <div className="min-w-0 flex-1 space-y-3">
                {Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="h-8 animate-pulse rounded bg-slate-100"
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className="min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-6"
            aria-label="Loading monthly spending trends"
          >
            <span className="sr-only">Loading monthly spending trends…</span>
            <div className="mb-6 h-6 w-56 animate-pulse rounded bg-slate-100" />
            <div className="h-56 animate-pulse rounded-lg bg-slate-100" />
          </div>
        </>
      ) : (
        <>
          <SpendingByCategory categories={categories} />
          <MonthlyTrends data={monthlySpending} />
        </>
      )}
    </div>
  );
}
