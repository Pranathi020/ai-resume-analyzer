"use client";

import { ExternalLink, GraduationCap, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { COURSE_CATALOG, coursesForSkill } from "@/lib/courses";
import EmptyState from "./EmptyState";

export default function CoursesView() {
  const { current, setView } = useStore();

  const recommendedKeys = current
    ? current.missingSkills.filter((k) => COURSE_CATALOG[k]).slice(0, 8)
    : [];
  const otherKeys = Object.keys(COURSE_CATALOG).filter(
    (k) => !recommendedKeys.includes(k),
  );

  return (
    <div className="mx-auto max-w-[1200px] px-8 py-7">
      <header>
        <h2 className="text-[22px] font-semibold text-slate-900">
          Course Suggestions
        </h2>
        <p className="mt-1 text-[14px] text-slate-500">
          Curated courses to fill the skill gaps detected in your resume.
        </p>
      </header>

      {!current && (
        <EmptyState
          className="mt-6"
          title="No resume analysed yet"
          message="Upload a resume first — we'll prioritise courses based on the skills you're missing for your target role."
          ctaLabel="Upload Resume"
          onCta={() => setView("Upload Resume")}
        />
      )}

      {current && recommendedKeys.length > 0 && (
        <section className="mt-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-600" />
            <h3 className="text-[14px] font-semibold text-slate-900">
              Recommended for you · {recommendedKeys.length}
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {recommendedKeys.map((k) => {
              const sc = coursesForSkill(k);
              if (!sc) return null;
              return <SkillBlock key={k} sc={sc} highlighted />;
            })}
          </div>
        </section>
      )}

      <section className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-slate-500" />
          <h3 className="text-[14px] font-semibold text-slate-900">
            {current ? "Browse all topics" : "Browse the catalog"}
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {otherKeys.map((k) => {
            const sc = coursesForSkill(k);
            if (!sc) return null;
            return <SkillBlock key={k} sc={sc} />;
          })}
        </div>
      </section>
    </div>
  );
}

function SkillBlock({
  sc,
  highlighted,
}: {
  sc: { skill: string; blurb: string; courses: { title: string; provider: string; url: string; hours: number; level: string; free: boolean }[] };
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-card ring-1 ${
        highlighted ? "ring-brand-200" : "ring-[#EEF0F4]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-[15px] font-semibold text-slate-900">{sc.skill}</h4>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
            {sc.blurb}
          </p>
        </div>
        {highlighted && (
          <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-600">
            Gap
          </span>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {sc.courses.map((c) => (
          <a
            key={c.url}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-slate-100 px-3 py-2.5 transition hover:border-slate-200 hover:bg-slate-50"
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium text-slate-800">
                {c.title}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                {c.provider} · {c.hours}h · {c.level}
                {c.free && (
                  <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    Free
                  </span>
                )}
              </div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 transition group-hover:text-brand-600" />
          </a>
        ))}
      </div>
    </div>
  );
}
