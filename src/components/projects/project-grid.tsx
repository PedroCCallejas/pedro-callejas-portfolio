import type { Project } from "@/types/project";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const production = projects.filter((project) => project.status === "production");
  const building = projects.filter((project) => project.status === "building");
  const [flagship, ...rest] = production;

  return (
    <div className="project-grid">
      {flagship ? (
        <div className="project-grid__feature">
          <ProjectCard project={flagship} flowActive />
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="project-grid__row">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} flowActive={false} compact />
          ))}
        </div>
      ) : null}

      {building.length > 0 ? (
        <div className="project-grid__building">
          <p className="eyebrow" style={{ color: "#f0b569" }}>Em construção</p>
          <ul className="project-mini-list">
            {building.map((project) => (
              <li key={project.slug} className="project-mini">
                <div className="project-mini__heading">
                  <div className="project-mini__meta">
                    <span className="mono text-muted">{project.index}</span>
                    <span className="project-mini__status"><i />{project.statusLabel}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.statement}</p>
                </div>
                <div className="project-mini__tags">
                  {project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
