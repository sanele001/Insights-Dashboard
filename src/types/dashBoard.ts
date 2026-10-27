import { IconType } from "react-icons";
export interface SpendingSummary {
  period: string;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
  topCategory: string;
  comparedToPrevious: ComparedToPrevious;
  Icon: IconType; // React Icon component
  iconBgColor?: string; // Optional Tailwind background color class
  iconColor?: string; // Optional Tailwind text color class
  title?: string;
}

export interface ComparedToPrevious {
  spentChange: number;
  transactionChange: number;
}

export interface CustomerProfile {
  customerId: string;
  name: string;
  email: string;
  joinDate: string;
  accountType: string;
  totalSpent: number;
  currency: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  percentageChange?: number;
  comparisonText?: string;
  Icon: IconType;
  iconBgColor?: string;
  iconColor?: string;
}
export interface Category {
  name: string;
  amount: number;
  percentage: number;
  transactionCount: number;
  color: string;
  icon: string; // e.g., "shopping-cart", "film", "car"
}
