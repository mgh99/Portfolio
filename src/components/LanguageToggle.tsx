// src/components/LanguageToggle.tsx
"use client";

import { useLang } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="btn-group btn-group-sm" role="group" aria-label="Language switcher">
      <button
        type="button"
        className={`btn btn-outline-secondary ${lang === "es" ? "active" : ""}`}
        onClick={() => setLang("es")}
      >
        ES
      </button>
      <button
        type="button"
        className={`btn btn-outline-secondary ${lang === "en" ? "active" : ""}`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
