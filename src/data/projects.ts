import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "email-agent",
    index: "01",
    title: "Agente de E-mail com IA",
    shortTitle: "Agente de E-mail",
    statement: "IA para interpretar respostas; regras claras para decidir o fluxo.",
    summary:
      "Automação para consultar pagamentos de condomínios, correlacionar respostas, classificar o resultado e preservar uma trilha completa de auditoria.",
    status: "building",
    statusLabel: "MVP local validado",
    year: "103 testes · Integrações pendentes",
    stack: ["TypeScript", "Fastify", "Supabase", "SMTP / IMAP", "LLMs", "Vitest"],
    features: [
      "Envio agrupado por condomínio",
      "Correlação determinística das respostas",
      "Classificação com IA e revisão humana",
      "Lembretes e auditoria completa",
    ],
    architecture: ["Cobranças", "Lotes", "E-mail", "Classificação", "Auditoria"],
    problem:
      "Confirmar pagamentos de várias unidades exige enviar consultas, esperar respostas, interpretar textos diferentes e atualizar controles manualmente.",
    solution:
      "O fluxo automatiza tarefas previsíveis com regras determinísticas e usa IA somente para interpretar a resposta. Casos ambíguos seguem para revisão humana.",
    challenges: ["Correlação segura entre consulta e resposta", "Ambiguidade da linguagem", "Ações sempre controladas"],
    learnings: ["IA cercada por regras de negócio", "Arquitetura testável", "Auditoria desde o início"],
    results: "Regras, tarefas agendadas, API, modo simulado e auditoria validados localmente com 103 testes. Integrações reais e publicação continuam pendentes.",
  },
  {
    slug: "project-agent",
    index: "02",
    title: "Agente de Controle de Projetos",
    shortTitle: "Agente de Projetos",
    statement: "Inteligência sobre projetos sem alternar entre várias telas.",
    summary:
      "Uma central de controle em construção para consolidar publicações, repositórios, registros, status e pendências dos meus projetos.",
    status: "building",
    statusLabel: "Em construção",
    year: "Em desenvolvimento",
    stack: ["GitHub", "Vercel", "Railway", "Supabase", "Agentes"],
    features: [
      "Status centralizado de projetos",
      "Leitura de publicações e registros",
      "Identificação de pendências",
      "Relatórios de acompanhamento",
    ],
    architecture: ["Fontes", "Conectores", "Agente", "Análise", "Relatório"],
    problem:
      "Acompanhar vários projetos exige alternar entre plataformas e reconstruir mentalmente o estado de cada entrega.",
    solution:
      "O agente deverá consultar fontes autorizadas, normalizar sinais operacionais e apresentar uma visão curta do que precisa de atenção.",
    challenges: ["Integrações com escopo mínimo", "Normalização de eventos", "Sinal versus ruído"],
    learnings: ["Em validação durante a construção do MVP"],
    results: "Projeto ainda em desenvolvimento. O estudo será atualizado após uma demonstração funcional.",
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
    statusLabel: "Publicado",
    year: "2025 — atual",
    href: "https://bocaiuva-app.vercel.app/",
    stack: ["React Native", "Expo", "React", "TypeScript", "Firebase", "Supabase", "Zustand", "Vercel"],
    features: [
      "Autenticação e perfis",
      "Jogadores, times e partidas",
      "Presença, escalação e histórico",
      "MVP, rankings e páginas públicas",
    ],
    architecture: ["Web / Mobile", "Aplicação", "Firebase", "Arquivos", "Páginas públicas"],
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
    statement: "Comércio digital pensado para a jornada completa.",
    summary:
      "E-commerce responsivo com catálogo, checkout, pagamento, frete, pedidos, estoque, administração e estrutura técnica para SEO.",
    status: "production",
    statusLabel: "Publicado",
    year: "Produto em evolução",
    href: "https://homologacao.itsmepratas.com.br/",
    stack: ["Next.js", "React", "TypeScript", "Sanity", "Mercado Pago", "Melhor Envio", "Vercel"],
    features: ["Catálogo e estoque", "Checkout e pedidos", "Pagamento e frete", "Administração e SEO"],
    architecture: ["Loja", "Next.js", "APIs de comércio", "Sanity", "Operação"],
    problem:
      "Uma loja digital precisa coordenar descoberta, estoque, frete, pagamento e acompanhamento do pedido sem quebrar a confiança da compra.",
    solution:
      "A experiência conecta catálogo e conteúdo a integrações de comércio, preservando responsividade, clareza do checkout e operação administrativa.",
    challenges: ["Integrações externas", "Estados do checkout", "Consistência entre catálogo e operação"],
    learnings: ["Arquitetura orientada à jornada", "SEO técnico", "Tratamento de estados transacionais"],
    results: "E-commerce publicado em ambiente web. Métricas comerciais não foram disponibilizadas e não são inferidas neste estudo.",
  },
  {
    slug: "sistema-veterinario",
    index: "05",
    title: "Sistema Veterinário",
    shortTitle: "Sistema Veterinário",
    statement: "A operação da clínica organizada em um único fluxo.",
    summary:
      "Sistema para apoiar clientes, estoque, fechamentos, histórico e controle financeiro, com experiência web instalável e estrutura desktop.",
    status: "production",
    statusLabel: "Publicado",
    year: "Produto em evolução",
    href: "https://gustavo-sistema.vercel.app/",
    stack: ["React", "Vite", "Supabase", "Tauri", "PWA", "Tailwind"],
    features: [
      "Clientes e histórico",
      "Estoque e produtos",
      "Fechamentos e pagamentos",
      "Controle financeiro e impressão",
    ],
    architecture: ["Interface", "Operação", "Supabase", "Modo offline", "Impressão"],
    problem:
      "Rotinas administrativas dispersas dificultam acompanhar clientes, produtos, pagamentos e o fechamento de cada atendimento.",
    solution:
      "A aplicação reúne os fluxos essenciais da operação, com navegação responsiva, dados centralizados e recursos de apoio como impressão e QR Code Pix.",
    challenges: ["Organização de múltiplos fluxos", "Continuidade offline", "Experiência web e desktop"],
    learnings: ["Aplicações instaláveis", "Sincronização de dados", "Modelagem de rotinas operacionais"],
    results: "Aplicação publicada na web e mantida como produto em evolução. Resultados operacionais não são estimados sem dados medidos.",
  },
  {
    slug: "mapa-espirita",
    index: "06",
    title: "Mapa Espírita",
    shortTitle: "Mapa Espírita",
    statement: "Encontre centros próximos e transforme localização em caminho.",
    summary:
      "Aplicativo mobile para localizar centros espíritas, consultar informações úteis, salvar favoritos e abrir rotas no Google Maps.",
    status: "production",
    statusLabel: "Aplicativo mobile",
    year: "2026 · v3.1.0",
    href: "https://github.com/PedroCCallejas/mapa-espirita",
    stack: ["Expo", "React Native", "TypeScript", "Google Places", "AsyncStorage", "AdMob"],
    features: [
      "Busca por localização, cidade ou bairro",
      "Detalhes e rotas externas",
      "Favoritos salvos no aparelho",
      "Mensagens e conteúdo com suporte offline",
    ],
    architecture: ["Localização", "Google Places", "Aplicativo", "Dados locais", "Rotas"],
    problem:
      "Encontrar centros próximos e informações atualizadas exige pesquisar em fontes separadas e reorganizar os dados manualmente.",
    solution:
      "O aplicativo combina localização, busca manual e APIs do Google em uma experiência mobile direta, com favoritos e conteúdo disponível offline.",
    challenges: ["Permissões de localização", "Dados de APIs externas", "Conteúdo útil mesmo offline"],
    learnings: ["Desenvolvimento mobile com Expo", "Integração com localização", "Persistência local"],
    results: "Aplicativo Android em evolução, com versão e roteiro de publicação documentados no repositório público.",
  },
  {
    slug: "saldo-financeiro",
    index: "07",
    title: "Saldo Financeiro",
    shortTitle: "Saldo Financeiro",
    statement: "Seu dinheiro, sem ruído.",
    summary:
      "Sistema privado de controle financeiro pessoal para reunir receitas, impostos, cartões, parcelas e planejamento mensal.",
    status: "production",
    statusLabel: "Publicado",
    year: "2026 · Acesso privado",
    href: "https://saldo-financeiro.vercel.app/",
    stack: ["Next.js", "React", "TypeScript", "Neon", "PostgreSQL", "Tailwind", "PWA"],
    features: [
      "Receitas e impostos",
      "Cartões, faturas e parcelas",
      "Planejamento mensal",
      "Dados isolados por usuário",
    ],
    architecture: ["Neon Auth", "Regras financeiras", "PostgreSQL", "RLS", "PWA"],
    problem:
      "Receitas, descontos, cartões e planos mensais perdem clareza quando ficam distribuídos entre planilhas e cálculos manuais.",
    solution:
      "O sistema apresenta uma visão pessoal e protegida do financeiro, evitando dupla contagem de parcelas e destacando o saldo líquido previsto.",
    challenges: ["Cálculos financeiros consistentes", "Privacidade por usuário", "Clareza em diferentes períodos"],
    learnings: ["Modelagem de dados financeiros", "Estados de autenticação", "Experiência instalável"],
    results: "Aplicação publicada com acesso privado. Dados financeiros e métricas de uso não são expostos neste estudo.",
  },
  {
    slug: "tdcalherath",
    index: "08",
    title: "Calherath TD",
    shortTitle: "Calherath TD",
    statement: "Um tower defense autoral onde estratégia encontra sistemas combináveis.",
    summary:
      "Jogo em desenvolvimento com Unity 6 e C#, acompanhado por um site interativo que apresenta raças, torres, combinações e escolhas especiais.",
    status: "building",
    statusLabel: "Em desenvolvimento",
    year: "Projeto autoral",
    stack: ["Unity 6", "C#", "Next.js", "GSAP", "Design de jogos"],
    features: [
      "Grid, construção e seleção de torres",
      "Pathfinding, ondas e combate",
      "Raças, fusões e combinações",
      "Site interativo do universo do jogo",
    ],
    architecture: ["Mapa", "Grid", "Torres", "Combate", "Economia"],
    problem:
      "Um tower defense precisa coordenar posicionamento, caminho, economia, tipos de dano e progressão sem perder clareza estratégica.",
    solution:
      "O projeto separa dados, combate, monstros, torres, grid e interface em sistemas próprios, permitindo testar combinações e evoluir o protótipo por partes.",
    challenges: ["Equilíbrio entre sistemas", "Pathfinding durante a construção", "Feedback visual para o jogador"],
    learnings: ["Arquitetura de jogabilidade em C#", "Sistemas orientados a dados", "Prototipação de design de jogos"],
    results: "Protótipo em desenvolvimento com sistemas de grid, combate, monstros, torres e economia, além de um site próprio em Next.js e GSAP.",
  },
  {
    slug: "ponto-cego-do-universo",
    index: "09",
    title: "Ponto Cego do Universo",
    shortTitle: "Ponto Cego do Universo",
    statement: "Uma linha de produção audiovisual com automação e decisão humana.",
    summary:
      "Pipeline editorial para pesquisar, revisar, organizar e renderizar vídeos, usando n8n na orquestração e mantendo aprovação humana antes de qualquer publicação.",
    status: "building",
    statusLabel: "Pipeline em evolução",
    year: "2026 · Projeto autoral",
    stack: ["n8n", "TypeScript", "FFmpeg", "Electron", "Docker", "Piper"],
    features: [
      "Pesquisa e verificação por fontes",
      "Manifestos e decisões editoriais rastreáveis",
      "Voz local, cenas e renderização vertical",
      "Interface local para aprovações e entregas",
    ],
    architecture: ["Pesquisa", "n8n", "Revisão humana", "Renderização", "Entrega"],
    problem:
      "Produzir conteúdo audiovisual recorrente exige coordenar pesquisa, fatos, roteiro, voz, mídias, direitos de uso, edição e versões sem perder a origem de cada decisão.",
    solution:
      "O projeto separa orquestração, edição e aprovação: o n8n organiza os fluxos, um renderizador em TypeScript e FFmpeg compõe as saídas e manifestos registram o que foi revisado e selecionado.",
    challenges: ["Rastreabilidade editorial", "Sincronização entre voz, cenas e legendas", "Controle de direitos e aprovações"],
    learnings: ["Automação com decisão humana", "Fluxos observáveis", "Pipeline audiovisual estruturado"],
    results:
      "Pesquisa, voz local, renderização, validações e organização editorial possuem implementações locais. Upload e publicação permanecem manuais e bloqueados por padrão.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
