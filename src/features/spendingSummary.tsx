import SpendingSummaryGrid from "@/src/components/layout/spendingSummaryGrid";
import StatCard from "@/src/components/dashboard/statCard";
import {
  FaWallet,
  FaExchangeAlt,
  FaChartLine,
  FaShoppingCart,
} from "react-icons/fa";

export default function SpendingSummary() {
  const Mock = {
    period: "30d",
    totalSpent: 4250.75,
    transactionCount: 47,
    averageTransaction: 90.44,
    topCategory: "Groceries",
    comparedToPrevious: {
      spentChange: 12.5,
      transactionChange: -3.2,
    },
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Spending Summary</h2>
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
