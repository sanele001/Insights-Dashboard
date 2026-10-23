export type Transaction = {
  id: string;
  date: string; // ISO string
  merchant: string;
  category: string;
  amount: number;
  description: string;
  paymentMethod: string;
  icon: string; // kebab-case Font Awesome name, e.g. "shopping-cart"
  categoryColor: string; // 6-digit hex
};

export type PaginationMeta = {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
};

export type TransactionsResponse = {
  transactions: Transaction[];
  pagination: PaginationMeta;
};
