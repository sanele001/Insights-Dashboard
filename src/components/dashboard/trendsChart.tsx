"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/src/lib/utils/formatters";
import type { MonthlyPoint } from "@/src/types/trendTypes";

const shortMonth = (label: string) => label.split(" ")[0]; // "Jan 2024" -> "Jan"
const formatTick = (v: number) => (v === 0 ? "R 0" : `R ${v / 1000}k`);

export default function TrendsChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <div
      role="img"
      aria-label="Bar chart of monthly spending"
      className="h-56 w-full sm:h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid
            vertical={false}
            stroke="#e2e8f0"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="month"
            tickFormatter={shortMonth}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={4}
            tick={{ fontSize: 12, fill: "#64748b" }}
          />
          <YAxis
            width={48}
            tickFormatter={formatTick}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#64748b" }}
          />
          <Tooltip
            cursor={{ fill: "#f1f5f9" }}
            formatter={(v) => [formatCurrency(Number(v)), "Spent"]}
          />
          <Bar
            dataKey="amount"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
