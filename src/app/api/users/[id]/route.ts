import { userIdSchema, userSchema } from "@/src/schema/user";

const user = {
  customerId: "12345",
  name: "John Doe",
  email: "john.doe@email.com",
  joinDate: "2023-01-15",
  accountType: "premium",
  totalSpent: 15420.5,
  currency: "ZAR",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const validatedId = userIdSchema.safeParse(id);

  if (!validatedId.success) {
    return Response.json({ error: "Invalid user ID" }, { status: 400 });
  }

  if (user.customerId !== validatedId.data) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(userSchema.parse(user));
}
