import type { ComponentType } from "react";

type CapabilityKind = "systems" | "agents" | "automation";

type DiagramNodeProps = {
  label: string;
  width?: number;
  x: number;
  y: number;
  primary?: boolean;
};

function DiagramNode({ label, width = 76, x, y, primary = false }: DiagramNodeProps) {
  return (
    <g
      className={`capability-diagram__node${primary ? " capability-diagram__node--primary" : ""}`}
      transform={`translate(${x} ${y})`}
    >
      <rect width={width} height="30" rx="5" />
      <circle cx="12" cy="15" r="2.5" />
      <text x="22" y="18.5">{label}</text>
    </g>
  );
}

function SystemsDiagram() {
  return (
    <svg viewBox="0 0 360 190" role="presentation" focusable="false">
      <path className="capability-diagram__path" d="M180 48V80" />
      <path className="capability-diagram__path capability-diagram__path--delay" d="M218 95H252" />
      <path className="capability-diagram__path capability-diagram__path--delay-2" d="M180 110V142" />

      <DiagramNode label="UI" x={142} y={18} />
      <DiagramNode label="API" x={142} y={80} primary />
      <DiagramNode label="SERVIÇOS" width={100} x={252} y={80} />
      <DiagramNode label="DADOS" width={82} x={139} y={142} />

      <circle className="capability-diagram__pulse capability-diagram__pulse--systems-main" r="3" />
      <circle className="capability-diagram__pulse capability-diagram__pulse--systems-data" r="2.5" />
    </svg>
  );
}

function AgentsDiagram() {
  return (
    <svg viewBox="0 0 360 190" role="presentation" focusable="false">
      <path className="capability-diagram__path" d="M180 48V80" />
      <path className="capability-diagram__path capability-diagram__path--delay" d="M96 95H142" />
      <path className="capability-diagram__path capability-diagram__path--delay-2" d="M218 95H262" />
      <path className="capability-diagram__path capability-diagram__path--delay-3" d="M180 110V142" />
      <path className="capability-diagram__path capability-diagram__path--delay-2" d="M96 157H142" />

      <DiagramNode label="CONTEXTO" width={96} x={132} y={18} />
      <DiagramNode label="LLM" x={20} y={80} />
      <DiagramNode label="AGENTE" x={142} y={80} primary />
      <DiagramNode label="TOOLS" width={78} x={262} y={80} />
      <DiagramNode label="MEMORY" x={20} y={142} />
      <DiagramNode label="MCP" x={142} y={142} />

      <circle className="capability-diagram__pulse capability-diagram__pulse--agents-main" r="3" />
      <circle className="capability-diagram__pulse capability-diagram__pulse--agents-mcp" r="2.5" />
    </svg>
  );
}

function AutomationDiagram() {
  return (
    <svg viewBox="0 0 360 190" role="presentation" focusable="false">
      <path className="capability-diagram__path" d="M82 95H98" />
      <path className="capability-diagram__path capability-diagram__path--delay" d="M178 95H190" />
      <path className="capability-diagram__path capability-diagram__path--delay-2" d="M278 95H288" />
      <path className="capability-diagram__path capability-diagram__path--delay-3" d="M320 110V142" />

      <DiagramNode label="EVENT" width={74} x={8} y={80} />
      <DiagramNode label="TRIGGER" width={80} x={98} y={80} />
      <DiagramNode label="WORKFLOW" width={88} x={190} y={80} primary />
      <DiagramNode label="AÇÃO" width={64} x={288} y={80} />
      <DiagramNode label="RESULTADO" width={96} x={256} y={142} />

      <circle className="capability-diagram__pulse capability-diagram__pulse--automation" r="3" />
    </svg>
  );
}

const diagrams: Record<CapabilityKind, ComponentType> = {
  systems: SystemsDiagram,
  agents: AgentsDiagram,
  automation: AutomationDiagram,
};

export function CapabilityDiagram({ variant }: { variant: CapabilityKind }) {
  const Diagram = diagrams[variant];

  return (
    <div className={`capability-diagram capability-diagram--${variant}`} aria-hidden="true">
      <span className="capability-diagram__caption mono">ARQUITETURA / LIVE</span>
      <Diagram />
    </div>
  );
}
