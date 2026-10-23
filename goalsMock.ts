// Temporary data. Replace with your API response.
import type { Goal } from "@/src/features/spendingGoals/goalTypes";

export const goals: Goal[] = [
  {
    id: "goal_001",
    category: "Entertainment",
    monthlyBudget: 1000.0,
    currentSpent: 650.3,
    percentageUsed: 65.03,
    daysRemaining: 12,
    status: "on_track",
  },
  {
    id: "goal_002",
    category: "Groceries",
    monthlyBudget: 1500.0,
    currentSpent: 1450.8,
    percentageUsed: 96.72,
    daysRemaining: 12,
    status: "warning",
  },
];
