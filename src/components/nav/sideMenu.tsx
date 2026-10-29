"use client";

/**
 * Desktop sidebar navigation with expandable/collapsible states.
 * manuItems can be expanded via config.
 * ```
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { navigationItems } from "./config/navConfig";

function MenuContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar-background text-sidebar-foreground">
      <div className="px-6 py-6 text-xl font-bold tracking-wide text-sidebar-foreground">
        Capitec Bank
      </div>

      {/* Links */}
      <nav aria-label="Main" className="flex-1 space-y-1 px-3">
        {navigationItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-700 text-white"
                  : "hover:bg-sidebar-hover hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  // Close drawer on Escape and lock body scroll while open (mobile)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop: fixed-width sticky sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block xl:w-72">
        <MenuContent />
      </aside>

      {/* Mobile / tablet: top bar with hamburger */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center bg-sidebar-background px-4 text-white lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="rounded-md p-2 hover:bg-sidebar-hover"
        >
          <FaBars className="h-6 w-6" />
        </button>
        <span className="ml-3 font-bold">Capitec Bank</span>
      </header>

      {/* Mobile drawer + backdrop */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-64 max-w-[80%] transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-2 top-3 rounded-md p-2 text-sidebar-foreground hover:bg-sidebar-hover"
          >
            <FaTimes className="h-5 w-5" />
          </button>
          <MenuContent onNavigate={() => setOpen(false)} />
        </aside>
      </div>
    </>
  );
}
