"use client";

import { useCategories } from "@/src/lib/services/category";
import SpendingByCategory from "@/src/features/spendingByCategory";
import MonthlyTrends from "@/src/features/monthlyTrends";
import { useDashboardFilters } from "@/src/context/filters/dashboardFilters";

export default function CategoryMonthlySpending() {
  const { filters } = useDashboardFilters();
  const { categories, monthlySpending, isLoading, isError, retry } =
    useCategories(filters);

  return (
    <div
      className="grid grid-cols-1 gap-6 2xl:grid-cols-2"
      aria-busy={isLoading}
    >
      {isError ? (
        <div
          role="alert"
          className="col-span-full rounded-2xl bg-surface p-6 text-center text-sm text-red-600 shadow-sm"
        >
          <p>Couldn&apos;t load category and monthly spending data.</p>
          <button
            type="button"
            onClick={retry}
            className="mt-2 font-medium text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : isLoading ? (
        <>
          <div
            className="min-w-0 rounded-2xl bg-surface p-4 shadow-sm sm:p-6"
            aria-label="Loading category spending"
          >
            <span className="sr-only">Loading category spending…</span>
            <div className="mb-6 h-6 w-48 animate-pulse rounded bg-surface-muted" />
            <div className="flex flex-col gap-6 md:flex-row md:items-center 2xl:flex-col">
              <div className="mx-auto h-40 w-40 animate-pulse rounded-full bg-surface-muted" />
              <div className="min-w-0 flex-1 space-y-3">
                {Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="h-8 animate-pulse rounded bg-surface-muted"
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className="min-w-0 rounded-2xl bg-surface p-4 shadow-sm sm:p-6"
            aria-label="Loading monthly spending trends"
          >
            <span className="sr-only">Loading monthly spending trends…</span>
            <div className="mb-6 h-6 w-56 animate-pulse rounded bg-surface-muted" />
            <div className="h-56 animate-pulse rounded-lg bg-surface-muted" />
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
