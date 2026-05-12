"use client";

import {
  UploadCloud,
  User,
  Briefcase,
  FileText,
  Search,
  PenSquare,
} from "lucide-react";
import ATSScoreCard from "./ATSScoreCard";
import StatCard from "./StatCard";
import ScoreBreakdown from "./ScoreBreakdown";
import ResumeFileCard from "./ResumeFileCard";
import Suggestions from "./Suggestions";
import EmptyState from "./EmptyState";
import { useStore } from "@/lib/store";
import { qualitativeStatus, statusTone } from "@/lib/format";

export default function Dashboard() {
  const { current, setView } = useStore();

  return (
    <div className="mx-auto max-w-[1200px] px-8 py-7">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-[22px] font-semibold text-slate-900">
            Hi, Developer! <span className="text-[22px]">👋</span>
          </h2>
          <p className="mt-1 text-[14px] text-slate-500">
            {current
              ? "Here's your resume analysis overview."
              : "Upload a resume to get a personalised analysis."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("Upload Resume")}
            className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-brand-700"
          >
            <UploadCloud className="h-4 w-4" />
            Upload New Resume
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-[#EEF0F4] transition hover:bg-slate-50">
            <User className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </header>

      {!current ? (
        <EmptyState
          className="mt-7"
          title="No resume analyzed yet"
          message="Upload a PDF or TXT resume to see your ATS score, skill match, and tailored suggestions."
          ctaLabel="Upload Resume"
          onCta={() => setView("Upload Resume")}
        />
      ) : (
        <>
          <section className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-1">
              <ATSScoreCard score={current.atsScore} />
            </div>
            <div className="grid grid-cols-2 gap-5 lg:col-span-4 lg:grid-cols-4">
              <StatCard
                icon={Briefcase}
                value={`${current.skillsMatch}%`}
                title="Skills Match"
                status={qualitativeStatus(current.skillsMatch)}
                tone={statusTone(current.skillsMatch)}
              />
              <StatCard
                icon={FileText}
                value={`${current.contentQuality}%`}
                title="Content Quality"
                status={qualitativeStatus(current.contentQuality)}
                tone={statusTone(current.contentQuality)}
              />
              <StatCard
                icon={Search}
                value={`${current.keywordMatch}%`}
                title="Keyword Match"
                status={qualitativeStatus(current.keywordMatch)}
                tone={statusTone(current.keywordMatch)}
              />
              <StatCard
                icon={PenSquare}
                value={`${current.formatting}%`}
                title="Formatting"
                status={qualitativeStatus(current.formatting)}
                tone={statusTone(current.formatting)}
              />
            </div>
          </section>

          <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ScoreBreakdown rows={current.scoreBreakdown} />
            </div>
            <div className="lg:col-span-2">
              <ResumeFileCard
                fileName={current.fileName}
                fileSize={current.fileSize}
                fileType={current.fileType}
                pageCount={current.pageCount}
                uploadedAt={current.uploadedAt}
                onView={() => setView("Analysis")}
              />
            </div>
          </section>

          <section className="mt-5">
            <Suggestions items={current.suggestions} />
          </section>
        </>
      )}
    </div>
  );
}
