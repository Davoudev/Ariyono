import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper px-4 text-center">
      <div>
        <p className="tnum text-7xl font-extrabold text-brand-600">۴۰۴</p>
        <h1 className="mt-4 text-xl font-bold text-ink">صفحه‌ای که دنبالش بودید پیدا نشد</h1>
        <p className="mt-2 text-sm text-ink-soft">ممکن است آدرس تغییر کرده باشد یا حذف شده باشد.</p>
        <div className="mt-6">
          <ButtonLink href="/">بازگشت به خانه</ButtonLink>
        </div>
      </div>
    </div>
  );
}
