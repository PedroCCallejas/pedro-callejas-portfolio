import type { Project } from "@/types/project";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const production = projects.filter((project) => project.status === "production");
  const building = projects.filter((project) => project.status === "building");
  const [flagship, ...rest] = production;

  return (
    <div className="project-grid">
      <p className="project-grid__label project-grid__label--production">Sistemas em produção</p>

      {flagship ? <ProjectCard project={flagship} /> : null}

      {rest.length > 0 ? (
        <div className="project-grid__row">
          {rest.map((project) => <ProjectCard key={project.slug} project={project} compact />)}
        </div>
      ) : null}

      {building.length > 0 ? (
        <div className="project-grid__building">
          <p className="project-grid__label project-grid__label--building">Em construção</p>
          <div className="project-mini-list">
            {building.map((project) => (
              <article key={project.slug} className="project-mini">
                <div className="project-mini__heading">
                  <div className="project-mini__meta">
                    <span className="mono text-muted">{project.index}</span>
                    <span className="project-mini__status"><i />{project.statusLabel}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.statement}</p>
                </div>
                <div className="project-mini__tags">
                  {project.stack.slice(0, 5).map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
