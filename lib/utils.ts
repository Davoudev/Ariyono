const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert latin digits in a string/number to Persian digits. */
export function toFa(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** Format a Toman price, or "رایگان" when free. */
export function formatPrice(price: number): string {
  if (price === 0) return "رایگان";
  return `${toFa(price.toLocaleString("en-US"))} تومان`;
}

export function formatDuration(min: number): string {
  if (min < 60) return `${toFa(min)} دقیقه`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${toFa(h)} ساعت و ${toFa(m)} دقیقه` : `${toFa(h)} ساعت`;
}

/** Pretty Persian-ish date + time from an ISO string (display only). */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
}

export function classNames(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}
