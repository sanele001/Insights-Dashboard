"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import CategoryIcon from "@/src/features/categoryIcon";
import type { FilterCategory } from "@/src/types/filterTypes";

type CategorySelectProps = {
  categories: FilterCategory[];
  value: string | null; // null = all categories
  onChange: (value: string | null) => void;
};

function Badge({ category }: { category: FilterCategory }) {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs"
      style={{ backgroundColor: `${category.color}33`, color: category.color }}
    >
      <CategoryIcon name={category.icon} />
    </span>
  );
}

export default function CategorySelect({
  categories,
  value,
  onChange,
}: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = categories.find((c) => c.name === value) ?? null;

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: string | null) => {
    onChange(next);
    setOpen(false);
  };

  const optionClass = (active: boolean) =>
    `flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm ${
      active
        ? "bg-blue-50 font-medium text-blue-700"
        : "text-secondary hover:bg-surface-hover"
    }`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Filter by category"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-secondary shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="flex min-w-0 items-center gap-2">
          {selected && <Badge category={selected} />}
          <span className="truncate">
            {selected ? selected.name : "All categories"}
          </span>
        </span>
        <FaChevronDown
          aria-hidden
          className={`h-3 w-3 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-border bg-surface p-1 shadow-lg"
        >
          <li role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={value === null}
              onClick={() => choose(null)}
              className={optionClass(value === null)}
            >
              All categories
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.name} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={c.name === value}
                onClick={() => choose(c.name)}
                className={optionClass(c.name === value)}
              >
                <Badge category={c} />
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
