"use client";

import { Eye, FileText, HardDrive, File } from "lucide-react";
import { formatDate, formatFileSize } from "@/lib/format";

export default function ResumeFileCard({
  fileName,
  fileSize,
  fileType,
  pageCount,
  uploadedAt,
  onView,
}: {
  fileName: string;
  fileSize: number;
  fileType: string;
  pageCount: number;
  uploadedAt: number;
  onView?: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-[#EEF0F4]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50">
          <span className="text-[10px] font-bold text-rose-600">
            {fileType.toUpperCase().slice(0, 4)}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-slate-900">
            {fileName}
          </h3>
          <p className="text-[12px] text-slate-500">
            Uploaded on {formatDate(uploadedAt)}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
        <Row icon={FileText} label="Pages" value={String(pageCount)} />
        <Row icon={HardDrive} label="File Size" value={formatFileSize(fileSize)} />
        <Row icon={File} label="File Type" value={fileType} />
      </div>

      <button
        onClick={onView}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-50 px-3 py-2.5 text-[13px] font-medium text-brand-600 transition hover:bg-brand-100"
      >
        <Eye className="h-4 w-4" />
        View Full Analysis
      </button>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[13px] text-slate-500">
        <Icon className="h-4 w-4 text-slate-400" />
        {label}
      </div>
      <span className="text-[13px] font-semibold text-slate-700">{value}</span>
    </div>
  );
}
