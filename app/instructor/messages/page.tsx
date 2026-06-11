"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/layout/DashboardShell";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { inboxFor, outboxFor } from "@/lib/mock/messages";
import { getUser } from "@/lib/mock/users";
import { getCourse } from "@/lib/mock/courses";
import { classNames } from "@/lib/utils";
import type { Message } from "@/lib/types";

export default function InstructorMessages() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"inbox" | "outbox">("inbox");
  const [activeId, setActiveId] = useState<string>("");
  const [reply, setReply] = useState("");

  const list: Message[] = useMemo(() => {
    if (!user) return [];
    return tab === "inbox" ? inboxFor(user.id) : outboxFor(user.id);
  }, [user, tab]);

  if (!user) return null;

  const active = list.find((m) => m.id === activeId) ?? list[0];
  const counterpartId = active ? (tab === "inbox" ? active.fromId : active.toId) : "";
  const counterpart = counterpartId ? getUser(counterpartId) : undefined;
  const course = active?.courseId ? getCourse(active.courseId) : undefined;

  return (
    <>
      <PageHeader title="پیام‌ها" subtitle="گفت‌وگو با دانشجویان (نمونه نمایشی)" />

      <div className="card grid overflow-hidden lg:grid-cols-[320px_1fr]">
        {/* List */}
        <div className="border-b border-line lg:border-b-0 lg:border-s">
          <div className="flex border-b border-line">
            {(["inbox", "outbox"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setActiveId(""); }}
                className={classNames(
                  "focus-ring flex-1 py-3 text-sm font-medium transition",
                  tab === t ? "border-b-2 border-brand-600 text-brand-700" : "text-ink-muted hover:text-ink",
                )}
              >
                {t === "inbox" ? "دریافتی" : "ارسالی"}
              </button>
            ))}
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {list.length === 0 ? (
              <p className="p-6 text-center text-sm text-ink-muted">پیامی وجود ندارد.</p>
            ) : (
              list.map((m) => {
                const other = getUser(tab === "inbox" ? m.fromId : m.toId);
                const sel = active?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveId(m.id)}
                    className={classNames(
                      "focus-ring flex w-full gap-3 border-b border-line p-4 text-start transition",
                      sel ? "bg-brand-50" : "hover:bg-paper",
                    )}
                  >
                    {other && <Avatar name={other.name} color={other.avatarColor} size={40} />}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-bold text-ink">{other?.name}</span>
                        <span className="shrink-0 text-[11px] text-ink-muted">{m.date}</span>
                      </div>
                      <p className="truncate text-xs font-medium text-ink-soft">{m.subject}</p>
                      <p className="truncate text-xs text-ink-muted">{m.body}</p>
                    </div>
                    {tab === "inbox" && !m.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Thread */}
        <div className="flex min-h-[60vh] flex-col">
          {active && counterpart ? (
            <>
              <div className="flex items-center gap-3 border-b border-line p-5">
                <Avatar name={counterpart.name} color={counterpart.avatarColor} size={44} />
                <div className="min-w-0">
                  <p className="font-bold text-ink">{counterpart.name}</p>
                  {course && <Badge tone="brand">{course.title}</Badge>}
                </div>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                <div className="max-w-md rounded-2xl rounded-ss-sm bg-paper p-4">
                  <p className="text-sm font-bold text-ink">{active.subject}</p>
                  <p className="mt-1.5 text-sm leading-7 text-ink-soft">{active.body}</p>
                  <span className="mt-2 block text-[11px] text-ink-muted">{active.date}</span>
                </div>
              </div>
              <div className="border-t border-line p-4">
                <div className="flex gap-2">
                  <input
                    className="input-field"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="پاسخ خود را بنویسید…"
                  />
                  <Button onClick={() => setReply("")} disabled={!reply.trim()}>
                    <Icon name="send" size={18} />
                  </Button>
                </div>
                <p className="mt-2 text-center text-[11px] text-ink-muted">ارسال پیام نمونه نمایشی است.</p>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-ink-muted">
              یک گفت‌وگو را انتخاب کنید.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
