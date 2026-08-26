import { ImageResponse } from "next/og";

export const alt = "Pedro Callejas — Full Stack, IA e Automação";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#07090b", color: "#f1f3f2", padding: "72px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "18px", color: "#6ee7f2", fontSize: 22 }}><div style={{ width: 12, height: 12, borderRadius: 99, background: "#6ee7f2" }} /> LABORATÓRIO DE SISTEMAS</div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 28, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8d949a" }}>Pedro Carvalho Callejas</div><div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 600, lineHeight: 1.05, marginTop: 24 }}><span>Software que</span><span>faz o trabalho.</span></div></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8d949a" }}><span>Full Stack · IA · Automação</span><span>pedroccallejas.dev</span></div>
    </div>,
    size,
  );
}
