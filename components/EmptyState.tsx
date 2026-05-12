"use client";

import { UploadCloud } from "lucide-react";

export default function EmptyState({
  title,
  message,
  ctaLabel,
  onCta,
  className = "",
}: {
  title: string;
  message: string;
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-card ${className}`}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
        <UploadCloud className="h-6 w-6 text-brand-600" />
      </div>
      <h3 className="mt-4 text-[16px] font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-slate-500">
        {message}
      </p>
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-[13px] font-medium text-white shadow-sm transition hover:bg-brand-700"
        >
          <UploadCloud className="h-4 w-4" />
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
