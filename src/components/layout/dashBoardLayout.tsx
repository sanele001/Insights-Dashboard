import type { ReactNode } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex justify-center items-center ">{children}</div>
    </>
  );
}
