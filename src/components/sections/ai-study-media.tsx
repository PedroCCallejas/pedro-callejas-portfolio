"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ScrollVideo } from "@/components/media/scroll-video";

export function AIStudyMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 68,
    damping: 23,
    mass: 0.58,
    restDelta: 0.0005,
  });
  const videoProgress = useTransform(smoothProgress, [0.04, 0.96], [0, 1]);
  const mediaScale = useTransform(smoothProgress, [0, 0.5, 1], [0.988, 1, 0.992]);
  const scannerLeft = useTransform(smoothProgress, [0.05, 0.95], ["47%", "94%"]);
  const scannerOpacity = useTransform(smoothProgress, [0, 0.08, 0.9, 1], [0, 0.68, 0.68, 0]);
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="ai-study-scroll">
      <motion.article className="ai-study-media" style={{ scale: mediaScale }}>
        <ScrollVideo
          progress={videoProgress}
          src="/media/ai-study-face.mp4"
          poster="/media/ai-study-face-poster.jpg"
        />
        <div className="ai-study-media__shade" aria-hidden="true" />
        <motion.i
          className="ai-study-media__scanner"
          style={{ left: scannerLeft, opacity: scannerOpacity }}
          aria-hidden="true"
        />
        <div className="ai-study-media__copy">
          <span className="mono">LABORATÓRIO DE IA · 04</span>
          <h3>Ferramentas mudam.<br />O método permanece.</h3>
          <p>Estudo Claude, Codex, agentes e automações para entender onde a IA realmente melhora um produto — e onde regras claras ainda são a melhor solução.</p>
          <div className="ai-study-media__tags mono"><span>CLAUDE</span><span>CODEX</span><span>AGENTES</span><span>N8N</span></div>
        </div>
        <div className="ai-study-media__progress" aria-hidden="true">
          <span className="mono">SCROLL · VÍDEO 00 → 10S</span>
          <i><motion.b style={{ scaleX: progressScale }} /></i>
        </div>
      </motion.article>
    </div>
  );
}
