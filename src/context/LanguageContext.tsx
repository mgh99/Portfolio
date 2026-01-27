// src/context/LanguageContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "es" | "en";

const dictionary = {
  es: {
    nav: {
      about: "Sobre mí",
      projects: "Proyectos",
      skills: "Tecnologías",
      publications: "Publicaciones",
      contact: "Contacto",
    },

    hero: {
      title: "María González Herrero",
      subtitle:
        "Me gusta crear aplicaciones que simplifiquen procesos complejos: desde pentesting automatizado hasta plataformas web con IA.",
      badge: "AI · Cybersecurity · Automation",
      ctaProjects: "Ver proyectos",
      ctaResume: "Descargar CV",
    },

    sections: {
      projectsTitle: "Mis proyectos",
      projectsSubtitle: "Selección de herramientas y aplicaciones que he creado.",
      skillsTitle: "Tecnologías",

      skillsDev: "Desarrollo",
      skillsFullstackDesc: "Frontend y backend para aplicaciones completas.",

      skillsAI: "IA y datos",
      skillsAIDesc: "Modelos para visión, segmentación y asistentes con LLMs.",

      skillsOps: "DevOps & otros",
      skillsDevOpsDesc: "Despliegues, herramientas y automatización alrededor del código.",

      publicationsTitle: "Publicaciones & Research",
      publicationsSubtitle: "Producción académica y trabajos revisados por pares.",

      contactTitle: "Contacto",
      contactSubtitle:
        "¿Te interesa colaborar o saber más sobre alguno de los proyectos?",
    },

    projects: {
      dashboard: {
        title: "Dashboard de trabajos",
        subtitle: "Panel para gestionar tareas, estados y métricas",
      },
      glitch: {
        title: "Glitch_ai — Pentesting con LLM",
        subtitle: "Orquestación de herramientas y generación de informes",
      },
      app_field_service: {
        title: "Cuaderno de campo digital",
        subtitle: "Gestión de actividades de campo y campañas",
      },
      dendrite_spines: {
        title: "Detección de espinas dendríticas",
        subtitle: "U-Net para segmentación de espinas dendríticas",
      },
    },

    publications: {
      paperTitle: "IEEE CAI 2026 — Artículo de Conferencia",
      paperSubtitle: "Investigación en ciberseguridad basada en IA, desarrollada como extensión de mi TFM.",

      accepted: "Aceptado",
      published: "Publicado",
      under_review: "En revisión",

      details: "Detalles",
      venue: "Conferencia",

      venueLabel: "Conferencia",
      whenWhereLabel: "Fecha / Lugar",
      statusLabel: "Estado",
      affiliationsLabel: "Afiliaciones",
      supervisorsLabel: "Supervisores / Coautores",
      noteLabel: "Nota",

      noteAfterPublication: "La referencia completa estará disponible tras la publicación.",
    },

    common: {
      close: "Cerrar",
    },


    contact: {
      emailLabel: "Email",
      linksLabel: "Enlaces",
      formName: "Nombre",
      formEmail: "Correo electrónico",
      formMessage: "Mensaje",
      formSubmit: "Enviar mensaje",
      formSending: "Enviando...",
      formSuccess: "Mensaje enviado. ¡Gracias por escribir!",
      formError: "Revisa los campos o inténtalo de nuevo.",
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      publications: "Publications",
      contact: "Contact",
    },

    hero: {
      title: "María González Herrero",
      subtitle:
        "I enjoy building applications that simplify complex processes—from automated pentesting to AI-powered web platforms.",
      badge: "AI · Cybersecurity · Automation",
      ctaProjects: "View projects",
      ctaResume: "Download resume",
    },

    sections: {
      projectsTitle: "Projects",
      projectsSubtitle: "Selection of tools and applications I’ve built.",
      skillsTitle: "Skills",

      skillsDev: "Development",
      skillsFullstackDesc: "Frontend and backend for full applications.",
      
      skillsAI: "AI & data",
      skillsAIDesc: "Models for vision, segmentation and LLM assistants.",

      skillsOps: "DevOps & other",
      skillsDevOpsDesc: "Deployments, tooling and automation around code.",

      publicationsTitle: "Publications & Research",
      publicationsSubtitle: "Peer-reviewed outputs and academic work.",

      contactTitle: "Contact",
      contactSubtitle:
        "Interested in collaborating or learning more about a project?",
    },

    projects: {
      dashboard: {
        title: "Work Dashboard",
        subtitle: "Panel to manage tasks, status and metrics",
      },
      glitch: {
        title: "Glitch_ai — Pentesting with LLM",
        subtitle: "Tool orchestration and automatic report generation",
      },
      app_field_service: {
        title: "Digital field notebook",
        subtitle: "Manage field activities and agricultural logs",
      },
      dendrite_spines: {
        title: "Dendritic spine detection",
        subtitle: "U-Net for dendritic spine segmentation",
      }
    },

    publications: {
      paperTitle: "IEEE CAI 2026 — Conference Paper",
      paperSubtitle: "AI-driven cybersecurity research, developed as an extension of my MSc dissertation.",

      accepted: "Accepted",
      published: "Published",
      under_review: "Under review",

      details: "Details",
      venue: "Venue",

      venueLabel: "Venue",
      whenWhereLabel: "When / Where",
      statusLabel: "Status",
      affiliationsLabel: "Affiliations",
      supervisorsLabel: "Supervisors / Co-authors",
      noteLabel: "Note",

      noteAfterPublication: "Full citation available after publication.",
    },

    common: {
      close: "Close",
    },

    contact: {
      emailLabel: "Email",
      linksLabel: "Links",
      formName: "Name",
      formEmail: "Email address",
      formMessage: "Message",
      formSubmit: "Send message",
      formSending: "Sending...",
      formSuccess: "Message sent. Thanks for reaching out!",
      formError: "Please check the fields or try again.",
    },
  },
} as const;

// tipo de un idioma concreto (ambos tienen la misma forma)
export type Dict = (typeof dictionary)[Lang];

const LANG_KEY = "mgh-lang";

const LangContext = createContext<{
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}>({
  lang: "es",
  t: dictionary.es,
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored =
      (typeof window !== "undefined"
        ? (window.localStorage.getItem(LANG_KEY) as Lang | null)
        : null) || "es";
    setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANG_KEY, l);
    }
  };

  const t = dictionary[lang];

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
export type ProjectId = keyof (typeof dictionary)["es"]["projects"];
