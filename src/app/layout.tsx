import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const siteUrl = "https://pedro-callejas-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Pedro Callejas — Full Stack, AI & Automation", template: "%s — Pedro Callejas" },
  description: "Portfólio de Pedro Carvalho Callejas: sistemas Full Stack, agentes de IA, automações e produtos digitais.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: "Pedro Callejas — Software that does the work",
    description: "Sistemas Full Stack, agentes de IA, automações e produtos digitais para problemas reais.",
    siteName: "Pedro Callejas",
  },
  twitter: { card: "summary_large_image", title: "Pedro Callejas — Full Stack, AI & Automation", description: "Software that does the work." },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07090b", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pedro Carvalho Callejas",
    jobTitle: "Full Stack Developer",
    url: siteUrl,
    sameAs: ["https://github.com/PedroCCallejas", "https://br.linkedin.com/in/pedroccallejas"],
    knowsAbout: ["Full Stack Development", "Next.js", "Artificial Intelligence", "Automation", "Software Architecture"],
  };

  return (
    <html lang="pt-BR" className={`${geist.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
