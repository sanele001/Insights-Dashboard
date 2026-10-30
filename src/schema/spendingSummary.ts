import { z } from "zod";

export const spendingSummaryschema = z.object({
  period: z.string(),
  totalSpent: z.number().nonnegative("Total spent cannot be negative"),
  transactionCount: z
    .number()
    .nonnegative("transectionCount cannot be negative"),
  averageTransaction: z
    .number()
    .nonnegative("averageTransection cannot be negative"),
  topCategory: z.string(),
  comparedToPrevious: z.object({
    spentChange: z.number(),
    transactionChange: z.number(),
  }),
});

export type spendingSummry = z.infer<typeof spendingSummaryschema>;
