"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand focus-ring" href="#top" aria-label="Ir para o início">
        <span className="brand-mark">PC</span>
        <span className="brand-label">Laboratório de Sistemas</span>
      </a>

      <nav className="desktop-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <a className="nav-link focus-ring" href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <a className="button button--small focus-ring" href="#contact">Vamos conversar</a>
      </nav>

      <button
        className="menu-button focus-ring"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>

      {open && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Navegação móvel">
          {navigation.map((item) => (
            <a className="focus-ring" href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="text-cyan focus-ring" href="#contact" onClick={() => setOpen(false)}>Vamos conversar ↗</a>
        </nav>
      )}
    </header>
  );
}
