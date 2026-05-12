import type { ScoreTone } from "./types";

export function qualitativeStatus(n: number): string {
  if (n >= 85) return "Excellent";
  if (n >= 70) return "Great";
  if (n >= 55) return "Good";
  if (n >= 40) return "Fair";
  return "Needs Work";
}

export function statusTone(n: number): ScoreTone {
  if (n >= 85) return "emerald";
  if (n >= 70) return "blue";
  if (n >= 55) return "amber";
  return "violet";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return formatDate(ts);
}
