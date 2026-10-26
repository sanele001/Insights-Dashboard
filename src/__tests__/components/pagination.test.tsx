import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "@/src/components/dashboard/pagination";

describe("Pagination", () => {
  it("renders numbered pages and marks the current page", () => {
    render(<Pagination page={2} totalPages={5} onPageChange={jest.fn()} />);

    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("calls onPageChange when previous, next, or a page number is selected", () => {
    const onPageChange = jest.fn();
    render(
      <Pagination page={3} totalPages={5} onPageChange={onPageChange} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    fireEvent.click(screen.getByRole("button", { name: "Page 4" }));
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));

    expect(onPageChange.mock.calls).toEqual([[2], [4], [4]]);
  });

  it("disables previous and next controls at the first and last pages", () => {
    const onPageChange = jest.fn();
    const { rerender } = render(
      <Pagination page={1} totalPages={8} onPageChange={onPageChange} />,
    );

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();

    rerender(<Pagination page={8} totalPages={8} onPageChange={onPageChange} />);

    expect(screen.getByRole("button", { name: "Previous page" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("shows ellipses for pages in the middle of a large page range", () => {
    render(<Pagination page={4} totalPages={8} onPageChange={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 5" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 8" })).toBeInTheDocument();
    expect(screen.getAllByText("…")).toHaveLength(2);
  });

  it("disables all navigation while disabled", () => {
    render(
      <Pagination page={2} totalPages={5} onPageChange={jest.fn()} disabled />,
    );

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Page 1" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });
});