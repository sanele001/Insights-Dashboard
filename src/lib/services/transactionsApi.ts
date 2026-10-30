import type {
  Transaction,
  TransactionsResponse,
} from "@/src/types/transactionTypes";

// ---------------------------------------------------------------------------
// MOCK API. 47 generated transactions, served in pages like your real endpoint.
//
//   const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
//   if (category) params.set("category", category);
//   if (range) params.set("range", range);
//   const res = await fetch(`/api/transactions?${params}`);
//   if (!res.ok) throw new Error("Failed to load transactions");
//   return res.json();
// ---------------------------------------------------------------------------

/**
 * Fetches the base transaction templates used to generate the mock transaction dataset.
 */
const fetchTransactionTemplates = async (): Promise<Transaction[]> => {
  const res = await fetch("/api/transections");
  if (!res.ok) throw new Error("Failed to load transactions");

  return (await res.json()) as Transaction[];
};

let ALL: Transaction[] = [];
let transactionsLoaded = false;

/**
 * Loads the generated mock transaction list once and memoizes it for pagination queries.
 */
async function loadTransactions(): Promise<void> {
  if (transactionsLoaded) return;

  const templates = await fetchTransactionTemplates();
  ALL = Array.from({ length: 47 }, (_, i) => {
    const template = templates[i % templates.length];
    const { id: _templateId, date: _templateDate, ...rest } = template;

    return {
      id: `txn_${123456 + i}`,
      date: new Date(Date.UTC(2024, 8, 16 - i, 14, 30)).toISOString(),
      ...rest,
      amount:
        i < templates.length
          ? template.amount
          : Math.round((template.amount + (i % 5) * 11.25) * 100) / 100,
    };
  });

  transactionsLoaded = true;
}

/**
 * Returns a paginated slice of transactions, optionally filtered by category.
 */
export async function fetchTransactions({
  offset,
  limit,
  category,
}: {
  offset: number;
  limit: number;
  category?: string | null;
  range?: string;
}): Promise<TransactionsResponse> {
  await loadTransactions();

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
