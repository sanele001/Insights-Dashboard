import { z } from "zod";

const iconSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const colorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/);

export const categorySchema = z.object({
  name: z.string().min(1),
  amount: z.number().nonnegative(),
  percentage: z.number().min(0).max(100),
  transactionCount: z.number().int().nonnegative(),
  color: colorSchema,
  icon: iconSchema,
});

export const monthlyPointSchema = z.object({
  month: z.string().min(1),
  amount: z.number().nonnegative(),
});

export const categoriesResponseSchema = z.object({
  categories: z.array(categorySchema),
  monthlySpending: z.array(monthlyPointSchema),
});

export const categoryQuerySchema = z.object({
  category: z.string().trim().min(1).optional(),
});

export type Category = z.infer<typeof categorySchema>;
export type MonthlyPoint = z.infer<typeof monthlyPointSchema>;
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;
