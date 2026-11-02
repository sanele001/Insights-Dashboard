"use client";

import {
  categoriesResponseSchema,
  type CategoriesResponse,
} from "@/src/schema/category";
import type { DashboardFilters } from "@/src/context/filters/dashboardFilters";
import { logger } from "@/src/lib/utils/logger";
import useSWR from "swr";

/**
 * Fetches category spending and monthly trending data from the API.
 */
const fetchCategories = async (url: string): Promise<CategoriesResponse> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load categories");
  const data: unknown = await res.json();
  return categoriesResponseSchema.parse(data);
};

/**
 * Loads category-based spending data and optional monthly trend data for the active filters.
 */
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
