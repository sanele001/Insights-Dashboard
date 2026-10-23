import SpendingSummary from "@/src/features/spendingSummary";
import SpendingByCategory from "@/src/features/spendingByCategory";
import MonthlyTrends from "@/src/features/monthlyTrends";
import DashboardLayout from "@/src/components/layout/dashBoardLayout";
import SideMenu from "@/src/components/nav/sideMenu";
import TopBar from "@/src/features/topBar";
import { categories, monthlySpending } from "../../../mockData";

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

        <section className="grid grid-cols-1 gap-6 px-4 pb-8 pt-6 sm:px-6 xl:grid-cols-2">
          <SpendingByCategory categories={categories} />
          <MonthlyTrends data={monthlySpending} />
        </section>
      </main>
    </DashboardLayout>
  );
}
