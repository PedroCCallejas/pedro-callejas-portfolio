export function ProjectFlow({ steps }: { steps: string[]; active?: boolean }) {
  return (
    <div className="project-flow" aria-label={`Fluxo: ${steps.join(", ")}`}>
      {steps.map((step, index) => (
        <div className="project-flow__step" key={step}>
          <span className="project-flow__node">{step}</span>
          {index < steps.length - 1 ? <span className="project-flow__arrow" aria-hidden="true">→</span> : null}
        </div>
      ))}
    </div>
  );
}
