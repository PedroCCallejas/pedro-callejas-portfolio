# Pedro Callejas — Portfólio

Portfólio profissional de Pedro Carvalho Callejas: desenvolvimento Full Stack, IA, agentes, automação e produtos digitais. A interface funciona como uma demonstração do próprio raciocínio de sistemas — com nós, conexões, diagramas e projetos orientados a problema, solução e arquitetura.

## Stack

- Next.js com App Router
- React e TypeScript
- Tailwind CSS
- Motion for React
- Lucide Icons
- Vercel

## Instalação

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Validação

```bash
npm run typecheck
npm run lint
npm run build
```

## Estrutura

```text
src/
  app/          rotas, metadata e SEO
  components/   layout, animações, diagramas, projetos e seções
  data/         projetos e conteúdo do site
  types/        contratos TypeScript
docs/           decisões de arquitetura visual e técnica
```

## Projetos e estudos

Os projetos são definidos em `src/data/projects.ts`. Cada item gera uma página em `/work/[slug]` com visão geral, problema, solução, arquitetura, demonstração, desafios, aprendizados e resultados.

A seleção atual reúne oito projetos: Agente de E-mail com IA, Agente de Controle de Projetos, Professô FC, It’s Me Pratas, Sistema Veterinário, Mapa Espírita, Saldo Financeiro e Calherath TD.

O agente de e-mail possui MVP validado localmente com 103 testes. O agente de controle de projetos e o Calherath TD permanecem marcados como trabalhos em desenvolvimento.

## Animações

- abertura CSS inferior a um segundo;
- reveals com Motion;
- rede vetorial reativa no hero;
- fluxos de dados em diagramas;
- estados acessíveis por hover, foco e toque;
- fallback completo para `prefers-reduced-motion`.

Three.js e GSAP foram deliberadamente evitados na primeira versão: o mesmo conceito visual foi atingido com menos JavaScript, melhor carregamento e manutenção mais simples.

## Deploy

O projeto é compatível com deploy direto na Vercel. Com a integração Git ativa, pushes na branch principal geram produção e branches de trabalho geram previews.

## Roadmap

- adicionar vídeos e imagens reais aos estudos;
- integrar e publicar o Agente de E-mail com IA;
- concluir e validar o Agente de Controle de Projetos;
- substituir conteúdo provisório por resultados comprovados;
- adicionar domínio próprio e currículo público;
- avaliar Three.js pontual somente se houver ganho narrativo mensurável.
