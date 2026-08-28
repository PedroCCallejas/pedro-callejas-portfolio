"use client";

import type { CSSProperties } from "react";

type FlowSchedule = {
  delay: number;
  duration: number;
};

type FlowStyle = CSSProperties & {
  "--flow-cycle": string;
  "--flow-delay": string;
};

const EDGE_DURATION = 0.32;
const NODE_DURATION = 0.8;
const CONNECTOR_DURATION = 0.14;
const CYCLE_PAUSE = 0.12;
const HANDOFF_OVERLAP = 0.045;

function createSchedule(stepCount: number) {
  let cursor = 0;
  const start: FlowSchedule = { delay: cursor, duration: EDGE_DURATION };
  cursor += EDGE_DURATION - HANDOFF_OVERLAP;

  const nodes: FlowSchedule[] = [];
  const connectors: FlowSchedule[] = [];

  for (let index = 0; index < stepCount; index += 1) {
    nodes.push({ delay: cursor, duration: NODE_DURATION });
    cursor += NODE_DURATION - HANDOFF_OVERLAP;

    if (index < stepCount - 1) {
      connectors.push({ delay: cursor, duration: CONNECTOR_DURATION });
      cursor += CONNECTOR_DURATION - HANDOFF_OVERLAP;
    }
  }

  const end: FlowSchedule = { delay: cursor, duration: EDGE_DURATION };
  const cycle = cursor + EDGE_DURATION + CYCLE_PAUSE;

  return { start, nodes, connectors, end, cycle };
}

function flowStyle(schedule: FlowSchedule, cycle: number): FlowStyle {
  return {
    "--flow-cycle": `${cycle}s`,
    "--flow-delay": `${schedule.delay}s`,
  };
}

function FlowLine({
  schedule,
  cycle,
  kind,
}: {
  schedule: FlowSchedule;
  cycle: number;
  kind: "edge" | "connector";
}) {
  return <b className={`project-flow__pulse project-flow__pulse--${kind}`} style={flowStyle(schedule, cycle)} />;
}

function FlowContour({ schedule, cycle }: { schedule: FlowSchedule; cycle: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 50" preserveAspectRatio="none">
      <path d="M 1 25 V 1 H 99 V 25" pathLength="1" style={flowStyle(schedule, cycle)} />
      <path d="M 1 25 V 49 H 99 V 25" pathLength="1" style={flowStyle(schedule, cycle)} />
    </svg>
  );
}

export function ProjectFlow({ steps, active = true }: { steps: string[]; active?: boolean }) {
  const schedule = createSchedule(steps.length);

  return (
    <div
      className={`project-flow${active ? " project-flow--active" : ""}`}
      aria-label={`Fluxo: ${steps.join(", ")}`}
    >
      <i className="project-flow__edge project-flow__edge--start" aria-hidden="true">
        <FlowLine schedule={schedule.start} cycle={schedule.cycle} kind="edge" />
      </i>
      {steps.map((step, index) => (
        <div className="project-flow__step" key={step}>
          <span className="project-flow__node">
            {step}
            <FlowContour schedule={schedule.nodes[index]} cycle={schedule.cycle} />
          </span>
          {index < steps.length - 1 && (
            <i className="project-flow__connector" aria-hidden="true">
              <FlowLine schedule={schedule.connectors[index]} cycle={schedule.cycle} kind="connector" />
            </i>
          )}
        </div>
      ))}
      <i className="project-flow__edge project-flow__edge--end" aria-hidden="true">
        <FlowLine schedule={schedule.end} cycle={schedule.cycle} kind="edge" />
      </i>
    </div>
  );
}
