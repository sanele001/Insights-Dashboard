import SpendingSummary from "@/src/features/spendingSummary";
import CategoryMonthlySpending from "@/src/features/categoryMonthlySpending";
import SpendingGoals from "@/src/features/spendingGoals";
import RecentTransactions from "@/src/features/recentTransactions";
import SpendingInsights from "@/src/features/spendingInsights";
import FiltersPanel from "@/src/features/filtersPanel";
import DashboardLayout from "@/src/components/layout/dashBoardLayout";
import SideMenu from "@/src/components/nav/sideMenu";
import TopBar from "@/src/features/topBar";
import { DashboardFiltersProvider } from "@/src/context/filters/dashboardFilters";

import { goals } from "@/src/mockdata/goalsMock";
import { insights } from "@/src/mockdata/insightsMock";
import { filtersData } from "@/src/mockdata/filtersMock";

// Replace with real data from your API / session
const user = {
  customerId: "12345",
  name: "John Doe",
  email: "john.doe@email.com",
  joinDate: "2023-01-15",
  accountType: "premium",
  totalSpent: 15420.5,
  currency: "ZAR",
};

debugger;

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <SideMenu />
      {/* pt-14 leaves room for the fixed mobile top bar */}
      <main className="min-w-0 flex-1 pt-14 lg:pt-0">
        <DashboardFiltersProvider>
          <TopBar user={user} />

          {/* xl and up: main content + a 320px right column. Below xl the right column drops underneath. */}
          <div className="grid grid-cols-1 gap-6 px-4 pb-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 space-y-6">
              <SpendingSummary />

              <CategoryMonthlySpending />

              {/* Goals 1/3, transactions 2/3 on 2xl; stacked below that */}
              <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <SpendingGoals goals={goals} />
                <RecentTransactions />
              </div>
            </div>

            <aside className="grid grid-cols-1 content-start gap-6 md:grid-cols-2 xl:grid-cols-1">
              <SpendingInsights insights={insights} />
              <FiltersPanel data={filtersData} />
            </aside>
          </div>
        </DashboardFiltersProvider>
      </main>
    </DashboardLayout>
  );
}
