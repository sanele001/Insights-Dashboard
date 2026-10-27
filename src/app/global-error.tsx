"use client";

import { useEffect } from "react";
import { env } from "@/src/lib/env";
import { logger } from "@/src/lib/utils/logger";

// Unlike error.tsx, this boundary also handles root-layout errors and must render its own document.
interface GlobalErrorProps {
  error: unknown;
  retry: () => void;
}

export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    logger.error(error, "An unhandled root error occurred");
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          role="alert"
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            fontFamily: "sans-serif",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <h1>Something went wrong</h1>
          <p>We apologize for the inconvenience. Please try again.</p>
          {env.NODE_ENV === "development" &&
            error instanceof Error &&
            error.message && <pre>{error.message}</pre>}
          <button type="button" onClick={retry}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
