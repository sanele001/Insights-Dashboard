import { render, screen } from "@testing-library/react";
import { useParams } from "next/navigation";
import DashboardPage from "@/src/app/dashboard/[id]/page";
import { fetchUserById } from "../lib/services/user";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("../lib/services/user", () => ({
  fetchUserById: jest.fn(),
}));

jest.mock("../components/layout/dashBoardLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("../components/nav/sideMenu", () => ({
  __esModule: true,
  default: () => <div>Side menu</div>,
}));

jest.mock("../features/topBar", () => ({
  __esModule: true,
  default: () => <div>Dashboard loaded</div>,
}));

jest.mock("../features/spendingSummary", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("../features/categoryMonthlySpending", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("../features/spendingGoals", () => ({
  SpendingGoals: () => null,
}));

jest.mock("../features/recentTransactions", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("../features/spendingInsights", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("../features/filtersPanel", () => ({
  __esModule: true,
  default: () => null,
}));

const user = {
  customerId: "12345",
  name: "John Doe",
  email: "john.doe@email.com",
  joinDate: "2023-01-15",
  accountType: "premium" as const,
  totalSpent: 15420.5,
  currency: "ZAR",
};

describe("DashboardPage", () => {
  beforeEach(() => {
    jest.mocked(fetchUserById).mockResolvedValue(user);
  });

  it("shows the dashboard when the URL customer ID matches the user", async () => {
    jest.mocked(useParams).mockReturnValue({ id: user.customerId });

    render(<DashboardPage />);

    expect(await screen.findByText("Dashboard loaded")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows a not-found message when the URL customer ID does not match", async () => {
    jest.mocked(useParams).mockReturnValue({ id: "other-customer" });

    render(<DashboardPage />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "User data not found",
    );
    expect(screen.queryByText("Dashboard loaded")).not.toBeInTheDocument();
  });
});
