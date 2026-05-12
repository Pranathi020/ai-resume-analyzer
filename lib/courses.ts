export type Course = {
  title: string;
  provider: string;
  url: string;
  hours: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  free: boolean;
};

export type SkillCourses = {
  skill: string;
  blurb: string;
  courses: Course[];
};

export const COURSE_CATALOG: Record<string, SkillCourses> = {
  react: {
    skill: "React",
    blurb: "Component-based UI library used by most modern frontend stacks.",
    courses: [
      {
        title: "React — The Complete Guide",
        provider: "Scrimba",
        url: "https://scrimba.com/learn/learnreact",
        hours: 12,
        level: "Beginner",
        free: true,
      },
      {
        title: "Epic React",
        provider: "Kent C. Dodds",
        url: "https://epicreact.dev",
        hours: 40,
        level: "Intermediate",
        free: false,
      },
      {
        title: "React Official Tutorial",
        provider: "react.dev",
        url: "https://react.dev/learn",
        hours: 6,
        level: "Beginner",
        free: true,
      },
    ],
  },
  typescript: {
    skill: "TypeScript",
    blurb: "Adds static types to JavaScript — expected in most modern teams.",
    courses: [
      {
        title: "TypeScript Handbook",
        provider: "typescriptlang.org",
        url: "https://www.typescriptlang.org/docs/handbook/intro.html",
        hours: 8,
        level: "Beginner",
        free: true,
      },
      {
        title: "Total TypeScript",
        provider: "Matt Pocock",
        url: "https://www.totaltypescript.com",
        hours: 20,
        level: "Intermediate",
        free: false,
      },
    ],
  },
  nextjs: {
    skill: "Next.js",
    blurb: "Full-stack React framework — common in production frontends.",
    courses: [
      {
        title: "Learn Next.js",
        provider: "Vercel",
        url: "https://nextjs.org/learn",
        hours: 10,
        level: "Intermediate",
        free: true,
      },
    ],
  },
  nodejs: {
    skill: "Node.js",
    blurb: "JavaScript runtime for backend services and tooling.",
    courses: [
      {
        title: "Node.js Crash Course",
        provider: "freeCodeCamp",
        url: "https://www.freecodecamp.org/news/learn-node-js-full-course/",
        hours: 8,
        level: "Beginner",
        free: true,
      },
    ],
  },
  python: {
    skill: "Python",
    blurb: "General-purpose language dominant in data, ML, and scripting.",
    courses: [
      {
        title: "CS50 Python",
        provider: "Harvard / edX",
        url: "https://cs50.harvard.edu/python/",
        hours: 30,
        level: "Beginner",
        free: true,
      },
      {
        title: "Automate the Boring Stuff",
        provider: "Al Sweigart",
        url: "https://automatetheboringstuff.com",
        hours: 20,
        level: "Beginner",
        free: true,
      },
    ],
  },
  sql: {
    skill: "SQL",
    blurb: "Relational query language — required for nearly any backend role.",
    courses: [
      {
        title: "SQLBolt",
        provider: "sqlbolt.com",
        url: "https://sqlbolt.com",
        hours: 4,
        level: "Beginner",
        free: true,
      },
      {
        title: "Mode SQL Tutorial",
        provider: "Mode Analytics",
        url: "https://mode.com/sql-tutorial/",
        hours: 6,
        level: "Intermediate",
        free: true,
      },
    ],
  },
  docker: {
    skill: "Docker",
    blurb: "Containerization standard for shipping apps.",
    courses: [
      {
        title: "Docker for Beginners",
        provider: "Docker Inc.",
        url: "https://docker-curriculum.com",
        hours: 6,
        level: "Beginner",
        free: true,
      },
    ],
  },
  kubernetes: {
    skill: "Kubernetes",
    blurb: "Container orchestration — common at scale.",
    courses: [
      {
        title: "Kubernetes Basics",
        provider: "kubernetes.io",
        url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
        hours: 8,
        level: "Intermediate",
        free: true,
      },
    ],
  },
  aws: {
    skill: "AWS",
    blurb: "Most widely-used cloud platform.",
    courses: [
      {
        title: "AWS Cloud Practitioner Essentials",
        provider: "AWS Skill Builder",
        url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials",
        hours: 6,
        level: "Beginner",
        free: true,
      },
    ],
  },
  git: {
    skill: "Git",
    blurb: "Version control — table stakes for any engineering role.",
    courses: [
      {
        title: "Learn Git Branching",
        provider: "learngitbranching.js.org",
        url: "https://learngitbranching.js.org",
        hours: 3,
        level: "Beginner",
        free: true,
      },
    ],
  },
  testing: {
    skill: "Testing",
    blurb: "Automated tests signal engineering maturity to reviewers.",
    courses: [
      {
        title: "Testing JavaScript",
        provider: "Kent C. Dodds",
        url: "https://testingjavascript.com",
        hours: 25,
        level: "Intermediate",
        free: false,
      },
    ],
  },
  graphql: {
    skill: "GraphQL",
    blurb: "Query language for APIs — common in modern frontends.",
    courses: [
      {
        title: "How to GraphQL",
        provider: "howtographql.com",
        url: "https://www.howtographql.com",
        hours: 8,
        level: "Intermediate",
        free: true,
      },
    ],
  },
  rest: {
    skill: "REST APIs",
    blurb: "HTTP-based API design — foundational backend skill.",
    courses: [
      {
        title: "REST API Tutorial",
        provider: "restfulapi.net",
        url: "https://restfulapi.net",
        hours: 4,
        level: "Beginner",
        free: true,
      },
    ],
  },
  redux: {
    skill: "State Management",
    blurb: "Predictable state for complex React apps.",
    courses: [
      {
        title: "Redux Essentials",
        provider: "Redux Docs",
        url: "https://redux.js.org/tutorials/essentials/part-1-overview-concepts",
        hours: 6,
        level: "Intermediate",
        free: true,
      },
    ],
  },
  tailwind: {
    skill: "Tailwind CSS",
    blurb: "Utility-first CSS — common in modern UIs.",
    courses: [
      {
        title: "Tailwind From Zero to Production",
        provider: "Tailwind Labs",
        url: "https://www.youtube.com/playlist?list=PL5f_mz_zU5eXWYDXHUDOLBE0scnuJofO0",
        hours: 4,
        level: "Beginner",
        free: true,
      },
    ],
  },
  system_design: {
    skill: "System Design",
    blurb: "Designing scalable systems — required for senior interviews.",
    courses: [
      {
        title: "System Design Primer",
        provider: "GitHub / donnemartin",
        url: "https://github.com/donnemartin/system-design-primer",
        hours: 30,
        level: "Advanced",
        free: true,
      },
    ],
  },
  data_structures: {
    skill: "Data Structures & Algorithms",
    blurb: "Required for most technical interviews.",
    courses: [
      {
        title: "NeetCode 150",
        provider: "neetcode.io",
        url: "https://neetcode.io/practice",
        hours: 60,
        level: "Intermediate",
        free: true,
      },
    ],
  },
};

export function coursesForSkill(skillKey: string): SkillCourses | null {
  return COURSE_CATALOG[skillKey] ?? null;
}
