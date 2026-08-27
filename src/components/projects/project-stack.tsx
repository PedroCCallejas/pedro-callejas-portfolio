"use client";

import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { Project } from "@/types/project";
import { ProjectCard } from "./project-card";

type ProjectStackProps = {
  projects: Project[];
};

type NavigationMode = "scroll" | "manual";

const READING_PHASE = 0.56;
const FLIP_MIDPOINT = 0.78;

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

function cardMotion(value: number, index: number, total: number) {
  const distance = value * (total - 1) - index;

  if (distance >= 0 && distance <= READING_PHASE) {
    return { opacity: 1, rotateX: 0, scale: 1, z: 0 };
  }

  if (distance > READING_PHASE && distance < FLIP_MIDPOINT) {
    const amount = (distance - READING_PHASE) / (FLIP_MIDPOINT - READING_PHASE);
    return {
      opacity: 1,
      rotateX: amount * -90,
      scale: 1 - amount * 0.04,
      z: amount * -170,
    };
  }

  const incomingPhase = distance + 1;

  if (distance < 0 && incomingPhase >= FLIP_MIDPOINT && incomingPhase <= 1) {
    const amount = (incomingPhase - FLIP_MIDPOINT) / (1 - FLIP_MIDPOINT);
    return {
      opacity: 1,
      rotateX: (1 - amount) * 90,
      scale: 0.96 + amount * 0.04,
      z: (1 - amount) * -170,
    };
  }

  return {
    opacity: 0,
    rotateX: distance > 0 ? -90 : 90,
    scale: 0.96,
    z: -170,
  };
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
  const opacity = useTransform(progress, (value) => cardMotion(value, index, total).opacity);
  const rotateX = useTransform(progress, (value) => cardMotion(value, index, total).rotateX);
  const scale = useTransform(progress, (value) => cardMotion(value, index, total).scale);
  const z = useTransform(progress, (value) => cardMotion(value, index, total).z);

  return (
    <motion.div
      className="projects-stack__card"
      style={{ opacity, scale, rotateX, z, pointerEvents: isActive ? "auto" : "none" }}
      aria-hidden={!isActive}
      inert={!isActive}
      data-flow-active={flowActive}
    >
      <ProjectCard project={project} flowActive={flowActive} />
    </motion.div>
  );
}

const manualSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "9%" : "-9%",
    opacity: 0,
    scale: 0.985,
    filter: "blur(8px)",
  }),
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-9%" : "9%",
    opacity: 0,
    scale: 0.985,
    filter: "blur(8px)",
  }),
};

function DesktopProjectShowcase({ projects }: ProjectStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<NavigationMode>("scroll");
  const [mode, setMode] = useState<NavigationMode>("scroll");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [holdManualCard, setHoldManualCard] = useState(false);
  const [isModeTransitioning, setIsModeTransitioning] = useState(false);
  const isInView = useInView(viewportRef, { amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (modeRef.current !== "scroll") return;

    const position = value * (projects.length - 1);
    const nextIndex = Math.min(
      projects.length - 1,
      Math.floor(position + (1 - FLIP_MIDPOINT)),
    );
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  function selectMode(nextMode: NavigationMode) {
    if (nextMode === mode || !containerRef.current || isModeTransitioning) return;

    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    modeRef.current = nextMode;
    setIsModeTransitioning(true);

    if (nextMode === "scroll") {
      setHoldManualCard(true);
    }

    setMode(nextMode);

    if (nextMode === "manual") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: Math.max(0, containerTop - 88), behavior: "auto" });
          requestAnimationFrame(() => setIsModeTransitioning(false));
        });
      });
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const scrollRange = Math.max(0, containerRef.current.offsetHeight - window.innerHeight);
        const progress = projects.length > 1 ? activeIndex / (projects.length - 1) : 0;
        scrollYProgress.set(progress);
        window.scrollTo({ top: containerTop + scrollRange * progress, behavior: "auto" });
        requestAnimationFrame(() => {
          setHoldManualCard(false);
          setIsModeTransitioning(false);
        });
      });
    });
  }

  function changeProject(nextDirection: number) {
    setDirection(nextDirection);
    setActiveIndex((current) => (
      (current + nextDirection + projects.length) % projects.length
    ));
  }

  const manualMode = mode === "manual";
  const showManualCard = manualMode || holdManualCard;
  const activeProject = projects[activeIndex];

  return (
    <div
      ref={containerRef}
      className={`projects-stack projects-stack--${mode}`}
      style={{ "--project-count": projects.length } as CSSProperties}
      role="region"
      aria-label="Projetos selecionados"
      aria-roledescription="carrossel"
    >
      <div ref={viewportRef} className="projects-stack__viewport">
        <div className="projects-stack__toolbar">
          <div className="projects-mode" role="group" aria-label="Modo de navegação dos projetos">
            <span data-active={!manualMode}>Scroll</span>
            <button
              type="button"
              className="projects-mode__switch focus-ring"
              role="switch"
              aria-checked={manualMode}
              aria-busy={isModeTransitioning}
              aria-label={manualMode ? "Ativar navegação por scroll" : "Ativar navegação manual"}
              disabled={isModeTransitioning}
              onClick={() => selectMode(manualMode ? "scroll" : "manual")}
            >
              <i aria-hidden="true" />
            </button>
            <span data-active={manualMode}>Manual</span>
          </div>

          <AnimatePresence initial={false}>
            {manualMode && (
              <motion.div
                className="projects-manual-controls"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                role="group"
                aria-label="Navegação manual dos projetos"
              >
                <button
                  type="button"
                  className="projects-arrow focus-ring"
                  aria-label="Projeto anterior"
                  onClick={() => changeProject(-1)}
                >
                  <ArrowLeft size={17} strokeWidth={1.7} />
                </button>
                <button
                  type="button"
                  className="projects-arrow focus-ring"
                  aria-label="Próximo projeto"
                  onClick={() => changeProject(1)}
                >
                  <ArrowRight size={17} strokeWidth={1.7} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showManualCard ? (
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeProject.slug}
              className="projects-stack__card projects-stack__card--manual"
              custom={direction}
              variants={manualSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${activeIndex + 1} de ${projects.length}: ${activeProject.title}`}
              data-flow-active={isInView}
            >
              <ProjectCard project={activeProject} flowActive={manualMode || isInView} />
            </motion.div>
          </AnimatePresence>
        ) : (
          projects.map((project, index) => (
            <StackCard
              key={project.slug}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
              isActive={activeIndex === index}
              flowActive={isInView && activeIndex === index}
            />
          ))
        )}

        <div className="projects-stack__counter mono" aria-live="polite" aria-atomic="true">
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
        {projects.map((project) => <ProjectCard key={project.slug} project={project} flowActive={false} />)}
      </div>
    );
  }

  return <DesktopProjectShowcase projects={projects} />;
}
