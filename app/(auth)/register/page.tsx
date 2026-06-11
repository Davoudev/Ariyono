"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Role } from "@/lib/types";
import { classNames } from "@/lib/utils";

export default function RegisterPage() {
  const { registerMock } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [error, setError] = useState("");

  function submit() {
    setError("");
    if (!name.trim() || !email.trim() || password.length < 4) {
      setError("لطفاً همه فیلدها را کامل کنید (رمز حداقل ۴ کاراکتر).");
      return;
    }
    const user = registerMock(name.trim(), email.trim(), role);
    router.push(user.role === "instructor" ? "/instructor/dashboard" : "/student/dashboard");
  }

  const roleCard = (value: Role, title: string, desc: string) => (
    <button
      type="button"
      onClick={() => setRole(value)}
      className={classNames(
        "rounded-xl border p-4 text-start transition",
        role === value ? "border-brand-600 bg-brand-50 ring-2 ring-brand-100" : "border-line bg-white hover:border-brand-300",
      )}
    >
      <span className="flex items-center gap-2">
        <Icon name={value === "instructor" ? "book" : "graduation"} size={18} className="text-brand-600" />
        <span className="font-semibold text-ink">{title}</span>
      </span>
      <p className="mt-1 text-xs text-ink-muted">{desc}</p>
    </button>
  );

  return (
    <div>
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink lg:hidden">
        <Icon name="graduation" size={20} className="text-brand-600" /> دانش‌یار
      </Link>
      <h1 className="text-2xl font-extrabold text-ink">ساخت حساب کاربری</h1>
      <p className="mt-2 text-sm text-ink-soft">رایگان ثبت‌نام کنید و یادگیری را آغاز کنید.</p>

      <div className="mt-7 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {roleCard("student", "دانشجو", "در دوره‌ها ثبت‌نام کن و یاد بگیر")}
          {roleCard("instructor", "مدرس", "دوره بساز و تدریس کن")}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">نام و نام خانوادگی</label>
          <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً علی محمدی" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">ایمیل</label>
          <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.ir" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">رمز عبور</label>
          <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

        <Button className="w-full" onClick={submit}>
          ثبت‌نام
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-ink-soft">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link href="/login" className="font-semibold text-brand-700 hover:text-brand-800">
          ورود
        </Link>
      </p>
    </div>
  );
}
