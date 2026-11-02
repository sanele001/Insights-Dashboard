import { z } from "zod";

export const insightSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

export const insightsResponseSchema = z.array(insightSchema);

export type Insight = z.infer<typeof insightSchema>;
