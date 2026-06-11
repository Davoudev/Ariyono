import type { ReactNode } from "react";
import type { Role } from "@/lib/types";
import { RequireRole } from "@/components/auth/RequireRole";
import { Sidebar, MobileTabBar } from "@/components/layout/Sidebar";

export function DashboardShell({ role, children }: { role: Role; children: ReactNode }) {
  return (
    <RequireRole role={role}>
      <div className="flex min-h-screen bg-paper">
        <Sidebar role={role} />
        <div className="flex-1 pb-20 lg:pb-0">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
        </div>
        <MobileTabBar role={role} />
      </div>
    </RequireRole>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
