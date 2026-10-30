/**
 * Renders recent transactions in a responsive table for desktop and a stacked list for mobile.
 *
 * Responsive layout:
 *  - `md` and up: a real table (Date | Merchant | Category | Payment Method | Amount)
 *  - below `md`: a stacked list. Merchant + "Category · date" on the left,
 *    amount + payment method on the right.
 */

import CategoryIcon from "@/src/features/categoryIcon";
import { formatCurrency, formatDate } from "@/src/lib/utils/formatters";
import type { Transaction } from "@/src/types/transactionTypes";

function CategoryBadge({ t, size }: { t: Transaction; size: "sm" | "md" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-lg ${
        size === "sm" ? "h-6 w-6 text-xs" : "h-9 w-9 text-base"
      }`}
      style={{
        backgroundColor: `${t.categoryColor}26`,
        color: t.categoryColor,
      }}
    >
      <CategoryIcon name={t.icon} />
    </span>
  );
}

export default function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  if (transactions.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted">
        No transactions found.
      </p>
    );
  }

  return (
    <>
      <table className="hidden w-full text-left md:table">
        <caption className="sr-only">Recent transactions</caption>
        <thead>
          <tr className="border-b border-border-subtle text-xs text-muted">
            <th scope="col" className="py-3 pr-3 font-medium">
              Date
            </th>
            <th scope="col" className="py-3 pr-3 font-medium">
              Merchant
            </th>
            <th scope="col" className="py-3 pr-3 font-medium">
              Category
            </th>
            <th scope="col" className="py-3 pr-3 font-medium">
              Payment Method
            </th>
            <th scope="col" className="py-3 text-right font-medium">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="whitespace-nowrap py-3 pr-3 text-sm text-muted">
                {formatDate(t.date)}
              </td>
              <td className="py-3 pr-3 text-sm font-medium text-secondary">
                {t.merchant}
              </td>
              <td className="py-3 pr-3">
                <span className="flex items-center gap-2 text-sm text-secondary">
                  <CategoryBadge t={t} size="sm" />
                  {t.category}
                </span>
              </td>
              <td className="whitespace-nowrap py-3 pr-3 text-sm text-muted">
                {t.paymentMethod}
              </td>
              <td className="whitespace-nowrap py-3 text-right text-sm font-semibold text-primary">
                {formatCurrency(t.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* List: below md */}
      <ul className="divide-y divide-border-subtle md:hidden">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex items-start justify-between gap-3 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <CategoryBadge t={t} size="md" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-secondary">
                  {t.merchant}
                </p>
                <p className="text-xs text-muted">
                  {t.category} · {formatDate(t.date)}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-primary">
                {formatCurrency(t.amount)}
              </p>
              <p className="text-xs text-muted">{t.paymentMethod}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
