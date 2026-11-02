import { IconType } from "react-icons";
import type { SpendingSummaryData } from "@/src/schema/spendingSummary";
import type { User } from "@/src/schema/user";

export interface SpendingSummary extends SpendingSummaryData {
  Icon: IconType; // React Icon component
  iconBgColor?: string; // Optional Tailwind background color class
  iconColor?: string; // Optional Tailwind text color class
  title?: string;
}

export type ComparedToPrevious = SpendingSummaryData["comparedToPrevious"];

export type CustomerProfile = User;

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
