import type { Metadata } from "next";
import "../styles/globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "دانش‌یار | پلتفرم آموزش آنلاین",
  description:
    "پلتفرم آموزش آنلاین برای دانشجویان و اساتید دانشگاهی — یادگیری مهارت‌های روز در هر زمان و هر مکان.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
