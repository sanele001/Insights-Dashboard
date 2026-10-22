"use client";

import { useId } from "react";
import { FaRegCalendarAlt, FaChevronDown } from "react-icons/fa";

export const PERIOD_OPTIONS = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
] as const;

export type Period = (typeof PERIOD_OPTIONS)[number]["value"];

type PeriodSelectorProps = {
  value: Period;
  onChange: (value: Period) => void;
  className?: string;
};

export default function PeriodSelector({
  value,
  onChange,
  className = "",
}: PeriodSelectorProps) {
  const id = useId();

  return (
    <div className={`relative inline-block ${className}`}>
      <label htmlFor={id} className="sr-only">
        Select time period
      </label>
      <FaRegCalendarAlt
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
      />
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as Period)}
        className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
      >
        {PERIOD_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FaChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500"
      />
    </div>
  );
}
