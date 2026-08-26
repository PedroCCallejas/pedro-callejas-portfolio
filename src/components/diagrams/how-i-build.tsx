"use client";

import { useState } from "react";

const detail: Record<string, string[]> = {
  Interface: ["React", "Next.js", "React Native"],
  Serviços: ["Node.js", "APIs REST", "Integrações"],
  Inteligência: ["LLMs", "Agentes", "MCP", "RAG", "Ferramentas"],
  Dados: ["PostgreSQL", "Supabase", "Firebase", "MongoDB"],
  Entrega: ["Vercel", "Railway", "GitHub"],
};

export function HowIBuild() {
  const [active, setActive] = useState("Inteligência");

  return (
    <div className="architecture-board">
      <div className="architecture-flow" aria-label="Diagrama interativo da arquitetura de software">
        <span className="architecture-user mono">USUÁRIO / NEGÓCIO</span>
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
        <span className="architecture-output mono">SOFTWARE ÚTIL</span>
      </div>

      <aside className="architecture-detail" aria-live="polite">
        <span className="eyebrow">Camada selecionada</span>
        <h3>{active}</h3>
        <ul>
          {detail[active].map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p>Camadas independentes o bastante para evoluir; conectadas o bastante para entregar valor.</p>
      </aside>
    </div>
  );
}
