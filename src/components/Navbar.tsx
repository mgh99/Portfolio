// src/components/Navbar.tsx
"use client";

import { useLang } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { t } = useLang();

  return (
    <nav className="navbar navbar-expand-lg navbar-portfolio sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#top">
          <span style={{ color: "var(--accent-strong)" }}>MGH</span>
          <span className="ms-1">.dev</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3">
            <li className="nav-item">
              <a className="nav-link" href="#about">
                {t.nav.about}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects">
                {t.nav.projects}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#skills">
                {t.nav.skills}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#publications">
                {t.nav.publications}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                {t.nav.contact}
              </a>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
