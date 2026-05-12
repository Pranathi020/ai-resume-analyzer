"use client";

import type { CategoryScore } from "@/lib/types";

export default function ScoreBreakdown({ rows }: { rows: CategoryScore[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-[#EEF0F4]">
      <h3 className="text-[15px] font-semibold text-slate-900">
        Score Breakdown
      </h3>
      <div className="mt-5 space-y-4">
        {rows.map(({ label, value, color }) => (
          <div
            key={label}
            className="grid grid-cols-[90px_1fr_40px] items-center gap-4"
          >
            <span className="text-[13px] font-medium text-slate-600">
              {label}
            </span>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${color}`}
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="text-right text-[13px] font-semibold text-slate-700">
              {value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
