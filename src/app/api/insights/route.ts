import type { Insight } from "@/src/types/insightTypes";
export async function GET(_request: Request) {
  return new Response(JSON.stringify(insights), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export const insights: Insight[] = [
  {
    id: "insight_001",
    title: "You spent 12.5% more",
    description:
      "Your spending increased by 12.5% compared to the previous 30 days.",
    icon: "arrow-up",
    color: "#22C55E",
  },
  {
    id: "insight_002",
    title: "Dining out is up",
    description: "Dining spending increased by 18.2% compared to last month.",
    icon: "utensils",
    color: "#A66CDB",
  },
  {
    id: "insight_003",
    title: "You're on track",
    description: "Your transportation spending is 12% below your budget.",
    icon: "car",
    color: "#3B82F6",
  },
  {
    id: "insight_004",
    title: "Groceries are close to limit",
    description:
      "You've used 96.7% of your groceries budget. Consider reducing spending.",
    icon: "exclamation-triangle",
    color: "#F59E0B",
  },
];
