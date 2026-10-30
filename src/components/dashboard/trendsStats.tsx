/**
 * Summarises the lowest, highest, and overall movement in monthly spending data.
 */
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { formatCurrency } from "@/src/lib/utils/formatters";
import type { MonthlyPoint } from "@/src/types/trendTypes";

const shortMonth = (label: string) => label.split(" ")[0];

export default function TrendsStats({ data }: { data: MonthlyPoint[] }) {
  if (data.length === 0) return null;

  const lowest = data.reduce((a, b) => (b.amount < a.amount ? b : a));
  const highest = data.reduce((a, b) => (b.amount > a.amount ? b : a));
  const first = data[0].amount;
  const last = data[data.length - 1].amount;
  const change = first === 0 ? 0 : ((last - first) / first) * 100;
  const up = change >= 0;

  return (
    <div className="mt-4 grid grid-cols-1 divide-y divide-border rounded-xl bg-surface-muted sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div className="p-3 sm:p-4">
        <p className="text-sm font-bold text-primary sm:text-base">
          {formatCurrency(lowest.amount)}
        </p>
        <p className="text-xs text-muted">
          Lowest ({shortMonth(lowest.month)})
        </p>
      </div>

      <div className="p-3 sm:p-4">
        <p className="text-sm font-bold text-primary sm:text-base">
          {formatCurrency(highest.amount)}
        </p>
        <p className="text-xs text-muted">
          Highest ({shortMonth(highest.month)})
        </p>
      </div>

      <div className="p-3 sm:p-4">
        <p
          className={`flex items-center gap-1.5 text-sm font-bold sm:text-base ${
            up ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {up ? (
            <FaArrowUp aria-hidden className="h-3 w-3" />
          ) : (
            <FaArrowDown aria-hidden className="h-3 w-3" />
          )}
          {up ? "+" : ""}
          {change.toFixed(1)}%
        </p>
        <p className="text-xs text-muted">
          Overall {up ? "increase" : "decrease"}
        </p>
      </div>
    </div>
  );
}
