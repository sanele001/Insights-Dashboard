import type {
  Transaction,
  TransactionsResponse,
} from "@/src/types/transactionTypes";

// ---------------------------------------------------------------------------
// MOCK API. 47 generated transactions, served in pages like your real endpoint.
// To go live, replace the body of fetchTransactions with something like:
//
//   const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
//   if (category) params.set("category", category);
//   if (range) params.set("range", range);
//   const res = await fetch(`/api/transactions?${params}`);
//   if (!res.ok) throw new Error("Failed to load transactions");
//   return res.json();
// ---------------------------------------------------------------------------

const TEMPLATES = [
  {
    merchant: "Pick n Pay",
    category: "Groceries",
    amount: 245.8,
    paymentMethod: "Credit Card",
    icon: "shopping-cart",
    categoryColor: "#FF6B6B",
    description: "Weekly groceries",
  },
  {
    merchant: "Netflix",
    category: "Entertainment",
    amount: 199.0,
    paymentMethod: "Debit Order",
    icon: "film",
    categoryColor: "#4ECDC4",
    description: "Monthly subscription",
  },
  {
    merchant: "Uber",
    category: "Transportation",
    amount: 120.5,
    paymentMethod: "Debit Card",
    icon: "car",
    categoryColor: "#45B7D1",
    description: "Ride",
  },
  {
    merchant: "Woolworths",
    category: "Shopping",
    amount: 320.45,
    paymentMethod: "Credit Card",
    icon: "shopping-bag",
    categoryColor: "#A66CDB",
    description: "Clothing",
  },
  {
    merchant: "Steers",
    category: "Dining",
    amount: 156.7,
    paymentMethod: "Debit Card",
    icon: "utensils",
    categoryColor: "#FFC048",
    description: "Dinner",
  },
  {
    merchant: "Eskom",
    category: "Utilities",
    amount: 890.0,
    paymentMethod: "Direct Debit",
    icon: "tint",
    categoryColor: "#6FB6FF",
    description: "Electricity",
  },
];

const ALL: Transaction[] = Array.from({ length: 47 }, (_, i) => {
  const t = TEMPLATES[i % TEMPLATES.length];
  return {
    id: `txn_${123456 + i}`,
    date: new Date(Date.UTC(2024, 8, 16 - i, 14, 30)).toISOString(),
    ...t,
    // keep the first page identical to the templates, vary the rest a little
    amount:
      i < TEMPLATES.length
        ? t.amount
        : Math.round((t.amount + (i % 5) * 11.25) * 100) / 100,
  };
});

export async function fetchTransactions({
  offset,
  limit,
  category,
}: {
  offset: number;
  limit: number;
  category?: string | null; // null / undefined = all categories
  range?: string; // "7d" | "30d" | "90d" | "1y". The mock data is static, so it is ignored here
}): Promise<TransactionsResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300)); // fake network delay

  const source = category ? ALL.filter((t) => t.category === category) : ALL;

  return {
    transactions: source.slice(offset, offset + limit),
    pagination: {
      total: source.length,
      limit,
      offset,
      hasMore: offset + limit < source.length,
    },
  };
}
