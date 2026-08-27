import type { CSSProperties } from "react";

type FlowStageStyle = CSSProperties & {
  "--flow-order": number;
};

function flowStage(order: number): FlowStageStyle {
  return { "--flow-order": order };
}

export function ProjectFlow({ steps }: { steps: string[] }) {
  return (
    <div className="project-flow" aria-label={`Fluxo: ${steps.join(", ")}`}>
      <i className="project-flow__edge project-flow__edge--start" aria-hidden="true">
        <b style={flowStage(0)} />
      </i>
      {steps.map((step, index) => (
        <div className="project-flow__step" key={step}>
          <span className="project-flow__node">
            {step}
            <svg aria-hidden="true" viewBox="0 0 100 50" preserveAspectRatio="none">
              <rect style={flowStage(index * 2 + 1)} x="1" y="1" width="98" height="48" pathLength="1" />
            </svg>
          </span>
          {index < steps.length - 1 && (
            <i className="project-flow__connector" aria-hidden="true">
              <b style={flowStage(index * 2 + 2)} />
            </i>
          )}
        </div>
      ))}
      <i className="project-flow__edge project-flow__edge--end" aria-hidden="true">
        <b style={flowStage(steps.length * 2)} />
      </i>
    </div>
  );
}
