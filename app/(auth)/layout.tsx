import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand side */}
      <div className="relative hidden overflow-hidden bg-brand-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "radial-gradient(60% 60% at 80% 10%, rgba(106,94,240,0.6), transparent)" }}
          aria-hidden="true"
        />
        <Link href="/" className="relative flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-brand-700">
            <Icon name="graduation" size={22} />
          </span>
          <span className="text-lg font-extrabold">دانش‌یار</span>
        </Link>
        <div className="relative">
          <h2 className="text-3xl font-extrabold leading-snug">یادگیری بدون مرز،
            <br /> برای دانشجویان امروز</h2>
          <p className="mt-4 max-w-sm leading-8 text-white/70">
            به جامعه‌ای از دانشجویان و اساتید بپیوندید و مهارت‌های تخصصی خود را گسترش دهید.
          </p>
        </div>
        <p className="relative text-sm text-white/50">© ۱۴۰۴ دانش‌یار</p>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-paper p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
