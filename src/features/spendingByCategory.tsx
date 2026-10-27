import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import CategoryChart from "@/src/components/dashboard/categoryChart";
import CategoryTable from "./categoryTable";
import type { Category } from "@/src/types/categoryTypes";

type SpendingByCategoryProps = {
  categories: Category[];
};

export default function SpendingByCategory({
  categories,
}: SpendingByCategoryProps) {
  const total = categories.reduce((sum, c) => sum + c.amount, 0);

  return (
    <section className="min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Spending by Category
        </h2>
        <Link
          href="/spending-insights"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
        >
          View details <FaArrowRight aria-hidden className="h-3 w-3" />
        </Link>
      </div>

      {/* Stacked on phones, donut beside the table from md, stacked again on 2xl where the card is half width */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center 2xl:flex-col 2xl:items-stretch">
        <CategoryChart categories={categories} total={total} />
        <div className="min-w-0 flex-1">
          <CategoryTable categories={categories} />
        </div>
      </div>
    </section>
  );
}
