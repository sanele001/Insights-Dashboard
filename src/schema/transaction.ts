import { z } from "zod";

export const transactionSchema = z.object({
  id: z.string().min(1),
  date: z.iso.datetime(),
  merchant: z.string().min(1),
  category: z.string().min(1),
  amount: z.number().nonnegative(),
  description: z.string(),
  paymentMethod: z.string().min(1),
  icon: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  categoryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

export const transactionTemplatesSchema = z.array(transactionSchema).min(1);

export const paginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  offset: z.number().int().nonnegative(),
  hasMore: z.boolean(),
});

export const transactionsResponseSchema = z.object({
  transactions: z.array(transactionSchema),
  pagination: paginationMetaSchema,
});

export type Transaction = z.infer<typeof transactionSchema>;
export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
export type TransactionsResponse = z.infer<typeof transactionsResponseSchema>;
