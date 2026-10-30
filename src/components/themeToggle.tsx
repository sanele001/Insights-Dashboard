"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@/src/context/theme/themeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${nextTheme} theme`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      {theme === "light" ? (
        <FaMoon aria-hidden className="h-4 w-4" />
      ) : (
        <FaSun aria-hidden className="h-4 w-4" />
      )}
    </button>
  );
}
