"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/lib/auth-context";
import type { Role } from "@/lib/types";

// Client-side route guard for the mock auth flow.
export function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace(`/login?next=${role}`);
    } else if (user.role !== role) {
      router.replace(user.role === "instructor" ? "/instructor/dashboard" : "/student/dashboard");
    }
  }, [ready, user, role, router]);

  if (!ready || !user || user.role !== role) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper">
        <div className="flex flex-col items-center gap-3 text-ink-muted">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
          <p className="text-sm">در حال بررسی دسترسی…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
