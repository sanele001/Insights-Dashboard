export type GoalStatus = "on_track" | "warning" | "exceeded";

export type Goal = {
  id: string;
  category: string;
  monthlyBudget: number;
  currentSpent: number;
  percentageUsed: number;
  daysRemaining: number;
  status: GoalStatus;
};
