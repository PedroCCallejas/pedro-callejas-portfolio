"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ScrollVideo } from "@/components/media/scroll-video";
import { socialLinks } from "@/data/site";

export function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const primaryOpacity = useTransform(scrollYProgress, [0, 0.32, 0.5], [1, 1, 0]);
  const primaryY = useTransform(scrollYProgress, [0, 0.5], [0, -26]);
  const developmentOpacity = useTransform(scrollYProgress, [0.28, 0.39, 0.57, 0.68], [0, 1, 1, 0]);
  const developmentY = useTransform(scrollYProgress, [0.28, 0.39, 0.68], [22, 0, -18]);
  const aiOpacity = useTransform(scrollYProgress, [0.58, 0.7, 0.88, 0.98], [0, 1, 1, 0]);
  const aiY = useTransform(scrollYProgress, [0.58, 0.7, 0.98], [22, 0, -16]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.035, 1]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="hero-scroll" id="top">
      <div className="hero-scroll__sticky">
        <motion.div className="hero-scroll__media" style={{ scale: mediaScale }} aria-hidden="true">
          <ScrollVideo
            progress={scrollYProgress}
            src="/media/hero-ai-profile.mp4"
            poster="/media/hero-ai-profile-poster.jpg"
            priority
          />
        </motion.div>
        <div className="hero-scroll__shade" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

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

          <div className="hero-scroll__stories" aria-hidden="true">
            <motion.div className="hero-scroll__story" style={{ opacity: developmentOpacity, y: developmentY }}>
              <span className="mono">01 / ENGENHARIA</span>
              <p>Sistemas claros por dentro.<br />Experiências simples por fora.</p>
            </motion.div>
            <motion.div className="hero-scroll__story" style={{ opacity: aiOpacity, y: aiY }}>
              <span className="mono">02 / INTELIGÊNCIA APLICADA</span>
              <p>IA e automação para ampliar decisões e transformar trabalho em fluxo.</p>
            </motion.div>
          </div>

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
