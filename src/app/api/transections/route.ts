import type { Transaction } from "@/src/types/transactionTypes";

export async function GET(_request: Request) {
  return new Response(JSON.stringify(transectionMock), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

const transectionMock: Transaction[] = [
  {
    id: "txn_1001",
    date: "2024-09-20T14:30:00.000Z",
    merchant: "Pick n Pay",
    category: "Groceries",
    amount: 245.8,
    paymentMethod: "Credit Card",
    icon: "shopping-cart",
    categoryColor: "#FF6B6B",
    description: "Weekly groceries",
  },
  {
    id: "txn_1002",
    date: "2024-09-19T14:30:00.000Z",
    merchant: "Netflix",
    category: "Entertainment",
    amount: 199.0,
    paymentMethod: "Debit Order",
    icon: "film",
    categoryColor: "#4ECDC4",
    description: "Monthly subscription",
  },
  {
    id: "txn_1003",
    date: "2024-09-18T14:30:00.000Z",
    merchant: "Uber",
    category: "Transportation",
    amount: 120.5,
    paymentMethod: "Debit Card",
    icon: "car",
    categoryColor: "#45B7D1",
    description: "Ride",
  },
  {
    id: "txn_1004",
    date: "2024-09-17T14:30:00.000Z",
    merchant: "Woolworths",
    category: "Shopping",
    amount: 320.45,
    paymentMethod: "Credit Card",
    icon: "shopping-bag",
    categoryColor: "#A66CDB",
    description: "Clothing",
  },
  {
    id: "txn_1005",
    date: "2024-09-16T14:30:00.000Z",
    merchant: "Steers",
    category: "Dining",
    amount: 156.7,
    paymentMethod: "Debit Card",
    icon: "utensils",
    categoryColor: "#FFC048",
    description: "Dinner",
  },
  {
    id: "txn_1006",
    date: "2024-09-15T14:30:00.000Z",
    merchant: "Eskom",
    category: "Utilities",
    amount: 890.0,
    paymentMethod: "Direct Debit",
    icon: "tint",
    categoryColor: "#6FB6FF",
    description: "Electricity",
  },
];
