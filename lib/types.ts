export type ScoreTone = "emerald" | "amber" | "blue" | "violet";

export type CategoryScore = {
  label: string;
  value: number;
  color: string;
};

export type Suggestion = {
  id: string;
  text: string;
  tone: "violet" | "emerald" | "amber" | "sky";
  iconKey: "trend" | "key" | "star" | "code" | "shield" | "edit";
};

export type Analysis = {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  pageCount: number;
  uploadedAt: number;
  atsScore: number;
  skillsMatch: number;
  contentQuality: number;
  keywordMatch: number;
  formatting: number;
  scoreBreakdown: CategoryScore[];
  suggestions: Suggestion[];
  detectedSkills: string[];
  missingSkills: string[];
  resumeText: string;
  role: string;
};

export type ViewName =
  | "Dashboard"
  | "Upload Resume"
  | "Analysis"
  | "ATS Score"
  | "Suggestions"
  | "Courses"
  | "History"
  | "Profile"
  | "Settings";
