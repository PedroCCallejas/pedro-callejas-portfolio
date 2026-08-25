export function CapabilityDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div className="capability-diagram" aria-hidden="true">
      <span className="diagram-core">◆</span>
      <span className="diagram-line" />
      <div className="diagram-nodes">
        {nodes.map((node) => <span key={node}>{node}</span>)}
      </div>
    </div>
  );
}
