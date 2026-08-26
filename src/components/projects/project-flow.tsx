export function ProjectFlow({ steps }: { steps: string[] }) {
  return (
    <div className="project-flow" aria-label={`Fluxo: ${steps.join(", ")}`}>
      <i className="project-flow__edge project-flow__edge--start" aria-hidden="true"><b /></i>
      {steps.map((step, index) => (
        <div className="project-flow__step" key={step}>
          <span>{step}</span>
          {index < steps.length - 1 && <i aria-hidden="true"><b /></i>}
        </div>
      ))}
      <i className="project-flow__edge project-flow__edge--end" aria-hidden="true"><b /></i>
    </div>
  );
}
