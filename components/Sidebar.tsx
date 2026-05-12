"use client";

import {
  LayoutGrid,
  UploadCloud,
  TrendingUp,
  Target,
  ShieldCheck,
  Clock,
  User,
  Settings,
  FileText,
  Sparkles,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useStore } from "@/lib/store";
import type { ViewName } from "@/lib/types";

type NavItem = {
  label: ViewName;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Upload Resume", icon: UploadCloud },
  { label: "Analysis", icon: TrendingUp },
  { label: "ATS Score", icon: Target },
  { label: "Suggestions", icon: ShieldCheck },
  { label: "Courses", icon: GraduationCap },
  { label: "History", icon: Clock },
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { view, setView } = useStore();

  return (
    <aside className="flex w-[260px] shrink-0 flex-col justify-between border-r border-[#EEF0F4] bg-white px-5 py-6">
      <div>
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
            <FileText className="h-5 w-5 text-brand-600" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-[15px] font-semibold leading-tight text-slate-900">
              AI Resume Analyzer
            </h1>
            <p className="text-[11px] text-slate-500">
              Improve your resume with AI
            </p>
          </div>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map(({ label, icon: Icon }) => {
            const isActive = view === label;
            return (
              <button
                key={label}
                onClick={() => setView(label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition ${
                  isActive
                    ? "bg-brand-50 text-brand-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-5 ring-1 ring-indigo-100">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-indigo-100">
          <Sparkles className="h-4 w-4 text-brand-600" />
        </div>
        <h3 className="text-[15px] font-semibold text-brand-600">
          Upgrade to Pro
        </h3>
        <p className="mt-1 text-[12px] leading-snug text-slate-500">
          Unlock advanced AI insights and boost your chances.
        </p>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-3 py-2.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-brand-700">
          Upgrade Now <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
