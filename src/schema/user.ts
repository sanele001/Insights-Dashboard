import { z } from "zod";

export const userSchema = z.object({
  customerId: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  joinDate: z.iso.date(),
  accountType: z.enum(["savings", "premium", "business"]),
  totalSpent: z.number().nonnegative("Total spent cannot be negative"),
  currency: z
    .string()
    .regex(/^[A-Z]{3}$/, "Currency must be a 3-letter ISO code"),
});

export const userIdSchema = z.string().min(1, "User ID is required");

export type User = z.infer<typeof userSchema>;
