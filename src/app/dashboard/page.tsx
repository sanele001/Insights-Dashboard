import SpendingSummary from "@/src/features/spendingSummary";
import DashboardLayout from "@/src/components/layout/dashBoardLayout";
import SideMenu from "@/src/components/nav/sideMenu";
import TopBar from "@/src/features/topBar";

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
      </main>
    </DashboardLayout>
  );
}
