"use client";

import { FileText, Trash2, Eye, Clock } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatDate, formatFileSize, formatRelative } from "@/lib/format";
import { qualitativeStatus, statusTone } from "@/lib/format";
import EmptyState from "./EmptyState";

const TONE_PILL: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700",
  blue: "bg-sky-50 text-sky-700",
  amber: "bg-amber-50 text-amber-700",
  violet: "bg-violet-50 text-violet-700",
};

export default function HistoryView() {
  const { history, current, selectAnalysis, removeAnalysis, clearHistory, setView } =
    useStore();

  if (history.length === 0) {
    return (
      <div className="mx-auto max-w-[1200px] px-8 py-7">
        <h2 className="text-[22px] font-semibold text-slate-900">History</h2>
        <EmptyState
          className="mt-6"
          title="No uploads yet"
          message="Your previous resume analyses will appear here."
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
          <h2 className="text-[22px] font-semibold text-slate-900">History</h2>
          <p className="mt-1 text-[14px] text-slate-500">
            {history.length} resume{history.length === 1 ? "" : "s"} analysed. Click any row to load it.
          </p>
        </div>
        <button
          onClick={() => {
            if (confirm("Clear all history? This cannot be undone.")) clearHistory();
          }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Clear history
        </button>
      </header>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-[#EEF0F4]">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">File</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">ATS</th>
              <th className="px-6 py-3 font-medium">Size</th>
              <th className="px-6 py-3 font-medium">Uploaded</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((a) => {
              const isCurrent = current?.id === a.id;
              const tone = statusTone(a.atsScore);
              return (
                <tr
                  key={a.id}
                  className={`transition hover:bg-slate-50 ${
                    isCurrent ? "bg-brand-50/40" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50">
                        <FileText className="h-4 w-4 text-rose-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium text-slate-900">
                          {a.fileName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {a.pageCount} page{a.pageCount === 1 ? "" : "s"} · {a.fileType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{a.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium ${TONE_PILL[tone]}`}
                    >
                      {a.atsScore} · {qualitativeStatus(a.atsScore)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {formatFileSize(a.fileSize)}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span title={formatDate(a.uploadedAt)}>
                        {formatRelative(a.uploadedAt)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => {
                          selectAnalysis(a.id);
                          setView("Analysis");
                        }}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-brand-600 hover:bg-brand-50"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${a.fileName}"?`)) removeAnalysis(a.id);
                        }}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-slate-500 hover:bg-slate-100 hover:text-rose-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
