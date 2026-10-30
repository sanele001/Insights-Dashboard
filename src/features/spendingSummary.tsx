/**
 * Displays a spending overview with four key financial metrics.
 *
 * - Shows total spending, transaction count, average transaction, and top category.
 * - Uses sample data defined in the component; it accepts no props.
 * - Renders spending and transaction changes against the previous period.
 * - Maintains no local state; the summary grid adapts from two to four columns.
 */
import SpendingSummaryGrid from "@/src/components/layout/spendingSummaryGrid";
import StatCard from "@/src/components/dashboard/statCard";
import {
  FaWallet,
  FaExchangeAlt,
  FaChartLine,
  FaShoppingCart,
} from "react-icons/fa";
import { getSummary } from "@/src/lib/services/spendingSummary";

export default function SpendingSummary() {
  const Mock = getSummary();

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <SpendingSummaryGrid>
        <StatCard
          title="Total Spent"
          value={Mock.totalSpent}
          percentageChange={Mock.comparedToPrevious.spentChange}
          comparisonText={`vs previous ${Mock.period}`}
          Icon={FaWallet}
        />
        <StatCard
          title="Transactions"
          value={Mock.transactionCount}
          percentageChange={Mock.comparedToPrevious.transactionChange}
          comparisonText={`vs previous ${Mock.period}`}
          Icon={FaExchangeAlt}
        />
        <StatCard
          title="Average Transaction"
          value={Mock.averageTransaction}
          Icon={FaChartLine}
        />
        <StatCard
          title="Top Category"
          value={Mock.topCategory}
          Icon={FaShoppingCart}
        />
      </SpendingSummaryGrid>
    </div>
  );
}
