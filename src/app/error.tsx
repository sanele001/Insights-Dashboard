"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { env } from "../lib/env";
import { logger } from "../lib/utils/logger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error(error, "An unhandled error occurred");
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-primary">
          Something went wrong!
        </h2>

        <p className="text-sm text-muted">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>

        {env.NODE_ENV === "development" && error?.message && (
          <div className="rounded-md bg-surface-muted p-3 text-left text-xs text-red-600 overflow-x-auto">
            <code>{error.message}</code>
          </div>
        )}

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-secondary shadow-sm hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
}
