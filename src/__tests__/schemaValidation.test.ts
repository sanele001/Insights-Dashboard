/** @jest-environment node */

import {
  categoriesResponseSchema,
  categoryQuerySchema,
} from "@/src/schema/category";
import { goalsResponseSchema } from "@/src/schema/goal";
import { insightsResponseSchema } from "@/src/schema/insight";
import { spendingSummarySchema } from "@/src/schema/spendingSummary";
import {
  transactionTemplatesSchema,
  transactionsResponseSchema,
} from "@/src/schema/transaction";
import { userIdSchema, userSchema } from "@/src/schema/user";
import { GET as getUser } from "@/src/app/api/users/[id]/route";
import { GET as getCategories } from "@/src/app/api/categories/route";
import { GET as getGoals } from "@/src/app/api/goals/route";
import { GET as getInsights } from "@/src/app/api/insights/route";
import { GET as getTransactions } from "@/src/app/api/transections/route";

describe("dashboard data schemas", () => {
  it("validates category query inputs and response data", () => {
    expect(
      categoryQuerySchema.safeParse({ category: " Groceries " }).success,
    ).toBe(true);
    expect(categoryQuerySchema.safeParse({ category: " " }).success).toBe(false);
    expect(
      categoriesResponseSchema.safeParse({
        categories: [
          {
            name: "Groceries",
            amount: 25,
            percentage: 50,
            transactionCount: 1,
            color: "#FF6B6B",
            icon: "shopping-cart",
          },
        ],
        monthlySpending: [{ month: "Jun 2024", amount: 25 }],
      }).success,
    ).toBe(true);
  });

  it("validates goal, insight, and transaction responses", () => {
    expect(
      goalsResponseSchema.safeParse([
        {
          id: "goal-1",
          category: "Groceries",
          monthlyBudget: 100,
          currentSpent: 20,
          percentageUsed: 20,
          daysRemaining: 3,
          status: "on_track",
        },
      ]).success,
    ).toBe(true);
    expect(
      goalsResponseSchema.safeParse([
        {
          id: "goal-1",
          category: "Groceries",
          monthlyBudget: 100,
          currentSpent: 20,
          percentageUsed: 20,
          daysRemaining: 1.5,
          status: "on_track",
        },
      ]).success,
    ).toBe(false);
    expect(
      insightsResponseSchema.safeParse([
        {
          id: "insight-1",
          title: "On track",
          description: "Spending is on track",
          icon: "arrow-up",
          color: "#22C55E",
        },
      ]).success,
    ).toBe(true);

    const transaction = {
      id: "txn-1",
      date: "2024-09-20T14:30:00.000Z",
      merchant: "Store",
      category: "Groceries",
      amount: 25,
      description: "Food",
      paymentMethod: "Debit Card",
      icon: "shopping-cart",
      categoryColor: "#FF6B6B",
    };
    expect(
      transactionTemplatesSchema.safeParse([transaction]).success,
    ).toBe(true);
    expect(
      transactionsResponseSchema.safeParse({
        transactions: [transaction],
        pagination: { total: 1, limit: 10, offset: 0, hasMore: false },
      }).success,
    ).toBe(true);
    expect(transactionTemplatesSchema.safeParse([]).success).toBe(false);
  });

  it("validates user IDs, user data, and spending summary data", () => {
    expect(userIdSchema.safeParse("").success).toBe(false);
    expect(
      userSchema.safeParse({
        customerId: "12345",
        name: "John Doe",
        email: "john.doe@email.com",
        joinDate: "2023-02-29",
        accountType: "premium",
        totalSpent: 100,
        currency: "ZAR",
      }).success,
    ).toBe(false);
    expect(
      spendingSummarySchema.safeParse({
        period: "30d",
        totalSpent: 100,
        transactionCount: 2,
        averageTransaction: 50,
        topCategory: "Groceries",
        comparedToPrevious: { spentChange: 1.5, transactionChange: -2 },
      }).success,
    ).toBe(true);
    expect(
      spendingSummarySchema.safeParse({
        period: "30d",
        totalSpent: 100,
        transactionCount: 2.5,
        averageTransaction: 50,
        topCategory: "Groceries",
        comparedToPrevious: { spentChange: 1.5, transactionChange: -2 },
      }).success,
    ).toBe(false);
  });
});

describe("API route input validation", () => {
  it("serves data matching the response schemas", async () => {
    const categoriesResponse = await getCategories({
      url: "http://localhost/api/categories",
    } as Request);
    const goalsResponse = await getGoals({} as Request);
    const insightsResponse = await getInsights({} as Request);
    const transactionsResponse = await getTransactions({} as Request);
    const userResponse = await getUser(
      {} as Request,
      { params: Promise.resolve({ id: "12345" }) },
    );

    expect(
      categoriesResponseSchema.safeParse(
        await categoriesResponse.json(),
      ).success,
    ).toBe(true);
    expect(
      goalsResponseSchema.safeParse(await goalsResponse.json()).success,
    ).toBe(true);
    expect(
      insightsResponseSchema.safeParse(await insightsResponse.json()).success,
    ).toBe(true);
    expect(
      transactionTemplatesSchema.safeParse(
        await transactionsResponse.json(),
      ).success,
    ).toBe(true);
    expect(userSchema.safeParse(await userResponse.json()).success).toBe(true);
  });

  it("returns 400 for an empty category query", async () => {
    const response = await getCategories({
      url: "http://localhost/api/categories?category=",
    } as Request);

    expect(response.status).toBe(400);
  });

  it("rejects empty user IDs before lookup", async () => {
    const response = await getUser(
      {} as Request,
      { params: Promise.resolve({ id: "" }) },
    );

    expect(response.status).toBe(400);
  });
});
