"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { User } from "@/src/schema/user";

type ProfileMenuProps = () => void;

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 text-sm">
      <dt className="text-slate-500">{label}</dt>
      <dd className="truncate font-medium capitalize text-slate-800">
        {value}
      </dd>
    </div>
  );
}

export default function ProfileMenu({
  user,
  onLogout,
}: {
  user: User;
  onLogout: ProfileMenuProps;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const firstName = user.name.split(" ")[0];
  const joined = new Date(user.joinDate).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const spent = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: user.currency,
  }).format(user.totalSpent);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-3 rounded-lg p-1.5 text-left hover:bg-slate-100"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          {initials(user.name)}
        </span>
        <span className="hidden min-w-0 sm:block">
          <span className="block truncate text-sm font-semibold text-slate-900">
            Hi, {firstName}
          </span>
          <span className="block max-w-[10rem] truncate text-xs text-slate-500">
            {user.email}
          </span>
        </span>
        <FaChevronDown
          aria-hidden
          className={`h-3 w-3 text-slate-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-4 shadow-lg"
        >
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 font-semibold text-white">
              {initials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">
                {user.name}
              </p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
          </div>

          <dl className="divide-y divide-slate-100 border-t border-slate-100">
            <Row label="Customer ID" value={user.customerId} />
            <Row label="Member since" value={joined} />
            <Row label="Account type" value={user.accountType} />
            <Row label="Total spent" value={spent} />
          </dl>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            <FaSignOutAlt aria-hidden />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
