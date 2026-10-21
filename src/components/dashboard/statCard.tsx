import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import type { StatCardProps } from "@/src/types/types";

export default function StatCard({
  value,
  title,
  Icon,
  percentageChange,
  comparisonText,
  iconBgColor = "bg-blue-50",
  iconColor = "text-blue-600",
}: StatCardProps) {
  const isPositive = percentageChange !== undefined && percentageChange >= 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 w-full max-w-sm">
      {/* Icon Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-2xl ${iconBgColor} ${iconColor} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" />
        </div>
        {/* Title & Amount */}
        <p className="text-sm font-medium text-gray-500">{title}</p>
      </div>

      <div className="space-y-1 mb-2 ml-10">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          {value}
        </h3>
      </div>

      {(percentageChange !== undefined || comparisonText) && (
        <div className="flex items-center text-xs sm:text-sm ml-5">
          {percentageChange !== undefined && (
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
          )}
          {comparisonText && (
            <span className="text-gray-400 font-normal">{comparisonText}</span>
          )}
        </div>
      )}
    </div>
  );
}
