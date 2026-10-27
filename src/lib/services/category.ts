"use client";

import type { Category } from "@/src/types/categoryTypes";
import type { MonthlyPoint } from "@/src/types/trendTypes";
import type { DashboardFilters } from "@/src/context/filters/dashboardFilters";
import { logger } from "@/src/lib/utils/logger";
import useSWR from "swr";

type CategoriesResponse = {
  categories: Category[];
  monthlySpending: MonthlyPoint[];
};

const fetchCategories = async (url: string): Promise<CategoriesResponse> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load categories");
  return (await res.json()) as CategoriesResponse;
};

export function useCategories(filters: DashboardFilters) {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  const query = params.toString();
  const url = query ? `/api/categories?${query}` : "/api/categories";

  const { data, error, isLoading, mutate } = useSWR<CategoriesResponse>(
    url,
    fetchCategories,
    {
      onError: (requestError: unknown) => {
        logger.error(requestError, "Failed to load category spending data");
      },
    },
  );

  return {
    categories: data?.categories ?? [],
    monthlySpending: data?.monthlySpending ?? [],
    isLoading,
    isError: Boolean(error),
    retry: () => void mutate(),
  };
}
