"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { parseFile } from "@/lib/parse";
import { analyzeResume } from "@/lib/analyze";

const ROLES = [
  "Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full-Stack Engineer",
  "Data Scientist",
  "ML Engineer",
  "Product Manager",
  "Designer",
];

export default function UploadView() {
  const { addAnalysis, setView } = useStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");
  const [role, setRole] = useState(ROLES[0]);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setOkMsg(null);
      setBusy(true);
      try {
        setProgress("Reading file…");
        const parsed = await parseFile(file);
        if (!parsed.text.trim()) {
          throw new Error("Could not extract any text from this file.");
        }
        setProgress("Analyzing resume…");
        const analysis = analyzeResume({
          text: parsed.text,
          fileName: file.name,
          fileSize: file.size,
          fileType: parsed.fileType,
          pageCount: parsed.pageCount,
          role,
        });
        addAnalysis(analysis);
        setOkMsg(`Analysis complete — ATS score ${analysis.atsScore}.`);
        setTimeout(() => setView("Dashboard"), 700);
      } catch (e: any) {
        setError(e?.message || "Failed to process file.");
      } finally {
        setBusy(false);
        setProgress("");
      }
    },
    [addAnalysis, role, setView],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  return (
    <div className="mx-auto max-w-[1200px] px-8 py-7">
      <header>
        <h2 className="text-[22px] font-semibold text-slate-900">Upload Resume</h2>
        <p className="mt-1 text-[14px] text-slate-500">
          PDF or TXT. Parsed locally in your browser — nothing is sent to a server.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`rounded-2xl border-2 border-dashed bg-white p-12 text-center shadow-card transition ${
              dragging
                ? "border-brand-500 bg-brand-50/30"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
              {busy ? (
                <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
              ) : (
                <UploadCloud className="h-7 w-7 text-brand-600" />
              )}
            </div>
            <h3 className="mt-5 text-[16px] font-semibold text-slate-900">
              {busy ? progress || "Working…" : "Drop your resume here"}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-slate-500">
              Drag and drop, or click to browse. Supported: PDF, TXT (max ~10MB).
            </p>

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.txt,application/pdf,text/plain"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleFile(f);
                e.target.value = "";
              }}
            />

            <button
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-50"
            >
              <FileText className="h-4 w-4" />
              Choose File
            </button>

            {error && (
              <div className="mx-auto mt-5 flex max-w-md items-start gap-2 rounded-lg bg-rose-50 px-4 py-3 text-left text-[13px] text-rose-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {okMsg && (
              <div className="mx-auto mt-5 flex max-w-md items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-left text-[13px] text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{okMsg}</span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-[#EEF0F4]">
            <h3 className="text-[15px] font-semibold text-slate-900">
              Target Role
            </h3>
            <p className="mt-1 text-[12px] text-slate-500">
              Used to tailor keyword and skill matching.
            </p>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[13px] text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <h4 className="text-[13px] font-semibold text-slate-900">
                What we analyse
              </h4>
              <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-slate-500">
                <li>• ATS-readable structure</li>
                <li>• Skill / keyword coverage for the target role</li>
                <li>• Quantified achievements & action verbs</li>
                <li>• Section completeness and formatting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
