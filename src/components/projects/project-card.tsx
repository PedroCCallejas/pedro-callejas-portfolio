import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/project";
import { ProjectFlow } from "./project-flow";

export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  flowActive?: boolean;
  compact?: boolean;
}) {
  const destination = project.href ?? `/work/${project.slug}`;
  const external = Boolean(project.href);

  return (
    <article className={compact ? "project-card project-card--compact" : "project-card"}>
      <div className="project-card__visual" aria-hidden="true">
        <span>{compact ? "print —" : "print do produto —"}</span>
        <strong>{project.shortTitle}</strong>
      </div>

      <div className="project-card__content">
        <div className="project-card__meta">
          <span className={`status status--${project.status}`}><i />{project.statusLabel}</span>
          {compact ? null : <span className="mono text-muted">{project.year}</span>}
        </div>
        <h3>{project.title}</h3>
        <p className="project-statement">{project.statement}</p>
        {compact ? null : <p className="project-summary">{project.summary}</p>}
        <div className="project-tags">
          {project.stack.slice(0, compact ? 5 : 8).map((item) => <span key={item}>{item}</span>)}
        </div>
        {compact ? null : <ProjectFlow steps={project.architecture} />}
        <Link
          className="text-link focus-ring"
          href={destination}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          {compact ? "Explorar" : "Explorar projeto"} <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  );
}
