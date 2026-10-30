"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/src/lib/utils/formatters";
import type { Category } from "@/src/types/categoryTypes";

const RADIAN = Math.PI / 180;

type CategoryChartProps = {
  categories: Category[];
  total: number;
};

export default function CategoryChart({
  categories,
  total,
}: CategoryChartProps) {
  // Percentage label drawn in the middle of each slice
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
        fontWeight={600}
      >
        {categories[index]?.percentage?.toFixed(1)}%
      </text>
    );
  };

  return (
    <div
      role="img"
      aria-label="Donut chart of spending by category"
      className="relative h-56 w-full md:w-60 md:shrink-0 2xl:w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categories}
            dataKey="amount"
            nameKey="name"
            innerRadius="62%"
            outerRadius="95%"
            paddingAngle={2}
            stroke="var(--surface)"
            strokeWidth={2}
            labelLine={false}
            label={renderLabel}
          >
            {categories.map((c) => (
              <Cell key={c.name} fill={c.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => formatCurrency(Number(v))} />
        </PieChart>
      </ResponsiveContainer>

      {/* Centre text */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-bold text-primary sm:text-lg">
          {formatCurrency(total)}
        </span>
        <span className="text-xs text-muted">Total Spent</span>
      </div>
    </div>
  );
}
