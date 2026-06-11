"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { classNames } from "@/lib/utils";
import type { Role } from "@/lib/types";

interface NavItem {
  href: string;
  label: string;
  icon: IconName;
}

const studentNav: NavItem[] = [
  { href: "/student/dashboard", label: "داشبورد", icon: "home" },
  { href: "/student/courses", label: "دوره‌های من", icon: "book" },
  { href: "/student/live", label: "کلاس‌های زنده", icon: "video" },
  { href: "/student/profile", label: "پروفایل", icon: "settings" },
];

const instructorNav: NavItem[] = [
  { href: "/instructor/dashboard", label: "داشبورد", icon: "home" },
  { href: "/instructor/courses", label: "دوره‌ها", icon: "book" },
  { href: "/instructor/students", label: "دانشجویان", icon: "users" },
  { href: "/instructor/analytics", label: "تحلیل‌ها", icon: "chart" },
  { href: "/instructor/messages", label: "پیام‌ها", icon: "message" },
  { href: "/instructor/live", label: "کلاس‌های زنده", icon: "video" },
];

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const nav = role === "instructor" ? instructorNav : studentNav;

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-s border-line bg-white lg:flex">
      <Link href="/" className="flex h-16 items-center gap-2.5 border-b border-line px-6">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
          <Icon name="graduation" size={19} />
        </span>
        <span className="font-extrabold text-ink">دانش‌یار</span>
      </Link>

      <nav className="flex-1 space-y-1 p-4">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-brand-600 text-white shadow-sm" : "text-ink-soft hover:bg-paper hover:text-ink",
              )}
            >
              <Icon name={item.icon} size={19} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line p-4">
        {user && (
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-paper p-3">
            <Avatar name={user.name} color={user.avatarColor} size={36} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
              <p className="truncate text-xs text-ink-muted">{role === "instructor" ? "مدرس" : "دانشجو"}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <Icon name="logout" size={18} /> خروج از حساب
        </button>
      </div>
    </aside>
  );
}

export function MobileTabBar({ role }: { role: Role }) {
  const pathname = usePathname();
  const nav = role === "instructor" ? instructorNav : studentNav;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-white/95 backdrop-blur lg:hidden">
      {nav.slice(0, 5).map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={classNames(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
              active ? "text-brand-700" : "text-ink-muted",
            )}
          >
            <Icon name={item.icon} size={20} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
