const STYLES: Record<string, { icon: string; color: string }> = {
  Groceries: { icon: "shopping-cart", color: "#FF6B6B" },
  Entertainment: { icon: "film", color: "#4ECDC4" },
  Transportation: { icon: "car", color: "#45B7D1" },
  Transport: { icon: "car", color: "#45B7D1" },
  Dining: { icon: "utensils", color: "#FFC048" },
  Shopping: { icon: "shopping-bag", color: "#A66CDB" },
  Utilities: { icon: "tint", color: "#6FB6FF" },
};

export function getCategoryStyle(category: string) {
  return STYLES[category] ?? { icon: "tag", color: "#64748B" };
}
