"use client";

import { useStore } from "@/lib/store";
import Suggestions from "./Suggestions";
import EmptyState from "./EmptyState";

export default function SuggestionsView() {
  const { current, setView } = useStore();

  if (!current) {
    return (
      <div className="mx-auto max-w-[1200px] px-8 py-7">
        <h2 className="text-[22px] font-semibold text-slate-900">Suggestions</h2>
        <EmptyState
          className="mt-6"
          title="No suggestions yet"
          message="Upload your resume to receive personalised improvement suggestions."
          ctaLabel="Upload Resume"
          onCta={() => setView("Upload Resume")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-8 py-7">
      <header>
        <h2 className="text-[22px] font-semibold text-slate-900">Suggestions</h2>
        <p className="mt-1 text-[14px] text-slate-500">
          Actionable improvements based on your latest resume.
        </p>
      </header>

      <section className="mt-6">
        <Suggestions items={current.suggestions} />
      </section>
    </div>
  );
}
