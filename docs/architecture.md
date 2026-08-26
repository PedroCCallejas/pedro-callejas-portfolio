# Arquitetura visual e técnica

## Objetivo

O portfólio apresenta Pedro Carvalho Callejas como alguém que constrói sistemas modernos, agentes e automações para problemas reais. A experiência prioriza projetos e raciocínio técnico em vez de uma lista de tecnologias.

## Direção visual

- **Conceito:** Laboratório de Sistemas Digitais.
- **Paleta:** grafite profundo, branco quente, ciano elétrico e violeta pontual.
- **Linguagem:** grids, nós, conexões, fluxos de dados e diagramas funcionais.
- **Tipografia:** Geist para leitura e Geist Mono para estados, índices e metadados.
- **Tom:** tecnológico e preciso, sem estética gamer ou cyberpunk excessiva.

## Contrato de design

### Manter

- O conteúdo profissional real e os status honestos dos projetos.
- Scroll nativo, sem bloquear navegação.
- Texto e links acessíveis sem depender de animação.

### Criar

- Hero com rede vetorial reativa.
- Cards editoriais de capacidade.
- Projetos orientados a dados e páginas de estudo por slug.
- Diagrama interativo da arquitetura.
- Mapa de competências em camadas, estudos e interesses, formação e contato.

### Não incluir nesta fase

- Three.js/WebGL: o ganho não compensa o custo inicial de GPU e hidratação.
- GSAP: Motion e CSS cobrem a narrativa proposta com menos JavaScript.
- Métricas ou resultados não comprovados.
- Integrações reais dos agentes em desenvolvimento.

## Orçamento de experiência

1. **Abertura rápida:** overlay CSS inferior a um segundo; removido em reduced motion.
2. **Reveals:** entrada única por seção com opacidade e deslocamento curto.
3. **Fluxos:** pequenos pacotes percorrem linhas para explicar direção de dados.
4. **Interação contextual:** nós reagem a hover, foco e toque; a rede do hero reage levemente ao cursor somente em desktop.

## Arquitetura técnica

- Next.js App Router e TypeScript strict.
- Server Components para páginas e conteúdo.
- Client Components somente para navegação, reveals e diagramas interativos.
- Tailwind CSS para fundação utilitária e CSS global para o sistema visual específico.
- Conteúdo de nove projetos centralizado em `src/data/projects.ts`.
- Rotas de estudo estáticas em `src/app/work/[slug]`.
- Metadata, Open Graph, JSON-LD, sitemap e robots nativos do Next.js.

## Responsividade e acessibilidade

- Breakpoints verificados em 375, 768, 1024 e 1440 px.
- Layouts de uma coluna no mobile; fluxos longos ganham rolagem horizontal local.
- Navegação por teclado, foco visível, skip link e elementos semânticos.
- `prefers-reduced-motion` desativa a abertura e reduz todas as transições.

## Evolução dos agentes

O `email-agent` documenta um MVP local validado com 103 testes, ainda sem integrações reais ou publicação. O `project-agent` permanece em desenvolvimento. Conforme cada etapa for validada, os dados podem receber mídia, demonstrações e resultados comprovados.

## Estudos e narrativa pessoal

A seção de estudos conecta interesses pessoais e experimentação técnica sem competir com os projetos principais. Jogos aparecem como repertório de sistemas e interação; Claude, Codex e agentes aparecem como estudo aplicado; n8n, FFmpeg e edição de vídeo aparecem vinculados ao Ponto Cego do Universo. Vídeos reais dos projetos ficam reservados para a última fase de conteúdo.
