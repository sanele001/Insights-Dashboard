/**
 * general logger utility for the application
 * Environment-aware logging that respects development vs production mode
 */

import { env } from "../env";

function getErrorDigest(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null || !("digest" in error)) {
    return undefined;
  }

  return typeof error.digest === "string" ? error.digest : undefined;
}

export const logger = {
  log: (...args: unknown[]): void => {
    if (env.NODE_ENV === "development") {
      console.log(...args);
    }
  },

  warn: (...args: unknown[]): void => {
    if (env.NODE_ENV === "development") {
      console.warn(...args);
    }
  },

  error: (error: unknown, context = "Application error"): void => {
    if (env.NODE_ENV === "development") {
      console.error(context, error);
      return;
    }

    const digest = getErrorDigest(error);
    console.error(context, digest ? { digest } : "Error details withheld");
  },

  info: (...args: unknown[]): void => {
    if (env.NODE_ENV === "development") {
      console.info(...args);
    }
  },
};
