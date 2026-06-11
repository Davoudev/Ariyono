"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { classNames } from "@/lib/utils";

const links = [
  { href: "/", label: "خانه" },
  { href: "/courses", label: "دوره‌ها" },
  { href: "/live", label: "پخش زنده" },
  { href: "/about", label: "درباره ما" },
];

export function Navbar() {
  const { user, ready, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const dashHref = user?.role === "instructor" ? "/instructor/dashboard" : "/student/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        {/* Logo (right side in RTL) */}
        <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-lg">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
            <Icon name="graduation" size={22} />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-ink">دانش‌یار</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={classNames(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-ring",
                    active ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:bg-paper hover:text-ink",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth area */}
        <div className="hidden items-center gap-2 md:flex">
          {!ready ? (
            <div className="h-9 w-24 animate-pulse rounded-xl bg-paper" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setMenu((m) => !m)}
                className="flex items-center gap-2 rounded-xl border border-line py-1.5 pe-3 ps-1.5 transition hover:border-brand-300 focus-ring"
              >
                <Avatar name={user.name} color={user.avatarColor} size={30} />
                <span className="max-w-[8rem] truncate text-sm font-medium text-ink">{user.name}</span>
                <Icon name="chevronDown" size={16} className="text-ink-muted" />
              </button>
              {menu && (
                <div
                  className="absolute end-0 mt-2 w-52 overflow-hidden rounded-2xl border border-line bg-white py-1 shadow-lift"
                  onMouseLeave={() => setMenu(false)}
                >
                  <Link href={dashHref} className="block px-4 py-2.5 text-sm text-ink-soft hover:bg-paper">
                    داشبورد من
                  </Link>
                  <Link
                    href={user.role === "student" ? "/student/profile" : "/instructor/dashboard"}
                    className="block px-4 py-2.5 text-sm text-ink-soft hover:bg-paper"
                  >
                    پروفایل
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenu(false);
                      router.push("/");
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-start text-sm text-red-600 hover:bg-red-50"
                  >
                    <Icon name="logout" size={16} /> خروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <ButtonLink href="/login" variant="ghost" size="sm">
                ورود
              </ButtonLink>
              <ButtonLink href="/register" size="sm">
                ثبت‌نام
              </ButtonLink>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-xl text-ink-soft hover:bg-paper md:hidden focus-ring"
          onClick={() => setOpen((o) => !o)}
          aria-label="باز و بسته کردن منو"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-paper"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-line pt-3">
              {user ? (
                <>
                  <ButtonLink href={dashHref} size="sm" className="flex-1">
                    داشبورد
                  </ButtonLink>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                      router.push("/");
                    }}
                    className="rounded-xl border border-line px-4 text-sm text-red-600"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <>
                  <ButtonLink href="/login" variant="secondary" size="sm" className="flex-1">
                    ورود
                  </ButtonLink>
                  <ButtonLink href="/register" size="sm" className="flex-1">
                    ثبت‌نام
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
