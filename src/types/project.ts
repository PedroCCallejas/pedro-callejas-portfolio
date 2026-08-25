export type ProjectStatus = "building" | "production";

export type Project = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  statement: string;
  summary: string;
  status: ProjectStatus;
  statusLabel: string;
  year: string;
  href?: string;
  stack: string[];
  features: string[];
  architecture: string[];
  problem: string;
  solution: string;
  challenges: string[];
  learnings: string[];
  results: string;
};
