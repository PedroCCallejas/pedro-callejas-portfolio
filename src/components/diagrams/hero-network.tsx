"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { type PointerEvent, useEffect, useRef } from "react";

type ActorId = "ui" | "llm" | "api" | "dados" | "auto" | "pc";

type Actor = {
  id: ActorId;
  label: string;
  tone: "cyan" | "violet";
  anchor: { x: number; y: number };
  amplitude: number;
  speed: number;
  phase: number;
};

const actors: Actor[] = [
  { id: "ui", label: "UI", tone: "cyan", anchor: { x: 0.5, y: 0.14 }, amplitude: 0.018, speed: 0.7, phase: 0.2 },
  { id: "llm", label: "LLM", tone: "violet", anchor: { x: 0.83, y: 0.4 }, amplitude: 0.021, speed: 0.58, phase: 1.4 },
  { id: "api", label: "API", tone: "cyan", anchor: { x: 0.72, y: 0.78 }, amplitude: 0.019, speed: 0.66, phase: 2.2 },
  { id: "dados", label: "DADOS", tone: "violet", anchor: { x: 0.28, y: 0.78 }, amplitude: 0.02, speed: 0.54, phase: 3.1 },
  { id: "auto", label: "AUTO", tone: "cyan", anchor: { x: 0.16, y: 0.42 }, amplitude: 0.018, speed: 0.62, phase: 4.3 },
  { id: "pc", label: "PC", tone: "cyan", anchor: { x: 0.65, y: 0.67 }, amplitude: 0, speed: 0, phase: 0 },
];

const actorPairs = actors.flatMap((actor, index) =>
  actors.slice(index + 1).map((other) => ({
    key: `${actor.id}-${other.id}`,
    from: actor.id,
    to: other.id,
  })),
);

const fixedPositions = Object.fromEntries(
  actors.map((actor) => [actor.id, { ...actor.anchor }]),
) as Record<ActorId, { x: number; y: number }>;

export function HeroNetwork() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const actorRefs = useRef<Partial<Record<ActorId, HTMLSpanElement>>>({});
  const lineRefs = useRef<Record<string, SVGLineElement | null>>({});
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const pcRef = useRef({ x: 0.65, y: 0.67, vx: 0.032, vy: -0.024 });
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 90, damping: 26 });
  const y = useSpring(rawY, { stiffness: 90, damping: 26 });
  const rotateX = useTransform(y, (value) => -value * 0.75);
  const rotateY = useTransform(x, (value) => value * 0.75);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    if (reduceMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => undefined);
  }, [reduceMotion]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let animationFrame = 0;
    let previousTime = performance.now();

    function render(time: number) {
      const elapsed = time / 1000;
      const delta = Math.min((time - previousTime) / 1000, 0.034);
      previousTime = time;
      const positions = { ...fixedPositions };

      for (const actor of actors) {
        if (actor.id === "pc") continue;
        positions[actor.id] = reduceMotion
          ? { ...actor.anchor }
          : {
              x: actor.anchor.x + Math.sin(elapsed * actor.speed + actor.phase) * actor.amplitude,
              y: actor.anchor.y + Math.cos(elapsed * actor.speed * 0.82 + actor.phase) * actor.amplitude,
            };
      }

      if (!reduceMotion) {
        const pc = pcRef.current;
        const pointer = pointerRef.current;
        const pointerDistance = Math.hypot(pointer.x - 0.5, pointer.y - 0.5);

        pc.vx += Math.cos(elapsed * 0.67 + 0.4) * 0.009 * delta;
        pc.vy += Math.sin(elapsed * 0.57 + 1.1) * 0.009 * delta;

        if (pointer.active && pointerDistance < 0.43) {
          pc.vx += (pointer.x - pc.x) * 0.12 * delta;
          pc.vy += (pointer.y - pc.y) * 0.12 * delta;
        }

        const damping = Math.pow(0.995, delta * 60);
        pc.vx *= damping;
        pc.vy *= damping;
        pc.x += pc.vx * delta;
        pc.y += pc.vy * delta;

        const offsetX = pc.x - 0.5;
        const offsetY = pc.y - 0.5;
        const distanceFromCenter = Math.hypot(offsetX, offsetY);
        const movementRadius = 0.305;

        if (distanceFromCenter > movementRadius) {
          const normalX = offsetX / distanceFromCenter;
          const normalY = offsetY / distanceFromCenter;
          const radialVelocity = pc.vx * normalX + pc.vy * normalY;
          pc.x = 0.5 + normalX * movementRadius;
          pc.y = 0.5 + normalY * movementRadius;
          pc.vx -= 1.75 * radialVelocity * normalX;
          pc.vy -= 1.75 * radialVelocity * normalY;
        }

        positions.pc = { x: pc.x, y: pc.y };
      }

      for (const actor of actors) {
        const element = actorRefs.current[actor.id];
        const position = positions[actor.id];
        if (element) {
          element.style.left = `${position.x * 100}%`;
          element.style.top = `${position.y * 100}%`;
        }
      }

      const proximity = Object.fromEntries(actors.map((actor) => [actor.id, 0])) as Record<ActorId, number>;

      for (const pair of actorPairs) {
        const from = positions[pair.from];
        const to = positions[pair.to];
        const distance = Math.hypot(to.x - from.x, to.y - from.y);
        const intensity = Math.max(0, Math.min(1, (0.205 - distance) / 0.105));
        const line = lineRefs.current[pair.key];

        proximity[pair.from] = Math.max(proximity[pair.from], intensity);
        proximity[pair.to] = Math.max(proximity[pair.to], intensity);

        if (line) {
          line.setAttribute("x1", String(from.x * 100));
          line.setAttribute("y1", String(from.y * 100));
          line.setAttribute("x2", String(to.x * 100));
          line.setAttribute("y2", String(to.y * 100));
          line.style.opacity = String(intensity * 0.88);
          line.style.strokeWidth = String(0.18 + intensity * 0.42);
        }
      }

      for (const actor of actors) {
        const element = actorRefs.current[actor.id];
        if (!element) continue;
        const isNear = proximity[actor.id] > 0.08;
        element.classList.toggle("is-near", isNear);
        element.style.setProperty("--proximity", String(proximity[actor.id]));
      }

      if (!reduceMotion) animationFrame = requestAnimationFrame(render);
    }

    render(previousTime);
    return () => cancelAnimationFrame(animationFrame);
  }, [reduceMotion]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const pointerY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));

    pointerRef.current = { x: pointerX, y: pointerY, active: true };
    rawX.set((pointerX - 0.5) * 8);
    rawY.set((pointerY - 0.5) * 8);
    stageRef.current?.style.setProperty("--pointer-x", `${pointerX * 100}%`);
    stageRef.current?.style.setProperty("--pointer-y", `${pointerY * 100}%`);
  }

  function handlePointerLeave() {
    pointerRef.current.active = false;
    rawX.set(0);
    rawY.set(0);
    stageRef.current?.style.setProperty("--pointer-x", "50%");
    stageRef.current?.style.setProperty("--pointer-y", "50%");
  }

  return (
    <div
      className="hero-network"
      role="img"
      aria-label="Rede interativa de tecnologia com vídeo, ferramentas e conexões dinâmicas"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        ref={stageRef}
        className="hero-network__stage"
        style={{ x, y, rotateX, rotateY }}
      >
        <div className="hero-network__orbit" aria-hidden="true" />
        <div className="hero-network__video">
          <video ref={videoRef} src="/media/hero-face.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
          <div className="hero-network__video-wash" aria-hidden="true" />
        </div>

        <svg className="hero-network__connections" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="hero-network-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6ee7f2" />
              <stop offset="1" stopColor="#9877ff" />
            </linearGradient>
          </defs>
          {actorPairs.map((pair) => (
            <line
              key={pair.key}
              ref={(element) => {
                lineRefs.current[pair.key] = element;
              }}
              stroke="url(#hero-network-line)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {actors.map((actor) => (
          <span
            ref={(element) => {
              actorRefs.current[actor.id] = element ?? undefined;
            }}
            className={`hero-network__actor hero-network__actor--${actor.id} hero-network__actor--${actor.tone}`}
            key={actor.id}
            aria-hidden="true"
          >
            {actor.id !== "pc" && <i />}
            {actor.label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
