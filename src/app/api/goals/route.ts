import type { Goal } from "@/src/types/goalTypes";

export async function GET(_request: Request) {
  return new Response(JSON.stringify(goals), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

const goals: Goal[] = [
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
