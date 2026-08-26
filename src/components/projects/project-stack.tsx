"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { Project } from "@/types/project";
import { ProjectCard } from "./project-card";

type ProjectStackProps = {
  projects: Project[];
};

function subscribeToMobileQuery(callback: () => void) {
  const query = window.matchMedia("(max-width: 768px)");
  query.addEventListener("change", callback);

  return () => query.removeEventListener("change", callback);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeToMobileQuery,
    () => window.matchMedia("(max-width: 768px)").matches,
    () => false,
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
  isActive,
}: {
  project: Project;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  isActive: boolean;
}) {
  const center = total === 1 ? 0 : index / (total - 1);
  const step = total === 1 ? 1 : 1 / (total - 1);

  const getPhase = (value: number) => {
    if (total === 1) return 0;
    if (index === 0 && value <= center) return 0;
    if (index === total - 1 && value >= center) return 0;
    return (value - center) / step;
  };

  const opacity = useTransform(progress, (value) => {
    const phase = getPhase(value);
    return Math.max(0, 1 - Math.abs(phase));
  });
  const y = useTransform(progress, (value) => {
    const phase = Math.max(-1, Math.min(1, getPhase(value)));
    return phase < 0 ? Math.abs(phase) * 105 : phase * -92;
  });
  const scale = useTransform(progress, (value) => {
    const phase = Math.max(-1, Math.min(1, getPhase(value)));
    return phase < 0 ? 1 - Math.abs(phase) * 0.11 : 1 - phase * 0.19;
  });
  const rotateX = useTransform(progress, (value) => Math.max(-1, Math.min(1, getPhase(value))) * -13);
  const z = useTransform(progress, (value) => -Math.min(1, Math.abs(getPhase(value))) * 270);

  return (
    <motion.div
      className="projects-stack__card"
      style={{ opacity, y, scale, rotateX, z, pointerEvents: isActive ? "auto" : "none" }}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <ProjectCard project={project} />
    </motion.div>
  );
}

function AnimatedProjectStack({ projects }: ProjectStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.min(projects.length - 1, Math.round(value * (projects.length - 1)));
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  return (
    <div
      ref={containerRef}
      className="projects-stack"
      style={{ "--project-count": projects.length } as CSSProperties}
    >
      <div className="projects-stack__viewport">
        {projects.map((project, index) => (
          <StackCard
            key={project.slug}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            isActive={activeIndex === index}
          />
        ))}
        <div className="projects-stack__counter mono" aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <i aria-hidden="true"><b style={{ transform: `scaleX(${(activeIndex + 1) / projects.length})` }} /></i>
          <span>{String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectStack({ projects }: ProjectStackProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduceMotion || isMobile) {
    return (
      <div className="projects-list">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    );
  }

  return <AnimatedProjectStack projects={projects} />;
}
