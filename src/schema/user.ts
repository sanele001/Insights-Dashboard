import { z } from "zod";

export const userSchema = z.object({
  customerId: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  joinDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be in YYYY-MM-DD format"),
  accountType: z.enum(["savings", "premium", "business"]),
  totalSpent: z.number().nonnegative("Total spent cannot be negative"),
  currency: z.string().length(3, "Currency must be a 3-letter ISO code"),
});

export type User = z.infer<typeof userSchema>;
