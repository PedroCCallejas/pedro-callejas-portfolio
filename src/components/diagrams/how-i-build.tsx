"use client";

import { useState } from "react";

const detail: Record<string, string[]> = {
  Interface: ["React", "Next.js", "React Native"],
  Services: ["Node.js", "REST APIs", "Integrations"],
  Intelligence: ["LLMs", "Agents", "MCP", "RAG", "Tools"],
  Data: ["PostgreSQL", "Supabase", "Firebase", "MongoDB"],
  Delivery: ["Vercel", "Railway", "GitHub"],
};

export function HowIBuild() {
  const [active, setActive] = useState("Intelligence");

  return (
    <div className="architecture-board">
      <div className="architecture-flow" aria-label="Diagrama interativo da arquitetura de software">
        <span className="architecture-user mono">USER / BUSINESS</span>
        <span className="architecture-connector" aria-hidden="true">↓</span>
        <div className="architecture-grid">
          {Object.keys(detail).map((node, index) => (
            <button
              type="button"
              key={node}
              className={`architecture-node focus-ring ${active === node ? "is-active" : ""}`}
              onMouseEnter={() => setActive(node)}
              onFocus={() => setActive(node)}
              onClick={() => setActive(node)}
            >
              <span className="mono">0{index + 1}</span>
              {node}
            </button>
          ))}
        </div>
        <span className="architecture-connector" aria-hidden="true">↓</span>
        <span className="architecture-output mono">USEFUL SOFTWARE</span>
      </div>

      <aside className="architecture-detail" aria-live="polite">
        <span className="eyebrow">Selected layer</span>
        <h3>{active}</h3>
        <ul>
          {detail[active].map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p>Camadas independentes o bastante para evoluir; conectadas o bastante para entregar valor.</p>
      </aside>
    </div>
  );
}
