"use client";
import useSWR from "swr";
import type { Goal } from "@/src/types/goalTypes";
import { logger } from "../utils/logger";

/**
 * Fetches the list of spending goals from the API.
 */
const fetchGoals = async (url: string): Promise<Goal[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load goals");
  return await res.json();
};

/**
 * Loads the current spending goals and exposes retry support for refreshes.
 */
export function useFetchGoals() {
  const url = "/api/goals";
  const { data, error, isLoading, mutate } = useSWR<Goal[]>(url, fetchGoals, {
    onError: (requestError: unknown) => {
      logger.error(requestError, "Failed to load fetch goals");
    },
  });

  return {
    goals: data ?? [],
    isLoading,
    isError: Boolean(error),
    retry: () => void mutate(),
  };
}
