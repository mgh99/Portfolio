/* src/components/SkillsSection.tsx */
"use client";

import { useLang } from "@/context/LanguageContext";

const WEB_FULLSTACK = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "FastAPI",
  "Firebase",
  "MongoDB",
  "REST APIs",
  "Python",
];

const AI_ML = ["TensorFlow", "U-Net", "LLMs"];

const DEVOPS = ["Docker", "GitHub", "Vercel", "Firebase Hosting"];

export default function SkillsSection() {
  const { t, lang } = useLang();

  return (
    <section id="skills" className="mt-5">
      <h2 className="section-title">{t.sections.skillsTitle}</h2>
      <p className="section-muted mb-3" style={{ maxWidth: 620 }}>
      </p>

      <div className="row g-4 mt-1">
        {/* WEB FULLSTACK */}
        <div className="col-12 col-md-4">
          <div className="skill-square">
            <div className="skill-square-title">Web Fullstack</div>
            <div className="skill-square-subtitle">{t.sections.skillsFullstackDesc}</div>
            <div className="d-flex flex-wrap gap-2">
              {WEB_FULLSTACK.map((s) => (
                <span key={s} className="skill-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI · ML */}
        <div className="col-12 col-md-4">
          <div className="skill-square">
            <div className="skill-square-title">AI · ML</div>
            <div className="skill-square-subtitle">{t.sections.skillsAIDesc}</div>
            <div className="d-flex flex-wrap gap-2">
              {AI_ML.map((s) => (
                <span key={s} className="skill-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* DEVOPS */}
        <div className="col-12 col-md-4">
          <div className="skill-square">
            <div className="skill-square-title">DevOps</div>
            <div className="skill-square-subtitle">{t.sections.skillsDevOpsDesc}</div>
            <div className="d-flex flex-wrap gap-2">
              {DEVOPS.map((s) => (
                <span key={s} className="skill-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
