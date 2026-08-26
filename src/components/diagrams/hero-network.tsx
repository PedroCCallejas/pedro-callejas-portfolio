"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent } from "react";

const nodes = [
  { label: "Agentes de IA", x: 50, y: 16 },
  { label: "Full Stack", x: 18, y: 50 },
  { label: "Automação", x: 82, y: 50 },
  { label: "Sistemas", x: 50, y: 84 },
];

export function HeroNetwork() {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 90, damping: 25 });
  const y = useSpring(rawY, { stiffness: 90, damping: 25 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
    rawY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
  }

  return (
    <div className="hero-network" onPointerMove={handlePointerMove} onPointerLeave={() => { rawX.set(0); rawY.set(0); }}>
      <motion.div className="hero-network__inner" style={{ x, y }}>
        <svg viewBox="0 0 100 100" role="img" aria-label="Rede conectando Full Stack, agentes de IA, automação e sistemas">
          <defs>
            <linearGradient id="network-line" x1="0" x2="1">
              <stop offset="0" stopColor="#6ee7f2" stopOpacity="0.16" />
              <stop offset="0.5" stopColor="#6ee7f2" stopOpacity="0.8" />
              <stop offset="1" stopColor="#9877ff" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          {nodes.map((node) => (
            <line key={node.label} x1="50" y1="50" x2={node.x} y2={node.y} className="network-line" />
          ))}
          <circle cx="50" cy="50" r="4.8" className="network-core" />
          <circle cx="50" cy="50" r="10" className="network-orbit" />
          {nodes.map((node, index) => (
            <g key={node.label} className={`network-node network-node--${index + 1}`}>
              <circle cx={node.x} cy={node.y} r="2.3" />
              <text x={node.x} y={node.y + (node.y < 30 ? -6 : 7)} textAnchor="middle">{node.label}</text>
            </g>
          ))}
          <circle r="1.2" className="network-packet">
            <animateMotion dur="3.8s" repeatCount="indefinite" path="M 18 50 L 50 50 L 82 50" />
          </circle>
        </svg>
      </motion.div>
    </div>
  );
}
