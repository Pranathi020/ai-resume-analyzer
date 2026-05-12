"use client";

import { useStore } from "@/lib/store";
import { COURSE_CATALOG } from "@/lib/courses";
import ScoreBreakdown from "./ScoreBreakdown";
import Suggestions from "./Suggestions";
import ATSScoreCard from "./ATSScoreCard";
import EmptyState from "./EmptyState";
import { formatDate, formatFileSize } from "@/lib/format";

export default function AnalysisView() {
  const { current, setView } = useStore();

  if (!current) {
    return (
      <div className="mx-auto max-w-[1200px] px-8 py-7">
        <h2 className="text-[22px] font-semibold text-slate-900">Analysis</h2>
        <EmptyState
          className="mt-6"
          title="Nothing to analyse yet"
          message="Upload a resume to see a detailed breakdown of your ATS score, skill coverage, and improvement areas."
          ctaLabel="Upload Resume"
          onCta={() => setView("Upload Resume")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-8 py-7">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-[22px] font-semibold text-slate-900">
            Analysis
          </h2>
          <p className="mt-1 text-[14px] text-slate-500">
            {current.fileName} · {formatFileSize(current.fileSize)} ·{" "}
            {current.pageCount} page{current.pageCount === 1 ? "" : "s"} · uploaded{" "}
            {formatDate(current.uploadedAt)} · target role:{" "}
            <span className="font-medium text-slate-700">{current.role}</span>
          </p>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ATSScoreCard score={current.atsScore} />
        </div>
        <div className="lg:col-span-3">
          <ScoreBreakdown rows={current.scoreBreakdown} />
        </div>
      </section>

      <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SkillsCard
          title="Detected skills"
          skills={current.detectedSkills}
          empty="No skills detected yet — try adding a Skills section."
          variant="found"
        />
        <SkillsCard
          title="Missing or weak skills"
          skills={current.missingSkills}
          empty="Great coverage — no key skills missing."
          variant="missing"
          onSeeCourses={() => setView("Courses")}
        />
      </section>

      <section className="mt-5">
        <Suggestions items={current.suggestions} />
      </section>
    </div>
  );
}

function SkillsCard({
  title,
  skills,
  empty,
  variant,
  onSeeCourses,
}: {
  title: string;
  skills: string[];
  empty: string;
  variant: "found" | "missing";
  onSeeCourses?: () => void;
}) {
  const friendly = (key: string) => COURSE_CATALOG[key]?.skill ?? toTitle(key);
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-[#EEF0F4]">
      <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
      {skills.length === 0 ? (
        <p className="mt-3 text-[13px] text-slate-500">{empty}</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                variant === "found"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {friendly(s)}
            </span>
          ))}
        </div>
      )}
      {variant === "missing" && skills.length > 0 && onSeeCourses && (
        <button
          onClick={onSeeCourses}
          className="mt-5 text-[13px] font-medium text-brand-600 hover:text-brand-700"
        >
          See recommended courses →
        </button>
      )}
    </div>
  );
}

function toTitle(s: string): string {
  return s
    .split("_")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}
