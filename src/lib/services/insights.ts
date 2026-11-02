"use client";
import useSWR from "swr";
import {
  insightsResponseSchema,
  type Insight,
} from "@/src/schema/insight";
import { logger } from "../utils/logger";

/**
 * Fetches the list of dashboard insights from the API.
 */
const fetchInsights = async (url: string): Promise<Insight[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load insights");
  const data: unknown = await res.json();
  return insightsResponseSchema.parse(data);
};

/**
 * Loads the insight cards shown on the dashboard and exposes error/retry handling.
 */
export function useInsights() {
  const url = "/api/insights";
  const { data, error, isLoading, mutate } = useSWR<Insight[]>(
    url,
    fetchInsights,
    {
      onError: (requestError: unknown) => {
        logger.error(requestError, "Failed to load insights");
      },
    },
  );

  return {
    insights: data ?? [],
    isLoading,
    isError: Boolean(error),
    retry: () => void mutate(),
  };
}
