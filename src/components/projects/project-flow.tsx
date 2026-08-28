"use client";

import { motion } from "motion/react";

type FlowSchedule = {
  delay: number;
  duration: number;
};

type FlowPass = {
  start: FlowSchedule;
  nodes: FlowSchedule[];
  connectors: FlowSchedule[];
  end: FlowSchedule;
  finish: number;
};

type FlowDirection = "forward" | "reverse";

const EDGE_DURATION = 0.42;
const NODE_DURATION = 0.92;
const CONNECTOR_DURATION = 0.2;
const HANDOFF_OVERLAP = 0.08;
const TURNAROUND_OVERLAP = 0.12;

function createForwardPass(stepCount: number, offset = 0): FlowPass {
  let cursor = offset;
  const start: FlowSchedule = { delay: cursor, duration: EDGE_DURATION };
  cursor += EDGE_DURATION - HANDOFF_OVERLAP;

  const nodes: FlowSchedule[] = [];
  const connectors: FlowSchedule[] = [];

  for (let index = 0; index < stepCount; index += 1) {
    nodes[index] = { delay: cursor, duration: NODE_DURATION };
    cursor += NODE_DURATION - HANDOFF_OVERLAP;

    if (index < stepCount - 1) {
      connectors[index] = { delay: cursor, duration: CONNECTOR_DURATION };
      cursor += CONNECTOR_DURATION - HANDOFF_OVERLAP;
    }
  }

  const end: FlowSchedule = { delay: cursor, duration: EDGE_DURATION };
  return { start, nodes, connectors, end, finish: cursor + EDGE_DURATION };
}

function createReversePass(stepCount: number, offset: number): FlowPass {
  let cursor = offset;
  const end: FlowSchedule = { delay: cursor, duration: EDGE_DURATION };
  cursor += EDGE_DURATION - HANDOFF_OVERLAP;

  const nodes: FlowSchedule[] = [];
  const connectors: FlowSchedule[] = [];

  for (let index = stepCount - 1; index >= 0; index -= 1) {
    nodes[index] = { delay: cursor, duration: NODE_DURATION };
    cursor += NODE_DURATION - HANDOFF_OVERLAP;

    if (index > 0) {
      connectors[index - 1] = { delay: cursor, duration: CONNECTOR_DURATION };
      cursor += CONNECTOR_DURATION - HANDOFF_OVERLAP;
    }
  }

  const start: FlowSchedule = { delay: cursor, duration: EDGE_DURATION };
  return { start, nodes, connectors, end, finish: cursor + EDGE_DURATION };
}

function createJourney(stepCount: number) {
  const forward = createForwardPass(stepCount);
  const reverse = createReversePass(stepCount, forward.finish - TURNAROUND_OVERLAP);
  return { forward, reverse, cycle: reverse.finish - TURNAROUND_OVERLAP };
}

function repeatTransition(schedule: FlowSchedule, cycle: number) {
  return {
    duration: schedule.duration,
    delay: schedule.delay,
    times: [0, 0.08, 0.86, 1],
    ease: "linear" as const,
    repeat: Number.POSITIVE_INFINITY,
    repeatDelay: cycle - schedule.duration,
  };
}

function FlowLine({
  schedule,
  cycle,
  kind,
  direction,
  active,
}: {
  schedule: FlowSchedule;
  cycle: number;
  kind: "edge" | "connector";
  direction: FlowDirection;
  active: boolean;
}) {
  const width = kind === "edge" ? 16 : 12;
  const positions = direction === "forward"
    ? [`-${width}px`, `-${width / 2}px`, "calc(100% - 4px)", "100%"]
    : ["100%", "calc(100% - 4px)", "0px", `-${width}px`];

  return (
    <motion.b
      className={`project-flow__pulse project-flow__pulse--${kind}`}
      initial={{ left: positions[0], opacity: 0 }}
      animate={active ? { left: positions, opacity: [0, 1, 1, 0] } : { opacity: 0 }}
      transition={active ? repeatTransition(schedule, cycle) : { duration: 0.15 }}
    />
  );
}

function FlowContour({
  schedule,
  cycle,
  direction,
  active,
}: {
  schedule: FlowSchedule;
  cycle: number;
  direction: FlowDirection;
  active: boolean;
}) {
  const paths = direction === "forward"
    ? ["M 1 25 V 1 H 99 V 25", "M 1 25 V 49 H 99 V 25"]
    : ["M 99 25 V 1 H 1 V 25", "M 99 25 V 49 H 1 V 25"];

  return (
    <svg aria-hidden="true" viewBox="0 0 100 50" preserveAspectRatio="none">
      {paths.map((path) => (
        <motion.path
          key={path}
          d={path}
          pathLength="1"
          initial={{ strokeDashoffset: 1, opacity: 0 }}
          animate={active
            ? { strokeDashoffset: [1, 0.96, 0.04, 0], opacity: [0, 1, 1, 0] }
            : { opacity: 0 }}
          transition={active ? repeatTransition(schedule, cycle) : { duration: 0.15 }}
        />
      ))}
    </svg>
  );
}

export function ProjectFlow({ steps, active = true }: { steps: string[]; active?: boolean }) {
  const journey = createJourney(steps.length);

  return (
    <div
      className={`project-flow${active ? " project-flow--active" : ""}`}
      aria-label={`Fluxo: ${steps.join(", ")}`}
    >
      <i className="project-flow__edge project-flow__edge--start" aria-hidden="true">
        <FlowLine schedule={journey.forward.start} cycle={journey.cycle} kind="edge" direction="forward" active={active} />
        <FlowLine schedule={journey.reverse.start} cycle={journey.cycle} kind="edge" direction="reverse" active={active} />
      </i>
      {steps.map((step, index) => (
        <div className="project-flow__step" key={step}>
          <span className="project-flow__node">
            {step}
            <FlowContour schedule={journey.forward.nodes[index]} cycle={journey.cycle} direction="forward" active={active} />
            <FlowContour schedule={journey.reverse.nodes[index]} cycle={journey.cycle} direction="reverse" active={active} />
          </span>
          {index < steps.length - 1 ? (
            <i className="project-flow__connector" aria-hidden="true">
              <FlowLine schedule={journey.forward.connectors[index]} cycle={journey.cycle} kind="connector" direction="forward" active={active} />
              <FlowLine schedule={journey.reverse.connectors[index]} cycle={journey.cycle} kind="connector" direction="reverse" active={active} />
            </i>
          ) : null}
        </div>
      ))}
      <i className="project-flow__edge project-flow__edge--end" aria-hidden="true">
        <FlowLine schedule={journey.forward.end} cycle={journey.cycle} kind="edge" direction="forward" active={active} />
        <FlowLine schedule={journey.reverse.end} cycle={journey.cycle} kind="edge" direction="reverse" active={active} />
      </i>
    </div>
  );
}
