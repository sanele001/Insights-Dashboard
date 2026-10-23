import SpendingSummary from "@/src/features/spendingSummary";
import SpendingByCategory from "@/src/features/spendingByCategory";
import MonthlyTrends from "@/src/features/monthlyTrends";
import SpendingGoals from "@/src/components/dashboard/spendingGoals";
import RecentTransactions from "@/src/features/recentTransactions";
import DashboardLayout from "@/src/components/layout/dashBoardLayout";
import SideMenu from "@/src/components/nav/sideMenu";
import TopBar from "@/src/features/topBar";
import { categories, monthlySpending } from "../../../mockData";
import { goals } from "../../../goalsMock";

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

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <SideMenu />
      {/* pt-14 leaves room for the fixed mobile top bar */}
      <main className="min-w-0 flex-1 pt-14 lg:pt-0">
        <TopBar user={user} />
        <SpendingSummary />

        <section className="grid grid-cols-1 gap-6 px-4 pb-6 pt-6 sm:px-6 xl:grid-cols-2">
          <SpendingByCategory categories={categories} />
          <MonthlyTrends data={monthlySpending} />
        </section>

        {/* Goals take 1/3, transactions 2/3 on large screens */}
        <section className="grid grid-cols-1 gap-6 px-4 pb-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <SpendingGoals goals={goals} />
          <RecentTransactions />
        </section>
      </main>
    </DashboardLayout>
  );
}
