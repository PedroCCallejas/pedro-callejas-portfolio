"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ScrollVideo } from "@/components/media/scroll-video";
import { socialLinks } from "@/data/site";

export function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 24,
    mass: 0.55,
    restDelta: 0.0005,
  });

  const primaryOpacity = useTransform(smoothProgress, [0, 0.28, 0.42], [1, 1, 0]);
  const primaryY = useTransform(smoothProgress, [0, 0.42], [0, -20]);
  const insightOpacity = useTransform(smoothProgress, [0.42, 0.54, 0.9, 1], [0, 1, 1, 0.82]);
  const insightX = useTransform(smoothProgress, [0.42, 0.56], [-22, 0]);
  const mediaScale = useTransform(smoothProgress, [0, 1], [1.055, 1]);
  const mediaX = useTransform(smoothProgress, [0, 1], ["1.5%", "-1.5%"]);
  const scannerLeft = useTransform(smoothProgress, [0.18, 0.94], ["51%", "91%"]);
  const scannerOpacity = useTransform(smoothProgress, [0.12, 0.2, 0.9, 0.98], [0, 0.72, 0.72, 0]);
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="hero-scroll" id="top">
      <div className="hero-scroll__sticky">
        <motion.div className="hero-scroll__media" style={{ scale: mediaScale, x: mediaX }} aria-hidden="true">
          <ScrollVideo
            progress={smoothProgress}
            src="/media/hero-ai-profile.mp4"
            poster="/media/hero-ai-profile-poster.jpg"
            priority
          />
        </motion.div>
        <div className="hero-scroll__shade" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <motion.i
          className="hero-scroll__scanner"
          style={{ left: scannerLeft, opacity: scannerOpacity }}
          aria-hidden="true"
        />

        <div className="hero section-shell">
          <motion.div className="hero-copy" style={{ opacity: primaryOpacity, y: primaryY }}>
            <p className="eyebrow"><span className="live-dot" /> Cuiabá, Brasil · Disponível para bons projetos</p>
            <h1>
              <span className="hero-name">Pedro Carvalho Callejas</span>
              <span>Construo software</span>
              <span className="text-gradient">que faz o trabalho.</span>
            </h1>
            <p className="hero-description">Full Stack · IA · Automação</p>
            <p className="hero-subtitle">Construindo sistemas inteligentes, automações e produtos digitais para problemas reais.</p>
            <div className="hero-actions">
              <a className="button focus-ring" href="#work">Ver projetos <ArrowDown size={16} /></a>
              <a className="button button--ghost focus-ring" href={socialLinks.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a>
            </div>
          </motion.div>

          <motion.div
            className="hero-scroll__insight"
            style={{ opacity: insightOpacity, x: insightX }}
          >
            <span className="mono">SISTEMA / PEDRO.CALLEJAS</span>
            <h2>Código, contexto<br />e execução.</h2>
            <p>Transformo problemas reais em produtos que conectam engenharia, inteligência e automação.</p>
            <div className="hero-scroll__signals">
              <span><b className="mono">01</b><i>Software</i><small>estruturas confiáveis</small></span>
              <span><b className="mono">02</b><i>IA aplicada</i><small>decisões com propósito</small></span>
              <span><b className="mono">03</b><i>Automação</i><small>fluxos que executam</small></span>
            </div>
          </motion.div>

          <div className="hero-index mono" aria-hidden="true"><span>01</span><i /><span>07</span></div>
        </div>

        <div className="hero-scroll__progress" aria-hidden="true">
          <span className="mono">SCROLL</span>
          <i><motion.b style={{ scaleY: progressScale }} /></i>
        </div>
      </div>
    </section>
  );
}
