import SpendingSummary from "@/src/features/spendingSummary";
import DashboardLayout from "@/src/components/layout/dashBoardLayout";
import SideMenu from "@/src/components/nav/sideMenu";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <SideMenu />
      <main className="min-w-0 flex-1 pt-14 lg:pt-0">
        <SpendingSummary />
      </main>
    </DashboardLayout>
  );
}
