"use client";

export default function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-[1200px] px-8 py-7">
      <h2 className="text-[22px] font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-[14px] text-slate-500">Coming soon.</p>
    </div>
  );
}
