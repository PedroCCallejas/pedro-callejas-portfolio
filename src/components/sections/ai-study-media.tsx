"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ScrollVideo } from "@/components/media/scroll-video";

export function AIStudyMedia() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const videoProgress = useTransform(scrollYProgress, [0.08, 0.92], [0, 1]);
  const mediaScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.975, 1, 0.985]);
  const mediaY = useTransform(scrollYProgress, [0, 0.5, 1], [24, 0, -20]);

  return (
    <motion.article
      ref={containerRef}
      className="ai-study-media"
      style={{ scale: mediaScale, y: mediaY }}
    >
      <ScrollVideo
        progress={videoProgress}
        src="/media/ai-study-face.mp4"
        poster="/media/ai-study-face-poster.jpg"
      />
      <div className="ai-study-media__shade" aria-hidden="true" />
      <div className="ai-study-media__copy">
        <span className="mono">LABORATÓRIO DE IA · 04</span>
        <h3>Ferramentas mudam.<br />O método permanece.</h3>
        <p>Estudo Claude, Codex, agentes e automações para entender onde a IA realmente melhora um produto — e onde regras claras ainda são a melhor solução.</p>
        <div className="ai-study-media__tags mono"><span>CLAUDE</span><span>CODEX</span><span>AGENTES</span><span>N8N</span></div>
      </div>
      <span className="ai-study-media__hint mono" aria-hidden="true">MOVIMENTO PELO SCROLL</span>
    </motion.article>
  );
}
