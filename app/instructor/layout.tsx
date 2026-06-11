import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function InstructorLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="instructor">{children}</DashboardShell>;
}
