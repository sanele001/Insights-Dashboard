"use client";
import Link from "next/link";
import { FaArrowRight, FaLightbulb } from "react-icons/fa";
import InsightCard from "@/src/components/dashboard/insightCard";
import { useInsights } from "@/src/lib/services/insights";
import type { Insight } from "@/src/types/insightTypes";

export default function SpendingInsights() {
  const { insights } = useInsights();
  return (
    <section className="min-w-0 rounded-2xl bg-surface p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-lg font-bold text-primary">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
            <FaLightbulb aria-hidden />
          </span>
          Spending Insights
        </h2>
      </div>

      {insights.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted">
          No insights yet. Check back after a few more transactions.
        </p>
      ) : (
        <div className="space-y-3">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </section>
  );
}
