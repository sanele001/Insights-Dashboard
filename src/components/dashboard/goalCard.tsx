import { FaExclamationTriangle } from "react-icons/fa";
import CategoryIcon from "@/src/features/categoryIcon";
import { formatCurrency } from "@/src/lib/utils/formatters";
import { getCategoryStyle } from "@/src/tokens/categoryStyles";
import type { Goal, GoalStatus } from "@/src/types/goalTypes";

const STATUS_STYLES: Record<GoalStatus, { bar: string; text: string }> = {
  on_track: { bar: "bg-violet-500", text: "text-violet-600" },
  warning: { bar: "bg-rose-500", text: "text-rose-500" },
  exceeded: { bar: "bg-red-600", text: "text-red-600" },
};

export default function GoalCard({ goal }: { goal: Goal }) {
  const { icon, color } = getCategoryStyle(goal.category);
  const styles = STATUS_STYLES[goal.status];
  const remaining = goal.monthlyBudget - goal.currentSpent;
  const barWidth = Math.min(Math.max(goal.percentageUsed, 0), 100);

  return (
    <article className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg"
          style={{ backgroundColor: `${color}26`, color }}
        >
          <CategoryIcon name={icon} />
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900">
            {goal.category}
          </h3>
          <p className="text-xs text-slate-500">
            Monthly budget: {formatCurrency(goal.monthlyBudget)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-slate-900">
            {formatCurrency(goal.currentSpent)}
          </p>
          <p className="text-xs text-slate-500">spent</p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-semibold ${styles.text}`}>
            {goal.percentageUsed.toFixed(2)}%
          </p>
          <p className="text-xs text-slate-500">used</p>
        </div>
      </div>

      <div
        role="progressbar"
        aria-label={`${goal.category} budget used`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(barWidth)}
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className={`h-full rounded-full ${styles.bar}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span>
          {remaining >= 0
            ? `${formatCurrency(remaining)} remaining`
            : `${formatCurrency(-remaining)} over`}
        </span>

        {goal.status === "on_track" ? (
          <span>
            {goal.daysRemaining} day{goal.daysRemaining === 1 ? "" : "s"} left
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 font-medium text-red-600">
            <FaExclamationTriangle aria-hidden className="h-3 w-3" />
            {goal.status === "warning" ? "Nearing limit" : "Over budget"}
          </span>
        )}
      </div>
    </article>
  );
}
