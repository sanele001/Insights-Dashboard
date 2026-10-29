"use client";

import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import PeriodSelector, {
  type Period,
} from "@/src/components/dashboard/periodSelector";
import ProfileMenu from "@/src/components/dashboard/profileMenu";
import { useDashboardFilters } from "@/src/context/filters/dashboardFilters";
import { logger } from "@/src/lib/utils/logger";
import { useUser } from "../context/user/useContext";
import { useRouter } from "next/navigation";
import { getGreeting } from "@/src/lib/utils/dateTime";

type TopBarProps = {
  onPeriodChange?: (period: Period) => void;
};

const RANGE_TEXT: Record<Period, string> = {
  "7d": "the last 7 days",
  "30d": "the last 30 days",
  "90d": "the last 90 days",
  "1y": "the last year",
};

export default function TopBar({ onPeriodChange }: TopBarProps) {
  const { filters, setRange } = useDashboardFilters();
  const [greeting, setGreeting] = useState("Welcome");
  const router = useRouter();
  const { user } = useUser();

  // Set on the client to avoid a server/client time mismatch
  useEffect(() => setGreeting(getGreeting()), []);

  const handlePeriod = (p: Period) => {
    setRange(p);
    onPeriodChange?.(p);
  };

  const handleLogout = () => {
    // logout endpoint
    router.push("/");
    logger.log("logout");
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
          {greeting}, {user?.name.split(" ")[0]}
        </h1>
        <p className="text-sm text-slate-500">
          Here&apos;s your spending overview for {RANGE_TEXT[filters.range]}.
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <PeriodSelector value={filters.range} onChange={handlePeriod} />

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
        >
          <FaBell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {user && <ProfileMenu user={user} onLogout={handleLogout} />}
      </div>
    </header>
  );
}
