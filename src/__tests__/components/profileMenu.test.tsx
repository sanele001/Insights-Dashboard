import { fireEvent, render, screen, within } from "@testing-library/react";
import ProfileMenu from "@/src/components/dashboard/profileMenu";
import type { User } from "@/src/schema/user";

const user: User = {
  customerId: "12345",
  name: "John Doe",
  email: "john.doe@email.com",
  joinDate: "2023-01-15",
  accountType: "premium",
  totalSpent: 15420.5,
  currency: "ZAR",
};

describe("ProfileMenu", () => {
  it("renders the user's profile details when the menu is opened", () => {
    render(<ProfileMenu user={user} onLogout={jest.fn()} />);

    expect(screen.getByText("Hi, John")).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText("JD")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Hi, John/ }));

    const menu = screen.getByRole("menu");
    const joined = new Date(user.joinDate).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const spent = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: user.currency,
    }).format(user.totalSpent);

    expect(within(menu).getByText(user.name)).toBeInTheDocument();
    expect(within(menu).getByText(user.email)).toBeInTheDocument();
    expect(within(menu).getByText("Customer ID").nextElementSibling).toHaveTextContent(
      user.customerId,
    );
    expect(within(menu).getByText("Member since").nextElementSibling).toHaveTextContent(
      joined,
    );
    expect(within(menu).getByText("Account type").nextElementSibling).toHaveTextContent(
      user.accountType,
    );
    expect(within(menu).getByText("Total spent").nextElementSibling).toHaveTextContent(
      spent.replaceAll("\u00a0", " "),
    );
  });
});