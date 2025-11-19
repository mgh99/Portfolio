/* src/app/page.tsx */
"use client";

import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import SkillsSection from "@/components/SkillsSection";
import { useLang } from "@/context/LanguageContext";
import { useState } from "react";

import projects from "@/data/projects.json";


export default function Home() {
  const { t, lang } = useLang();

  const [filter, setFilter] = useState<"all" | "frontend" | "ai_security" | "app">("all");

  const filteredProjects =
      filter === "all" ? projects : projects.filter((p: any) => p.category === filter);


  return (
    <main className="container py-5">
      {/* Hero / About */}
      <section id="about" className="mb-5">
        <span className="accent-pill">{t.hero.badge}</span>
        <h1 className="display-4 fw-bold mt-3">
          {t.hero.title}
        </h1>
        <p className="mt-3 section-muted" style={{ maxWidth: "640px" }}>
          {t.hero.subtitle}
        </p>

        <div className="d-flex flex-wrap gap-3 mt-4">
          <a href="#projects" className="btn btn-lg" style={{ backgroundColor: "var(--accent)", color: "#fff" }}>
            {t.hero.ctaProjects}
          </a>
          <a
            href={lang === "es" ? "/cv-maria-es.pdf" : "/cv-maria-en.pdf"}
            className="btn btn-lg btn-outline-secondary"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            download
          >
            {t.hero.ctaResume}
          </a>

        </div>
      </section>

      {/* Skills */}
      <SkillsSection />


      {/* Projects */}
            <section id="projects" className="mt-5">
        <h2 className="section-title">{t.sections.projectsTitle}</h2>

        {/* filtros estilo pills */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {[
            { id: "all", label: "All" },
            { id: "frontend", label: "Frontend" },
            { id: "ai_security", label: "AI & Security" },
            { id: "app", label: "Apps" }
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id as any)}
              className={`btn btn-sm ${
                filter === f.id ? "btn-dark" : "btn-outline-secondary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {filteredProjects.map((p) => (
            <div key={p.id} className="col-12 col-md-6">
              <ProjectCard {...(p as any)} />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mt-5 mb-4">
        <h2 className="section-title">{t.sections.contactTitle}</h2>
        <p className="section-muted mb-4">{t.sections.contactSubtitle}</p>

        <div className="contact-card">
          <div className="row g-4">
            <div className="col-12 col-lg-7">
              <ContactForm />
            </div>

            <div className="col-12 col-lg-5">
              <h6 className="fw-semibold mb-1">{t.contact.emailLabel}</h6>
              <a
                href="mailto:maria.gonzalez.herrero99@gmail.com"
                className="d-inline-flex align-items-center gap-2 mb-3"
              >
                <i className="bi bi-envelope-open" />
                <span>maria.gonzalez.herrero99@gmail.com</span>
              </a>

              <h6 className="fw-semibold mt-3 mb-1">{t.contact.linksLabel}</h6>
              <div className="d-flex flex-wrap gap-3">
                <a href="https://github.com/mgh99" target="_blank" rel="noopener">
                  <i className="bi bi-github me-1" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/maria-gonzalez-herrero-56bb21177/"
                  target="_blank"
                  rel="noopener"
                >
                  <i className="bi bi-linkedin me-1" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container site-footer-inner">

          <div className="site-footer-text">
            © {new Date().getFullYear()} María González Herrero · AI · Security · Full-Stack
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="site-footer-text">Built with Next.js & Bootstrap</span>

            <a href="#top" className="back-to-top-btn">
              ↑
            </a>
          </div>

          </div>
      </footer>
    </main>
  );
}
