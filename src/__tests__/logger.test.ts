jest.mock("../lib/env", () => ({
  env: { NODE_ENV: "production" },
}));

import { logger } from "../lib/utils/logger";

describe("logger", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("logs only a safe digest for production errors", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation();
    const error = Object.assign(new Error("sensitive error details"), {
      digest: "error-123",
    });

    logger.error(error, "An unhandled error occurred");

    expect(consoleError).toHaveBeenCalledWith("An unhandled error occurred", {
      digest: "error-123",
    });
    expect(consoleError).not.toHaveBeenCalledWith(
      "An unhandled error occurred",
      error,
    );
  });
});
