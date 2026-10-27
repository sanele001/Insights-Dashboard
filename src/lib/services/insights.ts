"use client";
import useSWR from "swr";
import type { Insight } from "@/src/types/insightTypes";
import { logger } from "../utils/logger";

const fetchInsights = async (url: string): Promise<Insight[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load insights");
  return await res.json();
};

export function useInsights() {
  const url = "/api/insights";
  const { data, error, isLoading, mutate } = useSWR<Insight[]>(
    url,
    fetchInsights,
    {
      onError: (requestError: unknown) => {
        logger.error(requestError, "Failed to load fetch goals");
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
