import StatCard from "@/src/components/dashboard/statCard";
import SpendingSummary from "@/src/features/spendingSummary";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SpendingSummary />
    </div>
  );
}
