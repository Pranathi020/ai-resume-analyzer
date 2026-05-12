import type { LucideIcon } from "lucide-react";

type Tone = "emerald" | "amber" | "blue" | "violet";

const TONES: Record<
  Tone,
  { bg: string; icon: string; label: string }
> = {
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", label: "text-emerald-600" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600", label: "text-amber-600" },
  blue: { bg: "bg-sky-50", icon: "text-sky-600", label: "text-sky-600" },
  violet: { bg: "bg-violet-50", icon: "text-violet-600", label: "text-violet-600" },
};

export default function StatCard({
  icon: Icon,
  value,
  title,
  status,
  tone,
}: {
  icon: LucideIcon;
  value: string;
  title: string;
  status: string;
  tone: Tone;
}) {
  const t = TONES[tone];
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-[#EEF0F4]">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.bg}`}>
        <Icon className={`h-5 w-5 ${t.icon}`} strokeWidth={2} />
      </div>
      <div className="mt-5">
        <div className="text-[28px] font-bold leading-none text-slate-900">
          {value}
        </div>
        <div className="mt-2 text-[13px] font-medium text-slate-500">{title}</div>
        <div className={`mt-1 text-[12px] font-medium ${t.label}`}>{status}</div>
      </div>
    </div>
  );
}
