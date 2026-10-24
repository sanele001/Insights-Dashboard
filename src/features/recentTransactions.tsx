"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Pagination from "@/src/components/dashboard/pagination";
import { useDashboardFilters } from "@/src/context/filters/dashboardFilters";
import { fetchTransactions } from "@/src/lib/api/transactionsApi";
import TransactionsTable from "@/src/components/dashboard/transactionsTable";
import type { TransactionsResponse } from "@/src/types/transactionTypes";

const PAGE_SIZE = 6;

export default function RecentTransactions() {
  const { filters } = useDashboardFilters();
  const filterKey = `${filters.range}|${filters.category ?? ""}`;

  // The page number belongs to one set of filters; new filters mean back to page 1
  const [pageState, setPageState] = useState({ key: filterKey, page: 1 });
  const page = pageState.key === filterKey ? pageState.page : 1;
  const setPage = (p: number) => setPageState({ key: filterKey, page: p });

  const [data, setData] = useState<TransactionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0); // bump to retry after an error

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetchTransactions({
      offset: (page - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
      category: filters.category,
      range: filters.range,
    })
      .then((res) => !cancelled && setData(res))
      .catch(() => !cancelled && setError(true))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true; // ignore responses from pages the user already left
    };
  }, [page, attempt, filters.category, filters.range]);

  const meta = data?.pagination;
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;
  const from = meta && data.transactions.length > 0 ? meta.offset + 1 : 0;
  const to = meta ? meta.offset + (data?.transactions.length ?? 0) : 0;

  return (
    <section className="min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Recent Transactions
        </h2>
        <Link
          href="/transactions"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
        >
          View all <FaArrowRight aria-hidden className="h-3 w-3" />
        </Link>
      </div>

      {error ? (
        <div className="py-10 text-center text-sm text-slate-600">
          <p>Couldn&apos;t load transactions.</p>
          <button
            type="button"
            onClick={() => setAttempt((a) => a + 1)}
            className="mt-2 font-medium text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : !data ? (
        <div
          className="space-y-3 py-3"
          aria-busy="true"
          aria-label="Loading transactions"
        >
          {Array.from({ length: PAGE_SIZE }, (_, i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-lg bg-slate-100"
            />
          ))}
        </div>
      ) : (
        <div
          aria-busy={loading}
          className={
            loading ? "opacity-50 transition-opacity" : "transition-opacity"
          }
        >
          <TransactionsTable transactions={data.transactions} />
        </div>
      )}

      {meta && !error && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500" aria-live="polite">
            Showing {from} – {to} of {meta.total} transactions
          </p>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            disabled={loading}
          />
        </div>
      )}
    </section>
  );
}
