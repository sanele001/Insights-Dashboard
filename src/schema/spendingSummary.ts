import { z } from "zod";

export const spendingSummarySchema = z.object({
  period: z.string().min(1),
  totalSpent: z.number().nonnegative("Total spent cannot be negative"),
  transactionCount: z
    .number()
    .int()
    .nonnegative("Transaction count cannot be negative"),
  averageTransaction: z
    .number()
    .nonnegative("Average transaction cannot be negative"),
  topCategory: z.string().min(1),
  comparedToPrevious: z.object({
    spentChange: z.number(),
    transactionChange: z.number(),
  }),
});

export type SpendingSummaryData = z.infer<typeof spendingSummarySchema>;
