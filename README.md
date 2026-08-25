# Pedro Callejas — Portfolio

Portfólio profissional de Pedro Carvalho Callejas: Full Stack Development, IA, agentes e automação. A interface funciona como uma demonstração do próprio raciocínio de sistemas — com nós, conexões, diagramas e cases orientados a problema, solução e arquitetura.

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

## Projetos e cases

Os projetos são definidos em `src/data/projects.ts`. Cada item gera uma página em `/work/[slug]` com seções para overview, problema, solução, arquitetura, demonstração, desafios, aprendizados e resultados.

Os agentes de e-mail e controle de projetos começam honestamente como `Building`; o modelo de dados está pronto para receber demonstrações e evidências quando os MVPs forem validados.

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

- adicionar vídeos e screenshots reais aos cases;
- concluir e validar o Email AI Agent;
- concluir e validar o Project Control Agent;
- substituir conteúdo provisório por resultados comprovados;
- adicionar domínio próprio e currículo público;
- avaliar Three.js pontual somente se houver ganho narrativo mensurável.
