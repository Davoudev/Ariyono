"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const demoAccounts = [
  { label: "ورود به‌عنوان دانشجو", email: "arman@student.ir" },
  { label: "ورود به‌عنوان مدرس", email: "nouri@teacher.ir" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function go(user: { role: string }) {
    router.push(user.role === "instructor" ? "/instructor/dashboard" : "/student/dashboard");
  }

  function submit() {
    setError("");
    const res = login(email, password);
    if (!res.ok || !res.user) {
      setError(res.error ?? "خطایی رخ داد.");
      return;
    }
    go(res.user);
  }

  function quick(demoEmail: string) {
    setError("");
    const res = login(demoEmail, "123456");
    if (res.ok && res.user) go(res.user);
  }

  return (
    <div>
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink lg:hidden">
        <Icon name="graduation" size={20} className="text-brand-600" /> دانش‌یار
      </Link>
      <h1 className="text-2xl font-extrabold text-ink">ورود به حساب</h1>
      <p className="mt-2 text-sm text-ink-soft">خوش آمدید! اطلاعات خود را وارد کنید.</p>

      <div className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">ایمیل</label>
          <input
            type="email"
            className="input-field"
            placeholder="example@mail.ir"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">رمز عبور</label>
          <input
            type="password"
            className="input-field"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
        )}

        <Button className="w-full" onClick={submit}>
          ورود
        </Button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-ink-muted">
        <span className="h-px flex-1 bg-line" />
        ورود سریع برای دمو
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {demoAccounts.map((d) => (
          <button
            key={d.email}
            onClick={() => quick(d.email)}
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink-soft transition hover:border-brand-300 hover:text-brand-700"
          >
            {d.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-ink-muted">رمز همه حساب‌های دمو: ۱۲۳۴۵۶</p>

      <p className="mt-8 text-center text-sm text-ink-soft">
        حساب ندارید؟{" "}
        <Link href="/register" className="font-semibold text-brand-700 hover:text-brand-800">
          ثبت‌نام کنید
        </Link>
      </p>
    </div>
  );
}
