"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Period } from "@/src/components/dashboard/periodSelector";

export type DashboardFilters = {
  range: Period;
  category: string | null; // null = all categories
};

export const DEFAULT_FILTERS: DashboardFilters = {
  range: "30d",
  category: null,
};

type FiltersContextValue = {
  filters: DashboardFilters;
  setFilters: (next: DashboardFilters) => void;
  setRange: (range: Period) => void;
  resetFilters: () => void;
};

const FiltersContext = createContext<FiltersContextValue | null>(null);

export function DashboardFiltersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<DashboardFilters>(DEFAULT_FILTERS);

  const value = useMemo<FiltersContextValue>(
    () => ({
      filters,
      setFilters,
      setRange: (range) => setFilters((f) => ({ ...f, range })),
      resetFilters: () => setFilters(DEFAULT_FILTERS),
    }),
    [filters],
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

export function useDashboardFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error(
      "useDashboardFilters must be used inside <DashboardFiltersProvider>",
    );
  }
  return ctx;
}
