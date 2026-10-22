import { fireEvent, render, screen, within } from "@testing-library/react";
import SideMenu from "@/src/components/nav/sideMenu";

jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

const expectedLinks = [
  ["Dashboard", "/dashboard"],
  ["Transactions", "/transactions"],
  ["Spending Insights", "/spending-insights"],
  ["Budgets", "/budgets"],
  ["Goals", "/goals"],
  ["Categories", "/categories"],
  ["Settings", "/settings"],
] as const;

describe("SideMenu", () => {
  it("renders each menu item with the correct page link", () => {
    const { container } = render(<SideMenu />);
    const menus = container.querySelectorAll<HTMLElement>(
      'nav[aria-label="Main"]',
    );

    expect(menus).toHaveLength(2);
    menus.forEach((menu) => {
      expectedLinks.forEach(([label, href]) => {
        expect(
          within(menu).getByRole("link", { name: label, hidden: true }),
        ).toHaveAttribute("href", href);
      });
    });
  });

  it("keeps the mobile menu hidden until opened and closes it after navigation", () => {
    render(<SideMenu />);

    const drawer = screen.getByLabelText("Close menu").parentElement;
    if (!drawer) throw new Error("Mobile drawer was not rendered");

    expect(drawer.parentElement).toHaveAttribute("aria-hidden", "true");
    expect(drawer).toHaveClass("-translate-x-full");

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(drawer.parentElement).toHaveAttribute("aria-hidden", "false");
    expect(drawer).toHaveClass("translate-x-0");

    fireEvent.click(within(drawer).getByRole("link", { name: "Transactions" }));
    expect(drawer.parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
