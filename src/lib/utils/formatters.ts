/** 1250.3 -> "R 1,250.30" */
export function formatCurrency(value: number): string {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `R ${formatted}`;
}
