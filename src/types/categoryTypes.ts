export type Category = {
  name: string;
  amount: number;
  percentage: number;
  transactionCount: number;
  color: string; // 6-digit hex, e.g. "#FF6B6B"
  icon: string; // kebab-case Font Awesome name, e.g. "shopping-cart"
};
