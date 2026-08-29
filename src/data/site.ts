export const navigation = [
  { label: "Trabalho", href: "#work" },
  { label: "Arquitetura", href: "#architecture" },
  { label: "Estudos", href: "#studies" },
  { label: "Sobre", href: "#about" },
];

export const capabilities = [
  {
    number: "01",
    label: "SYSTEMS",
    kind: "systems" as const,
    title: "Sistemas inteligentes",
    description: "Aplicações completas que conectam interface, dados, regras de negócio, APIs e operação.",
    tags: ["NEXT.JS", "NODE", "POSTGRESQL"],
  },
  {
    number: "02",
    label: "AI AGENTS",
    kind: "agents" as const,
    title: "IA e agentes",
    description: "Agentes que interpretam contexto, usam ferramentas e apoiam decisões com limites claros.",
    tags: ["LLM", "MCP", "RAG", "AGENTS"],
  },
  {
    number: "03",
    label: "AUTOMATION",
    kind: "automation" as const,
    title: "Automação",
    description: "Fluxos que reduzem tarefas repetitivas e fazem sistemas diferentes trabalharem juntos.",
    tags: ["WEBHOOKS", "APIs", "WORKFLOWS"],
  },
];

export const stackGroups = [
  {
    title: "Experiências digitais",
    description: "Interfaces web e mobile rápidas, acessíveis e orientadas ao usuário.",
    items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind"],
  },
  {
    title: "Serviços e integrações",
    description: "APIs e regras de negócio que conectam sistemas, dados e operações.",
    items: ["Node.js", "APIs REST", "Integrações"],
  },
  {
    title: "Dados",
    description: "Persistência, consultas e sincronização para produtos confiáveis.",
    items: ["PostgreSQL", "Supabase", "Firebase", "MongoDB", "Prisma"],
  },
  {
    title: "Inteligência",
    description: "Modelos, agentes e contexto aplicados a fluxos com propósito claro.",
    items: ["LLMs", "Agentes", "MCP", "Automação", "RAG"],
  },
  {
    title: "Entrega",
    description: "Versionamento, publicação e evolução contínua do software.",
    items: ["Vercel", "Railway", "GitHub"],
  },
  {
    title: "Aplicações mobile",
    description: "Experiências pensadas para uso em movimento e diferentes dispositivos.",
    items: ["React Native", "Expo", "Flutter"],
  },
];

export const learningTracks = [
  {
    number: "01",
    kicker: "Hobby e criação",
    title: "Jogos e sistemas interativos",
    description:
      "Jogos são um dos meus principais hobbies e também um espaço para estudar regras, equilíbrio, progressão e feedback. Calherath TD e Placar Truco transformam esse interesse em experimentos práticos.",
    items: ["Unity", "C#", "Design de jogos", "Expo"],
  },
  {
    number: "02",
    kicker: "Estudo contínuo",
    title: "IA aplicada ao desenvolvimento",
    description:
      "Estudo agentes, chamadas de ferramentas, memória, provedores, MCP e construção de prompts. Uso Claude e Codex para pesquisar, planejar, revisar e desenvolver software com supervisão.",
    items: ["Claude", "Codex", "Agentes", "Chamadas de ferramentas", "MCP"],
  },
  {
    number: "03",
    kicker: "Automação criativa",
    title: "n8n, produção e vídeo",
    description:
      "No Ponto Cego do Universo, exploro n8n para orquestrar pesquisa, revisão e produção. Também venho aprendendo edição de vídeo, composição com FFmpeg e organização de conteúdo audiovisual.",
    items: ["n8n", "TypeScript", "FFmpeg", "Edição de vídeo"],
  },
];

export const socialLinks = {
  github: "https://github.com/PedroCCallejas",
  linkedin: "https://br.linkedin.com/in/pedroccallejas",
  email: "mailto:pedroccallejas@hotmail.com",
};
