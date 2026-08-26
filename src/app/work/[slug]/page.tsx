import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check, Clock3 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/animations/reveal";
import { ProjectFlow } from "@/components/projects/project-flow";
import { getProject, projects } from "@/data/projects";

type CasePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.title} — Pedro Callejas`,
      description: project.summary,
      url: `/work/${slug}`,
      type: "website",
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="case-page" id="main-content">
      <nav className="case-nav section-shell">
        <Link className="text-link focus-ring" href="/#work"><ArrowLeft size={16} /> Voltar aos projetos</Link>
        <span className={`status status--${project.status}`}><i />{project.statusLabel}</span>
      </nav>

      <header className="case-hero section-shell">
        <Reveal><p className="eyebrow">Estudo de caso · {project.index}</p><h1>{project.title}</h1><p>{project.statement}</p></Reveal>
        <Reveal className="case-hero__flow" delay={0.08}><ProjectFlow steps={project.architecture} /></Reveal>
      </header>

      <div className="case-content section-shell">
        <Reveal><CaseSection number="01" title="Visão geral"><p className="case-lead">{project.summary}</p><div className="project-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></CaseSection></Reveal>
        <Reveal><CaseSection number="02" title="Problema"><p>{project.problem}</p></CaseSection></Reveal>
        <Reveal><CaseSection number="03" title="Solução"><p>{project.solution}</p><ul className="case-checklist">{project.features.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></CaseSection></Reveal>
        <Reveal><CaseSection number="04" title="Arquitetura"><ProjectFlow steps={project.architecture} /></CaseSection></Reveal>
        <Reveal><CaseSection number="05" title="Demonstração"><div className="demo-placeholder"><Clock3 /><div><strong>{project.status === "building" ? "Demonstração em preparação" : "Espaço preparado para vídeo e imagens"}</strong><span>{project.status === "building" ? "Será adicionada após a validação do MVP." : "A documentação visual será adicionada na próxima evolução do projeto."}</span></div></div>{project.href && <a className="button button--ghost focus-ring" href={project.href} target="_blank" rel="noreferrer">Abrir projeto <ArrowUpRight size={16} /></a>}</CaseSection></Reveal>
        <Reveal><CaseSection number="06" title="Desafios"><ul className="case-list">{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul></CaseSection></Reveal>
        <Reveal><CaseSection number="07" title="Aprendizados"><ul className="case-list">{project.learnings.map((item) => <li key={item}>{item}</li>)}</ul></CaseSection></Reveal>
        <Reveal><CaseSection number="08" title="Resultados"><p>{project.results}</p></CaseSection></Reveal>
      </div>

      <footer className="case-footer section-shell"><p>Próximo sistema começa com uma boa pergunta.</p><Link className="contact-email focus-ring" href="/#contact">Vamos conversar <ArrowUpRight /></Link></footer>
    </main>
  );
}

function CaseSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <section className="case-section"><div className="case-section__title"><span className="mono text-cyan">{number}</span><h2>{title}</h2></div><div className="case-section__body">{children}</div></section>;
}
