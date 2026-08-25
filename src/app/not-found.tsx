import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><span className="mono text-cyan">404 / NODE_NOT_FOUND</span><h1>Essa conexão não existe.</h1><p>O caminho pode ter mudado ou o projeto ainda não foi conectado.</p><Link className="button focus-ring" href="/">Voltar ao sistema</Link></main>;
}
