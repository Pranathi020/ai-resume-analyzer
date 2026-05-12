"use client";

import { TrendingUp, Key, Star, Code2, ChevronRight, ShieldCheck, PenSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Suggestion } from "@/lib/types";

type Tone = Suggestion["tone"];

const TONES: Record<Tone, { bg: string; icon: string }> = {
  violet: { bg: "bg-violet-50", icon: "text-violet-600" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600" },
  sky: { bg: "bg-sky-50", icon: "text-sky-600" },
};

const ICONS: Record<Suggestion["iconKey"], LucideIcon> = {
  trend: TrendingUp,
  key: Key,
  star: Star,
  code: Code2,
  shield: ShieldCheck,
  edit: PenSquare,
};

export default function Suggestions({ items }: { items: Suggestion[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-[#EEF0F4]">
      <h3 className="text-[15px] font-semibold text-slate-900">
        Top AI Suggestions
      </h3>
      <div className="mt-4 space-y-3">
        {items.map(({ id, text, tone, iconKey }) => {
          const t = TONES[tone];
          const Icon = ICONS[iconKey];
          return (
            <div
              key={id}
              className="group flex w-full items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 text-left transition hover:border-slate-200 hover:bg-slate-50"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${t.bg}`}
              >
                <Icon className={`h-4 w-4 ${t.icon}`} strokeWidth={2} />
              </div>
              <span className="flex-1 text-[13px] text-slate-700">{text}</span>
              <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
