"use client";

import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from "motion/react";
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
  flowActive,
}: {
  project: Project;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  isActive: boolean;
  flowActive: boolean;
}) {
  const opacity = useTransform(progress, (value) => {
    const position = value * (total - 1);
    return Math.round(position) === index ? 1 : 0;
  });
  const rotateX = useTransform(progress, (value) => {
    const distance = value * (total - 1) - index;
    const turn = Math.min(1, Math.abs(distance) * 2);
    return distance >= 0 ? turn * -90 : turn * 90;
  });
  const scale = useTransform(progress, (value) => {
    const distance = Math.min(0.5, Math.abs(value * (total - 1) - index));
    return 1 - distance * 0.1;
  });
  const z = useTransform(progress, (value) => {
    const distance = Math.min(0.5, Math.abs(value * (total - 1) - index));
    return distance * -440;
  });

  return (
    <motion.div
      className="projects-stack__card"
      style={{ opacity, scale, rotateX, z, pointerEvents: isActive ? "auto" : "none" }}
      aria-hidden={!isActive}
      inert={!isActive}
      data-flow-active={flowActive}
    >
      <ProjectCard project={project} />
    </motion.div>
  );
}

function AnimatedProjectStack({ projects }: ProjectStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInView = useInView(viewportRef, { amount: 0.2 });
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
      <div ref={viewportRef} className="projects-stack__viewport">
        {projects.map((project, index) => (
          <StackCard
            key={project.slug}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            isActive={activeIndex === index}
            flowActive={isInView && activeIndex === index}
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
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="projects-list">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    );
  }

  return <AnimatedProjectStack projects={projects} />;
}
