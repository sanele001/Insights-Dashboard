import { userSchema, type User } from "@/src/schema/user";

export async function fetchUserById(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${encodeURIComponent(userId)}`);
  if (!response.ok) {
    throw new Error(`Failed to load user: ${response.status}`);
  }

  const data: unknown = await response.json();
  return userSchema.parse(data);
}
