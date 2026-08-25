import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "email-agent",
    index: "01",
    title: "Email AI Agent",
    shortTitle: "Email Agent",
    statement: "An AI agent that understands my inbox.",
    summary:
      "Um agente em desenvolvimento para transformar e-mails em prioridades, tarefas, resumos e alertas acionáveis.",
    status: "building",
    statusLabel: "Building",
    year: "Em desenvolvimento",
    stack: ["LLM", "APIs", "Automation", "Data processing"],
    features: [
      "Classificação de e-mails",
      "Identificação de prioridades",
      "Detecção de possíveis tarefas",
      "Resumos e organização de informações",
    ],
    architecture: ["Email", "Processing", "AI Agent", "Classification", "Action"],
    problem:
      "Caixas de entrada concentram decisões, tarefas e informações importantes, mas exigem triagem manual constante.",
    solution:
      "A proposta é criar um agente com ações controladas que interprete cada mensagem, organize o contexto e sugira próximos passos sem fingir autonomia irrestrita.",
    challenges: ["Privacidade dos dados", "Classificação confiável", "Ações sempre controladas"],
    learnings: ["Em validação durante a construção do MVP"],
    results: "Projeto ainda em desenvolvimento. Nenhuma métrica ou resultado é apresentado antes da validação real.",
  },
  {
    slug: "project-agent",
    index: "02",
    title: "Project Control Agent",
    shortTitle: "Project Agent",
    statement: "Project intelligence, without tab switching.",
    summary:
      "Um control center em construção para consolidar deploys, repositórios, logs, status e pendências dos meus projetos.",
    status: "building",
    statusLabel: "Building",
    year: "Em desenvolvimento",
    stack: ["GitHub", "Vercel", "Railway", "Supabase", "Agents"],
    features: [
      "Status centralizado de projetos",
      "Leitura de deploys e logs",
      "Identificação de pendências",
      "Relatórios de acompanhamento",
    ],
    architecture: ["Sources", "Connectors", "Agent", "Analysis", "Report"],
    problem:
      "Acompanhar vários projetos exige alternar entre plataformas e reconstruir mentalmente o estado de cada entrega.",
    solution:
      "O agente deverá consultar fontes autorizadas, normalizar sinais operacionais e apresentar uma visão curta do que precisa de atenção.",
    challenges: ["Integrações com escopo mínimo", "Normalização de eventos", "Sinal versus ruído"],
    learnings: ["Em validação durante a construção do MVP"],
    results: "Projeto ainda em desenvolvimento. O case será atualizado após uma demonstração funcional.",
  },
  {
    slug: "professo-fc",
    index: "03",
    title: "Professô FC",
    shortTitle: "Professô FC",
    statement: "A operação de um time, em uma experiência simples.",
    summary:
      "Sistema web/mobile para organizar times, jogadores, partidas, presença, escalações e a experiência pública de uma equipe de futebol.",
    status: "production",
    statusLabel: "Published",
    year: "2025 — atual",
    href: "https://bocaiuva-app.vercel.app/",
    stack: ["React Native", "Expo", "React", "TypeScript", "Firebase", "Supabase", "Zustand", "Vercel"],
    features: [
      "Autenticação e perfis",
      "Jogadores, times e partidas",
      "Presença, escalação e histórico",
      "MVP, rankings e páginas públicas",
    ],
    architecture: ["Web / Mobile", "Application", "Firebase", "Storage", "Public pages"],
    problem:
      "A gestão cotidiana de um time amador costuma ficar espalhada entre mensagens, listas manuais e decisões sem histórico.",
    solution:
      "Uma aplicação responsiva centraliza a operação do time e transforma convocações, presenças, partidas e reconhecimento dos jogadores em fluxos claros.",
    challenges: ["Experiência consistente entre web e mobile", "Permissões por perfil", "Conteúdo público e administrativo"],
    learnings: ["Modelagem de fluxos reais", "Integração entre serviços", "Evolução incremental de produto"],
    results: "Aplicação publicada e utilizada como base para a gestão digital do projeto esportivo.",
  },
  {
    slug: "its-me-pratas",
    index: "04",
    title: "It’s Me Pratas",
    shortTitle: "It’s Me Pratas",
    statement: "Commerce built around the complete journey.",
    summary:
      "E-commerce responsivo com catálogo, checkout, pagamento, frete, pedidos, estoque, administração e estrutura técnica para SEO.",
    status: "production",
    statusLabel: "Published",
    year: "Produto em evolução",
    href: "https://homologacao.itsmepratas.com.br/",
    stack: ["Next.js", "React", "TypeScript", "Sanity", "Mercado Pago", "Melhor Envio", "Vercel"],
    features: ["Catálogo e estoque", "Checkout e pedidos", "Pagamento e frete", "Administração e SEO"],
    architecture: ["Storefront", "Next.js", "Commerce APIs", "Sanity", "Operations"],
    problem:
      "Uma loja digital precisa coordenar descoberta, estoque, frete, pagamento e acompanhamento do pedido sem quebrar a confiança da compra.",
    solution:
      "A experiência conecta catálogo e conteúdo a integrações de comércio, preservando responsividade, clareza do checkout e operação administrativa.",
    challenges: ["Integrações externas", "Estados do checkout", "Consistência entre catálogo e operação"],
    learnings: ["Arquitetura orientada à jornada", "SEO técnico", "Tratamento de estados transacionais"],
    results: "E-commerce publicado em ambiente web. Métricas comerciais não foram disponibilizadas e não são inferidas neste case.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
