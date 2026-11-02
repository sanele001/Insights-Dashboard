import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
  page: number; // 1-based
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
};

/** 8 pages, on page 1 -> [1, 2, 3, "e1", 8] */
function getPages(page: number, total: number): (number | string)[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "e1", total];
  if (page >= total - 2) return [1, "e1", total - 2, total - 1, total];
  return [1, "e1", page - 1, page, page + 1, "e2", total];
}

const baseButton =
  "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40";

/**
 * Renders page navigation with previous/next controls and compact page indicators.
 */
export default function Pagination({
  page,
  totalPages,
  onPageChange,
  disabled = false,
  className = "",
}: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={disabled || page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={`${baseButton} border-border text-secondary hover:bg-surface-hover`}
      >
        <FaChevronLeft aria-hidden className="h-3 w-3" />
      </button>

      {/* Numbered buttons from `sm` up */}
      <div className="hidden items-center gap-2 sm:flex">
        {getPages(page, totalPages).map((p) =>
          typeof p === "string" ? (
            <span key={p} aria-hidden className="px-1 text-muted">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              disabled={disabled}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              onClick={() => onPageChange(p)}
              className={`${baseButton} ${
                p === page
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-border text-secondary hover:bg-surface-hover"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Compact label on phones */}
      <span className="px-2 text-sm text-secondary sm:hidden">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        aria-label="Next page"
        disabled={disabled || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`${baseButton} border-border text-secondary hover:bg-surface-hover`}
      >
        <FaChevronRight aria-hidden className="h-3 w-3" />
      </button>
    </nav>
  );
}
