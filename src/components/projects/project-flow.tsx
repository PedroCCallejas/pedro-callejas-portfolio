"use client";

import { motion, type Transition } from "motion/react";

type FlowSchedule = {
  delay: number;
  duration: number;
};

const EDGE_DURATION = 0.32;
const NODE_DURATION = 0.8;
const CONNECTOR_DURATION = 0.14;
const CYCLE_PAUSE = 0.8;
const HANDOFF_OVERLAP = 0.018;

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

function traceTransition(schedule: FlowSchedule, cycle: number, active: boolean): Transition {
  if (!active) return { duration: 0 };

  const start = schedule.delay / cycle;
  const end = (schedule.delay + schedule.duration) / cycle;
  const fade = 0.006 / cycle;

  return {
    duration: cycle,
    ease: "linear",
    repeat: Infinity,
    times: [0, start, start + fade, end - fade, end, 1],
  };
}

function FlowLine({ schedule, cycle, active }: { schedule: FlowSchedule; cycle: number; active: boolean }) {
  return (
    <motion.b
      initial={false}
      animate={active
        ? {
            left: ["-16px", "-16px", "-12px", "calc(100% - 4px)", "100%", "100%"],
            opacity: [0, 0, 1, 1, 0, 0],
          }
        : { left: "-16px", opacity: 0 }}
      transition={traceTransition(schedule, cycle, active)}
    />
  );
}

function FlowContour({ schedule, cycle, active }: { schedule: FlowSchedule; cycle: number; active: boolean }) {
  const animation = active
    ? {
        strokeDashoffset: [1, 1, 0.96, 0.04, 0, 0],
        opacity: [0, 0, 1, 1, 0, 0],
      }
    : { strokeDashoffset: 1, opacity: 0 };
  const transition = traceTransition(schedule, cycle, active);

  return (
    <svg aria-hidden="true" viewBox="0 0 100 50" preserveAspectRatio="none">
      <motion.path
        d="M 1 25 V 1 H 99 V 25"
        pathLength="1"
        initial={false}
        animate={animation}
        transition={transition}
      />
      <motion.path
        d="M 1 25 V 49 H 99 V 25"
        pathLength="1"
        initial={false}
        animate={animation}
        transition={transition}
      />
    </svg>
  );
}

export function ProjectFlow({ steps, active = true }: { steps: string[]; active?: boolean }) {
  const schedule = createSchedule(steps.length);

  return (
    <div className="project-flow" aria-label={`Fluxo: ${steps.join(", ")}`}>
      <i className="project-flow__edge project-flow__edge--start" aria-hidden="true">
        <FlowLine schedule={schedule.start} cycle={schedule.cycle} active={active} />
      </i>
      {steps.map((step, index) => (
        <div className="project-flow__step" key={step}>
          <span className="project-flow__node">
            {step}
            <FlowContour schedule={schedule.nodes[index]} cycle={schedule.cycle} active={active} />
          </span>
          {index < steps.length - 1 && (
            <i className="project-flow__connector" aria-hidden="true">
              <FlowLine schedule={schedule.connectors[index]} cycle={schedule.cycle} active={active} />
            </i>
          )}
        </div>
      ))}
      <i className="project-flow__edge project-flow__edge--end" aria-hidden="true">
        <FlowLine schedule={schedule.end} cycle={schedule.cycle} active={active} />
      </i>
    </div>
  );
}
