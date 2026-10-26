"use client";

import type { Category } from "@/src/types/categoryTypes";
import type { MonthlyPoint } from "@/src/types/trendTypes";
import useSWR from "swr";

type CategoriesResponse = {
  categories: Category[];
  monthlySpending: MonthlyPoint[];
};

const fetchCategories = async (): Promise<CategoriesResponse> => {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to load categories");
  return (await res.json()) as CategoriesResponse;
};

export function useCategories() {
  const { data, error, isLoading } = useSWR<CategoriesResponse>(
    "/api/categories",
    fetchCategories,
  );

  return {
    categories: data?.categories ?? [],
    monthlySpending: data?.monthlySpending ?? [],
    isLoading,
    isError: error,
  };
}
