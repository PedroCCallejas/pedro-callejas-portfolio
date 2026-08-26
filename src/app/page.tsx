import { IntroLoader } from "@/components/animations/intro-loader";
import { Header } from "@/components/layout/header";
import { About, Architecture, Contact, FeaturedWork, Hero, Stack, WhatIBuild } from "@/components/sections/home-sections";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <Header />
      <main id="main-content">
        <Hero />
        <WhatIBuild />
        <FeaturedWork />
        <Architecture />
        <Stack />
        <About />
        <Contact />
      </main>
      <footer className="footer section-shell"><span>© {new Date().getFullYear()} Pedro Carvalho Callejas</span><span className="mono">Projetado como um sistema.</span></footer>
    </>
  );
}
