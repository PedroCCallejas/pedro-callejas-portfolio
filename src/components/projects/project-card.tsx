import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/project";
import { ProjectFlow } from "./project-flow";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card__number" aria-hidden="true">{project.index}</div>
      <div className="project-card__content">
        <div className="project-card__meta">
          <span className={`status status--${project.status}`}><i />{project.statusLabel}</span>
          <span className="mono text-muted">{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-statement">{project.statement}</p>
        <p className="project-summary">{project.summary}</p>
        <div className="project-tags">
          {project.stack.slice(0, 5).map((item) => <span key={item}>{item}</span>)}
        </div>
        <Link className="text-link focus-ring" href={`/work/${project.slug}`}>
          Explorar case <ArrowUpRight size={16} />
        </Link>
      </div>
      <ProjectFlow steps={project.architecture} />
    </article>
  );
}
