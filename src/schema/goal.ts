import { z } from "zod";

export const goalStatusSchema = z.enum(["on_track", "warning", "exceeded"]);

export const goalSchema = z.object({
  id: z.string().min(1),
  category: z.string().min(1),
  monthlyBudget: z.number().nonnegative(),
  currentSpent: z.number().nonnegative(),
  percentageUsed: z.number().nonnegative(),
  daysRemaining: z.number().int().nonnegative(),
  status: goalStatusSchema,
});

export const goalsResponseSchema = z.array(goalSchema);

export type GoalStatus = z.infer<typeof goalStatusSchema>;
export type Goal = z.infer<typeof goalSchema>;
