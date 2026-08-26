export function IntroLoader() {
  return (
    <div className="intro-loader" aria-hidden="true">
      <div className="intro-loader__panel">
        <span className="mono text-[10px] uppercase tracking-[0.22em] text-cyan">Iniciando ambiente</span>
        <div className="intro-loader__line" />
        <span className="mono text-xs text-muted">Sistemas conectados. Pedro está pronto.</span>
      </div>
    </div>
  );
}
