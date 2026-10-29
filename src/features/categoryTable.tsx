import { formatCurrency } from "@/src/lib/utils/formatters";
import CategoryIcon from "./categoryIcon";
import type { Category } from "@/src/types/categoryTypes";

const transactionsLabel = (n: number) =>
  `${n} transaction${n === 1 ? "" : "s"}`;

/**
 * Responsive layout:
 *  - below `sm`: 2 columns. Name with "N transactions · 29.4%" underneath, amount on the right.
 *  - `sm` and up: 3 columns. Name | amount with transactions underneath | share.
 */
export default function CategoryTable({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <table className="w-full text-left">
      <caption className="sr-only">Spending by category</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Amount</th>
          <th scope="col">Share</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border-subtle">
        {categories.map((c) => (
          <tr key={c.name}>
            <td className="py-3 pr-3">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base"
                  style={{ backgroundColor: `${c.color}26`, color: c.color }}
                >
                  <CategoryIcon name={c.icon} />
                </span>
                <div>
                  <p className="text-sm font-medium text-secondary">{c.name}</p>
                  <p className="text-xs text-muted sm:hidden">
                    {transactionsLabel(c.transactionCount)} ·{" "}
                    {c.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            </td>

            <td className="whitespace-nowrap py-3 text-right sm:text-left">
              <p className="text-sm font-semibold text-primary">
                {formatCurrency(c.amount)}
              </p>
              <p className="hidden text-xs text-muted sm:block">
                {transactionsLabel(c.transactionCount)}
              </p>
            </td>

            <td className="hidden py-3 pl-3 text-right text-sm font-medium text-secondary sm:table-cell">
              {c.percentage.toFixed(1)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
