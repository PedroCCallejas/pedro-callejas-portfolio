"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { type PointerEvent, useEffect, useRef } from "react";

const orbitNodes = [
  { label: "UI", position: "top", tone: "cyan" },
  { label: "LLM", position: "right", tone: "violet" },
  { label: "API", position: "bottom-right", tone: "cyan" },
  { label: "DADOS", position: "bottom-left", tone: "violet" },
  { label: "AUTO", position: "left", tone: "cyan" },
];

export function HeroNetwork() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 90, damping: 26 });
  const y = useSpring(rawY, { stiffness: 90, damping: 26 });
  const rotateX = useTransform(y, (value) => -value * 0.75);
  const rotateY = useTransform(x, (value) => value * 0.75);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
    rawY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  }

  return (
    <div
      className="hero-network"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      <motion.div className="hero-network__stage" style={{ x, y, rotateX, rotateY }}>
        <div className="hero-network__orbit" aria-hidden="true" />
        <div className="hero-network__video">
          <video ref={videoRef} src="/media/hero-face.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
          <div className="hero-network__video-wash" aria-hidden="true" />
        </div>

        {orbitNodes.map((node) => (
          <span
            className={`hero-network__node hero-network__node--${node.position} hero-network__node--${node.tone}`}
            key={node.label}
          >
            <i />
            {node.label}
          </span>
        ))}

        <span className="hero-network__core" aria-hidden="true">PC</span>
      </motion.div>
    </div>
  );
}
