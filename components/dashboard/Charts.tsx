"use client";

import { toFa } from "@/lib/utils";

// ---- Lightweight SVG charts (no external chart library) ----

export function BarChart({
  data,
  height = 200,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end justify-between gap-3" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <span className="tnum text-xs font-semibold text-ink-soft">{toFa(d.value)}</span>
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400 transition-all hover:from-brand-700"
              style={{ height: `${(d.value / max) * 100}%`, minHeight: 4 }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="text-center text-[11px] text-ink-muted">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function LineChart({
  data,
  height = 220,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const w = 600;
  const h = height;
  const pad = { top: 20, right: 16, bottom: 28, left: 16 };
  const max = Math.max(...data.map((d) => d.value), 1);
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const step = data.length > 1 ? innerW / (data.length - 1) : 0;

  const points = data.map((d, i) => ({
    x: pad.left + i * step,
    y: pad.top + innerH - (d.value / max) * innerH,
  }));
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${line} L ${points[points.length - 1].x} ${pad.top + innerH} L ${points[0].x} ${pad.top + innerH} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="نمودار روند">
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a45e2" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#5a45e2" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line
          key={g}
          x1={pad.left}
          x2={w - pad.right}
          y1={pad.top + innerH - g * innerH}
          y2={pad.top + innerH - g * innerH}
          stroke="#e9e8f1"
          strokeWidth={1}
        />
      ))}
      <path d={area} fill="url(#lineFill)" />
      <path d={line} fill="none" stroke="#5a45e2" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill="#fff" stroke="#5a45e2" strokeWidth={2.5} />
          <text x={p.x} y={h - 8} textAnchor="middle" fontSize="11" fill="#7b788d">
            {data[i].label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function DonutChart({
  segments,
  size = 180,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {segments.map((s) => {
          const len = (s.value / total) * c;
          const el = (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={20}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <ul className="space-y-2">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-sm" style={{ background: s.color }} />
            <span className="text-ink-soft">{s.label}</span>
            <span className="tnum font-semibold text-ink">{toFa(Math.round((s.value / total) * 100))}٪</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
