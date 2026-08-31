"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { CapabilityDiagram } from "@/components/diagrams/capability-diagram";
import { capabilities } from "@/data/site";

type MotionOverride = "system" | "enabled" | "paused";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function ExpertiseSection() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [motionOverride, setMotionOverride] = useState<MotionOverride>("system");
  const motionEnabled = motionOverride === "enabled" || (motionOverride === "system" && !prefersReducedMotion);

  function toggleMotion() {
    setMotionOverride(motionEnabled ? "paused" : "enabled");
  }

  return (
    <section
      className="section section-shell expertise-section"
      data-diagram-motion={motionEnabled ? "enabled" : "paused"}
      id="capabilities"
    >
      <Reveal className="section-heading section-heading--split expertise-heading">
        <div>
          <p className="eyebrow">EXPERTISE / 03</p>
          <h2>Tecnologia que conecta<br />software, inteligência e automação.</h2>
        </div>
        <div className="expertise-heading__aside">
          <p>Da interface ao agente de IA, construo sistemas completos que conectam dados, software e automações em produtos funcionais.</p>
          <button
            aria-label={motionEnabled ? "Pausar animações dos diagramas" : "Ativar animações dos diagramas"}
            aria-pressed={motionEnabled}
            className="expertise-motion-toggle focus-ring"
            onClick={toggleMotion}
            type="button"
          >
            <span className="mono">DIAGRAMAS</span>
            <span className="expertise-motion-toggle__track" aria-hidden="true"><i /></span>
            <strong className="mono">{motionEnabled ? "EM MOVIMENTO" : "PAUSADOS"}</strong>
          </button>
        </div>
      </Reveal>
      <div className="capabilities-grid">
        {capabilities.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.07}>
            <article className="capability-card">
              <div className="capability-card__header">
                <span className="mono">{item.number} / {item.label}</span>
                <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
              </div>
              <CapabilityDiagram variant={item.kind} />
              <div className="capability-card__divider" aria-hidden="true" />
              <div className="capability-card__body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="capability-card__tags" aria-label={`Tecnologias de ${item.title}`}>
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <a className="capability-card__cta focus-ring" href="#work" aria-label={`Explorar projetos relacionados a ${item.title}`}>
                  Explorar projetos <ArrowRight aria-hidden="true" size={15} />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
