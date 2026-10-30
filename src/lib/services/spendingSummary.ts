import { spendingSummaryschema } from "@/src/schema/spendingSummary";
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

/**
 * Returns the mocked dashboard summary values used for the current spending overview.
 */
export function getSummary() {
  // mock url /api/customers/{customerId}/spending/summary?period={period}
  return spendingSummaryschema.parse(Mock);
}
