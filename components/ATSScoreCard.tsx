"use client";

import { Info } from "lucide-react";
import { qualitativeStatus, statusTone } from "@/lib/format";

const TONE_PILL: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700",
  blue: "bg-sky-50 text-sky-700",
  amber: "bg-amber-50 text-amber-700",
  violet: "bg-violet-50 text-violet-700",
};
const TONE_DOT: Record<string, string> = {
  emerald: "bg-emerald-500",
  blue: "bg-sky-500",
  amber: "bg-amber-500",
  violet: "bg-violet-500",
};

const MAX = 100;

export default function ATSScoreCard({ score = 0 }: { score?: number }) {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.max(0, Math.min(1, score / MAX));
  const dashOffset = circumference * (1 - progress);
  const tone = statusTone(score);
  const status = qualitativeStatus(score);

  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-card ring-1 ring-[#EEF0F4]">
      <div className="flex items-center gap-1.5">
        <h3 className="text-[15px] font-semibold text-slate-900">ATS Score</h3>
        <Info className="h-3.5 w-3.5 text-slate-400" />
      </div>

      <div className="mt-5 flex flex-1 flex-col items-center">
        <div className="relative">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="-rotate-90 transform"
          >
            <defs>
              <linearGradient id="atsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            <circle
              stroke="#EEF0F4"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="url(#atsGradient)"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[32px] font-bold leading-none text-slate-900">
              {score}
            </span>
            <span className="mt-1 text-[12px] text-slate-400">/{MAX}</span>
          </div>
        </div>

        <span
          className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium ${TONE_PILL[tone]}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[tone]}`} />
          {status}
        </span>

        <p className="mt-4 text-center text-[12px] leading-relaxed text-slate-500">
          {score >= 70
            ? "Great! Your resume has a high chance of passing ATS screening."
            : "There's room to improve — check the suggestions to lift your score."}
        </p>
      </div>
    </div>
  );
}
