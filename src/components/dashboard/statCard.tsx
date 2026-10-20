import React from "react";
import { IconType } from "react-icons";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export interface StatCardProps {
  title: string;
  amount: string;
  percentageChange: number; // e.g., 12 for +12%, -4 for -4%
  comparisonText: string; // e.g., "vs. previous 3 months"
  icon: IconType; // React Icon component
  iconBgColor?: string; // Optional Tailwind background color class
  iconColor?: string; // Optional Tailwind text color class
}

export default function StatCard({
  title,
  amount,
  percentageChange,
  comparisonText,
  icon: Icon,
  iconBgColor = "bg-blue-50",
  iconColor = "text-blue-600",
}: StatCardProps) {
  const isPositive = percentageChange >= 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 w-full max-w-sm">
      {/* Icon Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-2xl ${iconBgColor} ${iconColor} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Title & Amount */}
      <div className="space-y-1 mb-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          {amount}
        </h3>
      </div>

      {/* Footer Trend & Comparison */}
      <div className="flex items-center text-xs sm:text-sm">
        <span
          className={`flex items-center font-semibold mr-1.5 ${
            isPositive ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {isPositive ? (
            <FiTrendingUp className="w-4 h-4 mr-1 inline" />
          ) : (
            <FiTrendingDown className="w-4 h-4 mr-1 inline" />
          )}
          {isPositive ? `+${percentageChange}%` : `${percentageChange}%`}
        </span>
        <span className="text-gray-400 font-normal">{comparisonText}</span>
      </div>
    </div>
  );
}
