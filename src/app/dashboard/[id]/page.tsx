"use client";
import { Suspense, useRef } from "react";
import { useParams } from "next/navigation";
import SpendingSummary from "@/src/features/spendingSummary";
import CategoryMonthlySpending from "@/src/features/categoryMonthlySpending";
import { SpendingGoals } from "@/src/features/spendingGoals";
import RecentTransactions from "@/src/features/recentTransactions";
import SpendingInsights from "@/src/features/spendingInsights";
import FiltersPanel from "@/src/features/filtersPanel";
import DashboardLayout from "@/src/components/layout/dashBoardLayout";
import SideMenu from "@/src/components/nav/sideMenu";
import TopBar from "@/src/features/topBar";
import { DashboardFiltersProvider } from "@/src/context/filters/dashboardFilters";
import { filtersData } from "@/src/mockdata/filtersMock";
import { UserProvider, useUser } from "@/src/context/user/useContext";

export default function DashboardPage() {
  return (
    <UserProvider>
      <Suspense
        fallback={
          <DashboardLayout>
            <main className="flex min-h-screen flex-1 items-center justify-center">
              <p>Loading user data...</p>
            </main>
          </DashboardLayout>
        }
      >
        <DashboardContent />
      </Suspense>
    </UserProvider>
  );
}

function DashboardContent() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading } = useUser();
  const scrollTo = useRef<HTMLDivElement>(null);

  const srollToView = () => {
    scrollTo.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <main className="flex min-h-screen flex-1 items-center justify-center">
          <p>Loading user data...</p>
        </main>
      </DashboardLayout>
    );
  }

  if (!user || user.customerId !== id) {
    return (
      <DashboardLayout>
        <main className="flex min-h-screen flex-1 items-center justify-center">
          <p role="alert">User data not found</p>
        </main>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <SideMenu />
      {/* pt-14 leaves room for the fixed mobile top bar */}
      <main className="min-w-0 flex-1 pt-14 lg:pt-0">
        <DashboardFiltersProvider>
          <TopBar />

          {/* xl and up: main content + a 320px right column. Below xl the right column drops underneath. */}
          <div className="grid grid-cols-1 gap-6 px-4 pb-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 space-y-6">
              <SpendingSummary />

              <CategoryMonthlySpending />

              {/* Goals 1/3, transactions 2/3 on 2xl; stacked below that */}
              <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <SpendingGoals ref={scrollTo} />
                <RecentTransactions />
              </div>
            </div>

            <aside className="grid grid-cols-1 content-start gap-6 md:grid-cols-2 xl:grid-cols-1">
              <SpendingInsights />
              <FiltersPanel data={filtersData} scroll={srollToView} />
            </aside>
          </div>
        </DashboardFiltersProvider>
      </main>
    </DashboardLayout>
  );
}
