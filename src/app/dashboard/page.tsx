import StatCard from "@/src/components/dashboard/statCard";
import { StatCardProps } from "@/src/components/dashboard/statCard";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

export default function Home() {
  const totalSpentData: StatCardProps = {
    title: "Total Spent",
    amount: "R 18,450",
    percentageChange: 12,
    comparisonText: "vs. previous 3 months",
    icon: HiOutlineCurrencyDollar,
    iconBgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <StatCard {...totalSpentData} />
    </div>
  );
}
