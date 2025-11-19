/* src/components/ProjectCard.tsx */
"use client";

import { ProjectId, useLang } from "@/context/LanguageContext";
import Image from "next/image";

type Props = {
  id: ProjectId;
  thumb: string;
  stack: string[];
  github: string;
  demo: string;
};

export default function ProjectCard({ id, thumb, stack, github, demo }: Props) {
  const { t, lang } = useLang();

  const title = t.projects[id].title;
  const subtitle = t.projects[id].subtitle;

  const moreInfoLabel = lang === "es" ? "Más info" : "More info";
  const demoLabel = "Demo";

  // 👉 Condición: solo hay demo si el enlace NO es "#"
  const hasDemo = demo && demo !== "#" && demo.trim() !== "";

  return (
    <article className="card portfolio-card border rounded-4 overflow-hidden h-100">
      <div className="ratio ratio-16x9">
        <Image
          src={thumb}
          alt={title}
          width={1600}
          height={900}
          className="object-fit-cover"
        />
      </div>

      <div className="card-body">
        <h5 className="card-title mb-1">{title}</h5>
        <small className="text-muted-soft d-block mb-2">{subtitle}</small>

        <div className="mb-3">
          <div className="fw-semibold">
            {lang === "es" ? "Tecnologías" : "Tech stack"}
          </div>

          <div className="d-flex gap-2 flex-wrap mt-1">
            {stack.map((s) => (
              <span key={s} className="badge badge-tech">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* Siempre mostramos "Más info / More info" */}
          <a
            className="btn btn-dark"
            target="_blank"
            rel="noopener"
            href={github}
          >
            <i className="bi bi-github me-1" /> {moreInfoLabel}
          </a>

          {/* Solo mostramos Demo si tiene demo real */}
          {hasDemo && (
            <a
              className="btn btn-outline-secondary"
              target="_blank"
              rel="noopener"
              href={demo}
            >
              <i className="bi bi-box-arrow-up-right me-1" /> {demoLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
