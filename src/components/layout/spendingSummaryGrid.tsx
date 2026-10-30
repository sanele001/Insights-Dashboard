import type { ReactNode } from "react";

export default function SpendingSummaryGrid({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid flex-1 gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-10">
      {children}
    </div>
  );
}
