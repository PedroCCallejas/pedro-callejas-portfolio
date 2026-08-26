import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Code2, Mail } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { CapabilityDiagram } from "@/components/diagrams/capability-diagram";
import { HeroNetwork } from "@/components/diagrams/hero-network";
import { HowIBuild } from "@/components/diagrams/how-i-build";
import { ProjectCard } from "@/components/projects/project-card";
import { capabilities, socialLinks, stackGroups } from "@/data/site";
import { projects } from "@/data/projects";

export function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <Reveal>
          <p className="eyebrow"><span className="live-dot" /> Cuiabá, Brasil · Disponível para bons projetos</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1>
            <span className="hero-name">Pedro Carvalho Callejas</span>
            <span>Construo software</span>
            <span className="text-gradient">que faz o trabalho.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="hero-description">Full Stack · IA · Automação</p>
          <p className="hero-subtitle">Construindo sistemas inteligentes, automações e produtos digitais para problemas reais.</p>
          <div className="hero-actions">
            <a className="button focus-ring" href="#work">Ver projetos <ArrowDown size={16} /></a>
            <a className="button button--ghost focus-ring" href={socialLinks.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a>
          </div>
        </Reveal>
      </div>
      <HeroNetwork />
      <div className="hero-index mono" aria-hidden="true"><span>01</span><i /><span>07</span></div>
    </section>
  );
}

export function WhatIBuild() {
  return (
    <section className="section section-shell" id="capabilities">
      <Reveal className="section-heading">
        <p className="eyebrow">O que eu construo</p>
        <h2>Software que conecta intenção a resultado.</h2>
        <p>Não começo pela tecnologia. Começo pelo trabalho que precisa ser feito — e construo o sistema ao redor dele.</p>
      </Reveal>
      <div className="capabilities-grid">
        {capabilities.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.07}>
            <article className="capability-card">
              <span className="mono text-muted">{item.number}</span>
              <CapabilityDiagram nodes={item.nodes} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FeaturedWork() {
  return (
    <section className="section section-shell" id="work">
      <Reveal className="section-heading section-heading--split">
        <div><p className="eyebrow">Projetos em destaque</p><h2>Sistemas em produção.<br />Agentes em construção.</h2></div>
        <p>Cada projeto documenta o problema, a solução e a arquitetura. O que ainda não foi validado é marcado com transparência.</p>
      </Reveal>
      <div className="projects-list">
        {projects.map((project) => <Reveal key={project.slug}><ProjectCard project={project} /></Reveal>)}
      </div>
    </section>
  );
}

export function Architecture() {
  return (
    <section className="section section-shell" id="architecture">
      <Reveal className="section-heading">
        <p className="eyebrow">Como eu construo</p>
        <h2>Arquitetura é a conversa entre as partes.</h2>
        <p>Explore as camadas. Cada tecnologia tem um papel; o valor aparece quando o fluxo completo funciona.</p>
      </Reveal>
      <Reveal><HowIBuild /></Reveal>
    </section>
  );
}

export function Stack() {
  return (
    <section className="section section-shell stack-section" id="stack">
      <Reveal className="section-heading section-heading--split">
        <div><p className="eyebrow">Competências técnicas</p><h2>Tecnologia organizada pelo papel que cumpre.</h2></div>
        <p>Ferramentas mudam. A capacidade de combinar interface, serviços, dados, inteligência e entrega permanece.</p>
      </Reveal>
      <div className="stack-map">
        {stackGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.04}>
            <article className="stack-row">
              <span className="stack-row__index mono">0{index + 1}</span>
              <div className="stack-row__heading">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section section-shell" id="about">
      <div className="about-grid">
        <Reveal>
          <p className="eyebrow">Sobre</p>
          <h2>Engenharia com visão de produto.</h2>
          <p className="about-lead">Sou engenheiro da computação, pós-graduado em Full Stack Development, com experiência prática em interfaces, painéis, dados, plataformas educacionais e suporte tecnológico.</p>
          <p>Hoje concentro meu trabalho em desenvolvimento Full Stack, IA e automação — buscando soluções úteis, compreensíveis e sustentáveis.</p>
          <p>Também gosto de jogos e uso projetos autorais como o Calherath TD para explorar sistemas, mecânicas e programação em C#.</p>
        </Reveal>
        <Reveal className="education-panel" delay={0.08}>
          <span className="eyebrow">Formação</span>
          <div><strong>Engenharia da Computação</strong><span>UNIC · 2024</span></div>
          <div><strong>Full Stack Development</strong><span>FIAP · 2025</span></div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact section-shell" id="contact">
      <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
      <Reveal>
        <p className="eyebrow">Vamos conversar</p>
        <h2>Tem um problema<br />que vale automatizar?</h2>
        <p>Vamos construir algo útil.</p>
        <a className="contact-email focus-ring" href={socialLinks.email}>pedroccallejas@hotmail.com <ArrowUpRight /></a>
        <div className="social-links">
          <a className="focus-ring" href={socialLinks.github} target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub</a>
          <a className="focus-ring" href={socialLinks.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn</a>
          <a className="focus-ring" href={socialLinks.email}><Mail size={18} /> E-mail</a>
        </div>
      </Reveal>
    </section>
  );
}
