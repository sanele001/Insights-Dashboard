import type { ReactNode } from "react";

export default function SpendingSummaryGrid({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid flex-1 gap-4 grid-cols-2 md:grid-cols-4 bg-green-50 p-10">
      {children}
    </div>
  );
}
