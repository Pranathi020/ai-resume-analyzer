import type { Analysis, CategoryScore, Suggestion } from "./types";

const SKILL_KEYWORDS: Record<string, string[]> = {
  react: ["react", "reactjs", "react.js"],
  typescript: ["typescript", "ts"],
  nextjs: ["next.js", "nextjs", "next js"],
  nodejs: ["node.js", "nodejs", "node js"],
  python: ["python"],
  sql: ["sql", "postgres", "mysql", "postgresql", "sqlite"],
  docker: ["docker"],
  kubernetes: ["kubernetes", "k8s"],
  aws: ["aws", "amazon web services", "ec2", "s3", "lambda"],
  git: ["git", "github", "gitlab"],
  testing: ["jest", "vitest", "cypress", "playwright", "unit test", "integration test"],
  graphql: ["graphql"],
  rest: ["rest api", "rest", "restful"],
  redux: ["redux", "zustand", "mobx", "state management"],
  tailwind: ["tailwind", "tailwindcss"],
  system_design: ["system design", "scalability", "distributed systems", "microservices"],
  data_structures: ["data structures", "algorithms", "leetcode"],
  javascript: ["javascript", "js", "ecmascript"],
  html_css: ["html", "css", "scss", "sass"],
  java: ["java", "spring", "spring boot"],
  go: ["golang"],
  rust: ["rust"],
  ml: ["machine learning", "ml", "tensorflow", "pytorch", "scikit-learn"],
  data: ["pandas", "numpy", "data analysis", "etl"],
};

const ACTION_VERBS = [
  "led",
  "built",
  "designed",
  "developed",
  "implemented",
  "optimized",
  "reduced",
  "increased",
  "delivered",
  "shipped",
  "owned",
  "architected",
  "migrated",
  "automated",
  "mentored",
  "launched",
  "scaled",
  "improved",
];

const SECTION_HEADERS = [
  "experience",
  "education",
  "skills",
  "projects",
  "summary",
  "objective",
  "certifications",
  "awards",
];

const COMMON_DEGREES = [
  "bachelor",
  "master",
  "phd",
  "mba",
  "b.s.",
  "m.s.",
  "b.a.",
  "m.a.",
  "bsc",
  "msc",
  "btech",
  "mtech",
];

function lower(s: string) {
  return s.toLowerCase();
}

function detectSkills(text: string): string[] {
  const found: string[] = [];
  const t = lower(text);
  for (const [key, variants] of Object.entries(SKILL_KEYWORDS)) {
    const hit = variants.some((v) => {
      const escaped = v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(t);
    });
    if (hit) found.push(key);
  }
  return found;
}

function countMatches(text: string, words: string[]): number {
  const t = lower(text);
  let n = 0;
  for (const w of words) {
    const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
    const m = t.match(re);
    if (m) n += m.length;
  }
  return n;
}

function countQuantifiedAchievements(text: string): number {
  const lines = text.split(/\n+/);
  let count = 0;
  for (const line of lines) {
    if (/\b\d+(\.\d+)?\s*(%|percent|users?|customers?|requests?|hours?|days?|weeks?|months?|years?|x|k|m|b)\b/i.test(line)) {
      count++;
    } else if (/\$\s?\d/.test(line)) {
      count++;
    }
  }
  return count;
}

function countBulletLines(text: string): number {
  return text.split(/\n+/).filter((l) => /^\s*([•\-\*•]|\d+\.)\s+/.test(l)).length;
}

function clamp(n: number, lo = 0, hi = 100): number {
  return Math.max(lo, Math.min(hi, Math.round(n)));
}

function pickSuggestion(id: string, text: string, tone: Suggestion["tone"], iconKey: Suggestion["iconKey"]): Suggestion {
  return { id, text, tone, iconKey };
}

const PRIORITY_SKILLS = [
  "react",
  "typescript",
  "nextjs",
  "nodejs",
  "python",
  "sql",
  "docker",
  "aws",
  "git",
  "testing",
  "rest",
  "tailwind",
  "system_design",
  "data_structures",
];

export function analyzeResume(input: {
  text: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  pageCount: number;
  role?: string;
}): Analysis {
  const { text, fileName, fileSize, fileType, pageCount } = input;
  const role = input.role || "Software Engineer";
  const cleaned = text.replace(/ /g, " ").replace(/[ \t]+/g, " ");
  const wordCount = cleaned.trim().split(/\s+/).length;

  const detected = detectSkills(cleaned);
  const detectedSet = new Set(detected);
  const missing = PRIORITY_SKILLS.filter((s) => !detectedSet.has(s));

  const skillsMatch = clamp((detected.length / Math.max(8, PRIORITY_SKILLS.length / 1.5)) * 100);

  const actionVerbHits = countMatches(cleaned, ACTION_VERBS);
  const quantified = countQuantifiedAchievements(cleaned);
  const sectionHits = SECTION_HEADERS.filter((h) => new RegExp(`\\b${h}\\b`, "i").test(cleaned)).length;
  const hasDegree = COMMON_DEGREES.some((d) => cleaned.toLowerCase().includes(d));
  const bullets = countBulletLines(cleaned);

  const contentQuality = clamp(
    40 +
      Math.min(30, actionVerbHits * 3) +
      Math.min(20, quantified * 4) +
      Math.min(10, sectionHits * 2),
  );

  const keywordMatch = clamp(
    50 +
      Math.min(40, detected.length * 4) +
      (detectedSet.has("git") ? 5 : 0) +
      (detectedSet.has("testing") ? 5 : 0),
  );

  const formatting = clamp(
    30 +
      Math.min(25, bullets * 2) +
      Math.min(20, sectionHits * 3) +
      (wordCount >= 250 && wordCount <= 900 ? 15 : wordCount > 0 ? 5 : 0) +
      (pageCount >= 1 && pageCount <= 2 ? 10 : 0),
  );

  const experienceScore = clamp(
    35 +
      Math.min(35, actionVerbHits * 3) +
      Math.min(20, quantified * 4) +
      (sectionHits >= 3 ? 10 : 0),
  );
  const educationScore = clamp(
    (hasDegree ? 70 : 45) + (cleaned.toLowerCase().includes("education") ? 15 : 0) + Math.min(15, sectionHits * 2),
  );

  const atsScore = clamp(
    skillsMatch * 0.3 +
      contentQuality * 0.2 +
      keywordMatch * 0.25 +
      formatting * 0.15 +
      educationScore * 0.1,
  );

  const scoreBreakdown: CategoryScore[] = [
    { label: "Skills", value: skillsMatch, color: "bg-brand-500" },
    { label: "Experience", value: experienceScore, color: "bg-sky-500" },
    { label: "Education", value: educationScore, color: "bg-emerald-500" },
    { label: "Keywords", value: keywordMatch, color: "bg-amber-500" },
    { label: "Formatting", value: formatting, color: "bg-violet-500" },
  ];

  const suggestions: Suggestion[] = [];
  if (quantified < 3) {
    suggestions.push(
      pickSuggestion(
        "quantify",
        "Add more quantifiable achievements (numbers, %, $, users) to your experience.",
        "violet",
        "trend",
      ),
    );
  }
  if (detected.length < 8) {
    suggestions.push(
      pickSuggestion(
        "keywords",
        `Include more keywords relevant to ${role} — you're missing common ones like ${missing.slice(0, 3).join(", ")}.`,
        "emerald",
        "key",
      ),
    );
  }
  if (!/\bsummary\b/i.test(cleaned) && !/\bobjective\b/i.test(cleaned)) {
    suggestions.push(
      pickSuggestion(
        "summary",
        "Add a short summary or objective at the top of your resume.",
        "amber",
        "star",
      ),
    );
  }
  if (!detectedSet.has("testing")) {
    suggestions.push(
      pickSuggestion(
        "tests",
        "Mention automated testing experience (Jest, Vitest, Playwright, etc.) — recruiters search for it.",
        "sky",
        "code",
      ),
    );
  }
  if (actionVerbHits < 6) {
    suggestions.push(
      pickSuggestion(
        "verbs",
        "Open bullet points with strong action verbs (Led, Built, Shipped, Optimized).",
        "violet",
        "edit",
      ),
    );
  }
  if (formatting < 70) {
    suggestions.push(
      pickSuggestion(
        "format",
        "Use consistent bullet points and clear section headers — keep total length to 1–2 pages.",
        "amber",
        "shield",
      ),
    );
  }
  if (suggestions.length === 0) {
    suggestions.push(
      pickSuggestion(
        "polish",
        "Your resume covers the basics well — fine-tune wording and tailor keywords per job posting.",
        "emerald",
        "star",
      ),
    );
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    fileName,
    fileSize,
    fileType,
    pageCount,
    uploadedAt: Date.now(),
    atsScore,
    skillsMatch,
    contentQuality,
    keywordMatch,
    formatting,
    scoreBreakdown,
    suggestions: suggestions.slice(0, 6),
    detectedSkills: detected,
    missingSkills: missing,
    resumeText: cleaned.slice(0, 50000),
    role,
  };
}
