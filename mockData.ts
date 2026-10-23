// Temporary data. Replace with your API response.
import type { Category } from "@/src/features/spendingByCategory/categoryTypes";
import type { MonthlyPoint } from "@/src/features/monthlyTrends/trendTypes";

export const categories: Category[] = [
  { name: "Groceries", amount: 1250.3, percentage: 29.4, transactionCount: 15, color: "#FF6B6B", icon: "shopping-cart" },
  { name: "Entertainment", amount: 890.2, percentage: 20.9, transactionCount: 8, color: "#4ECDC4", icon: "film" },
  { name: "Transportation", amount: 680.45, percentage: 16.0, transactionCount: 12, color: "#45B7D1", icon: "car" },
  { name: "Dining", amount: 520.3, percentage: 12.2, transactionCount: 9, color: "#FFC048", icon: "utensils" },
  { name: "Shopping", amount: 450.8, percentage: 10.6, transactionCount: 6, color: "#A66CDB", icon: "shopping-bag" },
  { name: "Utilities", amount: 458.7, percentage: 10.8, transactionCount: 3, color: "#6FB6FF", icon: "tint" },
];

export const monthlySpending: MonthlyPoint[] = [
  { month: "Jul 2023", amount: 3700.4 },
  { month: "Aug 2023", amount: 3810.9 },
  { month: "Sep 2023", amount: 3760.2 },
  { month: "Oct 2023", amount: 3950.7 },
  { month: "Nov 2023", amount: 4120.3 },
  { month: "Dec 2023", amount: 4180.5 },
  { month: "Jan 2024", amount: 3890.25 },
  { month: "Feb 2024", amount: 3980.1 },
  { month: "Mar 2024", amount: 3920.4 },
  { month: "Apr 2024", amount: 4100.6 },
  { month: "May 2024", amount: 4020.3 },
  { month: "Jun 2024", amount: 4250.75 },
];
