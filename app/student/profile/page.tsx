"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/layout/DashboardShell";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function StudentProfile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [title, setTitle] = useState(user?.title ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  function onSave() {
    // Mock save — no backend. Just show a confirmation.
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <PageHeader title="پروفایل" subtitle="اطلاعات حساب کاربری خود را ویرایش کنید" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Card */}
        <div className="card flex flex-col items-center p-6 text-center">
          <Avatar name={user.name} color={user.avatarColor} size={96} />
          <h2 className="mt-4 text-lg font-bold text-ink">{name || user.name}</h2>
          <p className="mt-1 text-sm text-ink-muted">{title || user.title}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            <Icon name="graduation" size={14} />
            دانشجو
          </span>
          <p className="mt-4 text-sm text-ink-soft">{user.email}</p>
        </div>

        {/* Form */}
        <div className="card p-6 lg:col-span-2">
          <h2 className="font-bold text-ink">ویرایش اطلاعات</h2>
          <div className="mt-5 grid gap-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">نام و نام خانوادگی</span>
              <input
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام شما"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">ایمیل</span>
              <input className="input-field bg-paper text-ink-muted" value={user.email} disabled />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">عنوان تحصیلی</span>
              <input
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثلاً دانشجوی کارشناسی مهندسی کامپیوتر"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">درباره من</span>
              <textarea
                className="input-field min-h-[110px] resize-y"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="کمی درباره علایق و اهداف یادگیری خود بنویسید…"
              />
            </label>
            <div className="flex items-center gap-3">
              <Button onClick={onSave}>
                <Icon name="check" size={16} className="me-1.5" />
                ذخیره تغییرات
              </Button>
              {saved && (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <Icon name="check" size={16} />
                  تغییرات ذخیره شد (نمونه نمایشی)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
