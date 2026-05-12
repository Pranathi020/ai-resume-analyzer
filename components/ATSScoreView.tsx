"use client";

import { useStore } from "@/lib/store";
import ATSScoreCard from "./ATSScoreCard";
import ScoreBreakdown from "./ScoreBreakdown";
import EmptyState from "./EmptyState";

export default function ATSScoreView() {
  const { current, setView } = useStore();

  if (!current) {
    return (
      <div className="mx-auto max-w-[1200px] px-8 py-7">
        <h2 className="text-[22px] font-semibold text-slate-900">ATS Score</h2>
        <EmptyState
          className="mt-6"
          title="No score yet"
          message="Upload your resume to see how well it would pass an ATS (Applicant Tracking System) screening."
          ctaLabel="Upload Resume"
          onCta={() => setView("Upload Resume")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-8 py-7">
      <header>
        <h2 className="text-[22px] font-semibold text-slate-900">ATS Score</h2>
        <p className="mt-1 text-[14px] text-slate-500">
          Weighted score across skills, content, keywords, formatting, and education.
        </p>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ATSScoreCard score={current.atsScore} />
        </div>
        <div className="lg:col-span-3">
          <ScoreBreakdown rows={current.scoreBreakdown} />
        </div>
      </section>

      <section className="mt-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-[#EEF0F4]">
        <h3 className="text-[15px] font-semibold text-slate-900">How we score</h3>
        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-600">
          <li><b className="text-slate-800">Skills (30%)</b> — coverage of priority skills for your target role.</li>
          <li><b className="text-slate-800">Keywords (25%)</b> — how well your wording matches recruiter searches.</li>
          <li><b className="text-slate-800">Content (20%)</b> — strong action verbs and quantified achievements.</li>
          <li><b className="text-slate-800">Formatting (15%)</b> — section headers, bullets, page count, length.</li>
          <li><b className="text-slate-800">Education (10%)</b> — degree and education section signals.</li>
        </ul>
      </section>
    </div>
  );
}
