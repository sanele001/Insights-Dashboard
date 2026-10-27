"use client";

import { useState } from "react";
import PeriodSelector from "@/src/components/dashboard/periodSelector";
import TrendsChart from "@/src/components/dashboard/trendsChart";
import TrendsStats from "@/src/components/dashboard/trendsStats";
import type { MonthlyPoint } from "@/src/types/trendTypes";

const RANGE_OPTIONS = [
  { value: "3m", label: "Last 3 months" },
  { value: "6m", label: "Last 6 months" },
  { value: "12m", label: "Last 12 months" },
] as const;

type Range = (typeof RANGE_OPTIONS)[number]["value"];

const MONTHS: Record<Range, number> = { "3m": 3, "6m": 6, "12m": 12 };

export default function MonthlyTrends({ data }: { data: MonthlyPoint[] }) {
  const [range, setRange] = useState<Range>("6m");
  const visible = data.slice(-MONTHS[range]);

  return (
    <section className="min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Monthly Spending Trends
        </h2>
        <PeriodSelector
          value={range}
          onChange={setRange}
          options={RANGE_OPTIONS}
        />
      </div>

      <TrendsChart data={visible} />
      <TrendsStats data={visible} />
    </section>
  );
}
