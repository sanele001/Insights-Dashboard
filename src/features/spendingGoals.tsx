"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import GoalCard from "@/src/components/dashboard/goalCard";
import { useFetchGoals } from "@/src/lib/services/goals";

export default function SpendingGoals() {
  const { goals } = useFetchGoals();
  return (
    <section className="min-w-0 rounded-2xl bg-surface p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-primary sm:text-xl">
          Spending Goals
        </h2>
      </div>

      {goals.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted">
          No spending goals yet.
        </p>
      ) : (
        // Two columns when the card is wide, one column when it is the narrow left card (2xl)
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-1">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </section>
  );
}
