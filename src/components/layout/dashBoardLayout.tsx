import type { ReactNode } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex min-h-screen w-full items-start ">{children}</div>
    </>
  );
}
