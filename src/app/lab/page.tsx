// src/app/lab/page.tsx
"use client";

import { useLang } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./lab.css";

// ── TYPES ──────────────────────────────────────────────
type LabTag = "all" | "frontend" | "security" | "hardware" | "ai" | "tool";
type LabStatus = "live" | "wip" | "hardware" | "concept";

type LabProject = {
  index: string;
  nameEs: string;
  nameEn: string;
  descEs: string;
  descEn: string;
  tags: Exclude<LabTag, "all">[];
  github?: string;
  demo?: string;
  href?: string;
  thumb?: string;
  gallery?: string[];
  status: LabStatus;
  accentColor?: string;
  size?: "sm" | "md" | "lg" | "xl";
  bgExtra?: string;
};

// ── DATA ───────────────────────────────────────────────
const LAB_PROJECTS: LabProject[] = [
  {
    index: "001",
    nameEs: "Stream Deck — Desde Cero",
    nameEn: "Stream Deck — From Scratch",
    descEs: "Carcasa impresa en 3D. ESP32-C3. Switches Cherry MX. Software WPF configurable en arranque.",
    descEn: "3D-printed case. ESP32-C3. Cherry MX switches. WPF software configurable on boot.",
    tags: ["hardware", "tool"],
    href: "/lab/stream-deck",
    thumb: "/thumbs/lab-stream-deck.png",
    gallery: ["/gallery/stream_dock_01.jpeg","/gallery/stream_dock_02.jpeg","/gallery/stream_dock_03.jpeg","/gallery/stream_dock_04.jpeg","/gallery/stream_dock_05.jpeg","/gallery/stream_dock_06.jpeg"],
    status: "hardware",
    accentColor: "var(--lab-green)",
    size: "xl",
  },
  {
    index: "002",
    nameEs: "Longboard Eléctrico",
    nameEn: "Electric Longboard",
    descEs: "Motor brushless, ESC, batería LiPo y mando 2.4 GHz. Construido con 16 años. Funciona.",
    descEn: "Brushless motor, ESC, LiPo battery and 2.4 GHz remote. Built at 16. It works.",
    tags: ["hardware"],
    href: "/lab/longboard",
    thumb: "/thumbs/lab-longboard.png",
    status: "hardware",
    accentColor: "var(--lab-yellow)",
    size: "lg",
  },
  {
    index: "003",
    nameEs: "4xidraw — Plotter",
    nameEn: "4xidraw — Plotter",
    descEs: "Plotter tipo axidraw construido con 17 años. SVG → G-code → dibuja.",
    descEn: "Axidraw-style plotter built at 17. SVG → G-code → draws.",
    tags: ["hardware"],
    href: "/lab/axidraw",
    thumb: "/thumbs/lab-axidraw.png",
    status: "hardware",
    accentColor: "var(--lab-blue)",
    size: "lg",
  },
  {
    index: "004",
    nameEs: "Robot de Cócteles",
    nameEn: "Cocktail Robot",
    descEs: "3 motores, Raspberry Pi y pantalla. Hace combinaciones con 3 bebidas.",
    descEn: "3 motors, Raspberry Pi and screen. Makes combinations with 3 drinks.",
    tags: ["hardware", "tool"],
    href: "/lab/cocktail-robot",
    thumb: "/thumbs/lab-cocktail.png",
    status: "hardware",
    accentColor: "var(--lab-pink)",
    size: "md",
  },
  {
    index: "005",
    nameEs: "Pwangotchi",
    nameEn: "Pwangotchi",
    descEs: "Dispositivo de auditoría WiFi. En construcción — aún no funciona.",
    descEn: "WiFi auditing device. Work in progress — not working yet.",
    tags: ["hardware", "security"],
    status: "wip",
    accentColor: "var(--lab-red)",
    size: "sm",
  },
  {
    index: "006",
    nameEs: "Buscador de Filamentos",
    nameEn: "Filament Finder",
    descEs: "Software diseñado, hardware en diseño 3D y soldadura.",
    descEn: "Software designed, hardware in 3D design and soldering phase.",
    tags: ["hardware", "tool"],
    status: "wip",
    accentColor: "var(--lab-yellow)",
    size: "sm",
  },
  {
    index: "007",
    nameEs: "Cyberpunk Body Sim",
    nameEn: "Cyberpunk Body Sim",
    descEs: "Simulador del cuerpo humano con estética futurista y métricas interactivas.",
    descEn: "Human body simulator with futuristic aesthetic and interactive metrics.",
    tags: ["frontend", "ai"],
    github: "https://github.com/mgh99/Cyberpunk_body",
    demo: "https://cyberpunk-body.vercel.app/",
    thumb: "/thumbs/lab-cyberpunk-body.png",
    status: "wip",
    accentColor: "var(--lab-purple)",
    bgExtra: "lc-cyber-bg",
    size: "lg",
  },
  {
    index: "008",
    nameEs: "Skill Auditor",
    nameEn: "Skill Auditor",
    descEs: "Auditor de seguridad para skills de Claude. Detecta MITM, exfiltración y patrones maliciosos.",
    descEn: "Security auditor for Claude skills. Detects MITM, exfiltration and malicious patterns.",
    tags: ["security", "ai", "tool"],
    thumb: "/thumbs/lab-skill-security-audit.png",
    status: "wip",
    accentColor: "var(--lab-red)",
    size: "lg",
  },
  {
    index: "009",
    nameEs: "Pomodoro Timer",
    nameEn: "Pomodoro Timer",
    descEs: "Timer minimalista. Construido para usarlo yo misma.",
    descEn: "Minimal timer. Built to use it myself.",
    tags: ["frontend", "tool"],
    github: "https://github.com/mgh99/pomodoro",
    demo: "https://pomodoro-sand-one.vercel.app/",
    thumb: "/thumbs/lab-pomodoro.svg",
    status: "live",
    size: "md",
  },
  {
    index: "010",
    nameEs: "To-Do List",
    nameEn: "To-Do List",
    descEs: "Simple. Sin frameworks innecesarios.",
    descEn: "Simple. No unnecessary frameworks.",
    tags: ["frontend", "tool"],
    github: "https://github.com/mgh99/To-do-list",
    demo: "https://to-do-list-ebon-mu-32.vercel.app/",
    thumb: "/thumbs/lab-to-do-list.png",
    status: "live",
    size: "md",
  },
  {
    index: "011",
    nameEs: "Rendimiento Web",
    nameEn: "Web Performance",
    descEs: "Análisis de métricas y auditorías web.",
    descEn: "Web metrics analysis and audits.",
    tags: ["frontend", "tool"],
    github: "https://github.com/mgh99/Rendimiento_Web",
    thumb: "/thumbs/lab-web-performance.png",
    status: "live",
    size: "sm",
  },
  {
    index: "012",
    nameEs: "San Valentín",
    nameEn: "Valentine's Day",
    descEs: "Experimento creativo. Porque se puede.",
    descEn: "Creative experiment. Because why not.",
    tags: ["frontend"],
    github: "https://github.com/mgh99/San-Valentin",
    demo: "https://asset-manager--mgh99.replit.app/",
    thumb: "/thumbs/lab-san-valentin.png",
    status: "live",
    bgExtra: "lc-san-bg",
    size: "sm",
  },
  {
    index: "013",
    nameEs: "Armario Digital",
    nameEn: "Digital Wardrobe",
    descEs: "Sabe qué ropa tienes, con qué frecuencia te la pones y recomienda outfits basados en tu estilo.",
    descEn: "Knows what you own, how often you wear it, and recommends outfits based on your style.",
    tags: ["ai", "tool"],
    href: "/lab/armario",
    thumb: "/thumbs/lab-armario-digital.png",
    status: "wip",
    accentColor: "var(--lab-pink)",
    size: "md",
  },
  {
    index: "014",
    nameEs: "GPT de Matemáticas",
    nameEn: "Math GPT",
    descEs: "LLM especializado en matemáticas avanzadas. Los GPT genéricos fallan — este no debería.",
    descEn: "LLM specialized in advanced math. Generic GPTs fail at this — this one shouldn't.",
    tags: ["ai"],
    status: "concept",
    accentColor: "var(--lab-blue)",
    size: "sm",
  },
  {
    index: "015",
    nameEs: "API Mercado Global",
    nameEn: "Global Market API",
    descEs: "API unificada para datos de mercado financiero público. Integraciones más fáciles.",
    descEn: "Unified API for public global financial market data. Easier integrations.",
    tags: ["tool"],
    status: "concept",
    accentColor: "var(--lab-green)",
    size: "sm",
  },
  {
    index: "016",
    nameEs: "Mapa de Ciberataques",
    nameEn: "Cyberattack Map",
    descEs: "Dashboard con mapa interactivo de ataques en tiempo real. Feeds tipo Shodan/GreyNoise.",
    descEn: "Dashboard with real-time interactive attack map. Feeds like Shodan/GreyNoise.",
    tags: ["security", "ai"],
    status: "concept",
    accentColor: "var(--lab-red)",
    size: "lg",
  },
  {
    index: "017",
    nameEs: "Mente Creativa",
    nameEn: "Creative Mind",
    descEs: "App móvil que captura audios, transcribe, clasifica y prioriza ideas con IA.",
    descEn: "Mobile app that captures audio, transcribes, classifies and prioritises ideas with AI.",
    tags: ["ai", "tool"],
    status: "concept",
    accentColor: "var(--lab-purple)",
    size: "md",
  },
];

// ── STATUS CONFIG ───────────────────────────────────────
const STATUS_CONFIG = {
  live:     { label: "LIVE",     cls: "lc-badge-live" },
  wip:      { label: "WIP",      cls: "lc-badge-wip" },
  hardware: { label: "HARDWARE", cls: "lc-badge-hardware" },
  concept:  { label: "CONCEPT",  cls: "lc-badge-concept" },
};

// ── BOOT LINES ─────────────────────────────────────────
const BOOT_LINES = [
  { html: '> initializing <span style="color:var(--lab-blue)">lab.env</span>...' },
  { html: '> loading <span style="color:var(--lab-green)">kernel</span> modules... <span style="color:var(--lab-green)">[OK]</span>' },
  { html: '> mounting <span style="color:var(--lab-blue)">project.db</span>... <span style="color:var(--lab-green)">[OK]</span>' },
  { html: '> scanning <span style="color:var(--lab-pink)">17</span> entries...' },
  { html: '> threat_check: <span style="color:var(--lab-green)">skill_auditor</span> active' },
  { html: '> hardware detected: <span style="color:var(--lab-green)">4 devices</span>' },
  { html: '> <span style="color:var(--lab-yellow)">5</span> concepts pending build' },
  { html: '> all systems nominal. <span style="color:var(--lab-green)">ready.</span>' },
];

const BOOT_KEY = "mgh-lab-booted";

const START_OFFSET_MS = 14 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000 + 23 * 60 * 1000;

function formatUptime(startTime: number) {
  const elapsed = Date.now() - startTime;
  const s = Math.floor(elapsed / 1000) % 60;
  const m = Math.floor(elapsed / 60000) % 60;
  const h = Math.floor(elapsed / 3600000) % 24;
  const d = Math.floor(elapsed / 86400000);
  return `${String(d).padStart(2,"0")}d ${String(h).padStart(2,"0")}h ${String(m).padStart(2,"0")}m ${String(s).padStart(2,"0")}s`;
}

// ── CARD COMPONENT ─────────────────────────────────────
function LabCard({ p, isEs }: { p: LabProject; isEs: boolean }) {
  const name   = isEs ? p.nameEs : p.nameEn;
  const desc   = isEs ? p.descEs : p.descEn;
  const status = STATUS_CONFIG[p.status];
  const isHw   = p.status === "hardware";
  const isConcept = p.status === "concept";

  const sizeClass = {
    sm: "lc-size-sm",
    md: "lc-size-md",
    lg: "lc-size-lg",
    xl: "lc-size-xl",
  }[p.size ?? "md"];

  const accentCat =
    p.tags.includes("security") ? "security"
    : p.tags.includes("hardware") ? "hardware"
    : p.tags.includes("ai") ? "ai"
    : "frontend";

  const inner = (
    <>
      {/* Thumb */}
      {p.thumb && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "12px", zIndex: 0 }}>
          <Image src={p.thumb} alt={name} fill style={{ objectFit: "cover", opacity: 0.22 }} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      )}

      {/* Special overlays */}
      {p.index === "008" && (
        <>
          <div className="lc-scan-line" style={{ zIndex: 1 }} />
          <div className="lc-terminal-bg" style={{ zIndex: 0 }}>
            {`> scanning skills...\n> pattern_match: [MITM] [EXFIL] [INJECT]\n> threat_level: UNKNOWN\n> analyzing: skill_001.md\n> status: monitoring...\n> flagged: 0x3f2a`}
          </div>
        </>
      )}
      {p.index === "007" && <div className="lc-cyber-glow" style={{ zIndex: 0 }} />}

      {/* Concept pattern overlay */}
      {isConcept && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.015) 8px, rgba(255,255,255,0.015) 9px)",
        }} />
      )}

      <div className="lc-inner" style={{ zIndex: 2 }}>
        <div className="lc-header">
          <span className="lc-idx" style={{ color: p.accentColor ?? "var(--lab-muted)" }}>[{p.index}]</span>
          <span className={`lc-badge ${status.cls}`}>
            <span className="lc-badge-dot" />{status.label}
          </span>
        </div>

        <div className="lc-footer">
          <div className={`lc-name${p.size === "xl" || p.size === "lg" ? " lc-name-lg" : p.size === "sm" ? " lc-name-sm" : ""}`}>
            {name}
          </div>
          <p className="lc-desc">{desc}</p>

          <div className="lc-tags" style={{ marginBottom: "0.5rem" }}>
            {p.tags.map(t => (
              <span key={t} className="lc-tag" style={
                t === "hardware" ? { color: "var(--lab-green)", borderColor: "rgba(52,211,153,0.3)" }
                : t === "security" ? { color: "var(--lab-red)", borderColor: "rgba(248,113,113,0.3)" }
                : t === "ai" ? { color: "var(--lab-purple)", borderColor: "rgba(167,139,250,0.3)" }
                : {}
              }>{t}</span>
            ))}
          </div>

          <div className="lc-links">
            {p.github && (
              <a href={p.github} className="lc-link" target="_blank" rel="noopener">
                <i className="bi bi-github" /> repo
              </a>
            )}
            {p.demo && (
              <a href={p.demo} className="lc-link" target="_blank" rel="noopener">
                <i className="bi bi-box-arrow-up-right" /> demo
              </a>
            )}
            {isHw && p.href && (
              <span className="lc-link" style={{ color: p.accentColor ?? "var(--lab-green)" }}>
                <i className="bi bi-arrow-right" /> {isEs ? "ver el proceso →" : "see the build →"}
              </span>
            )}
            {!isHw && p.href && !p.github && !p.demo && (
              <span className="lc-link" style={{ color: p.accentColor ?? "var(--lab-pink)" }}>
                <i className="bi bi-arrow-right" /> {isEs ? "ver el proyecto →" : "see the project →"}
              </span>
            )}
            {isConcept && (
              <span className="lc-link lc-link-muted">
                <i className="bi bi-lightbulb" /> {isEs ? "concepto" : "concept"}
              </span>
            )}
            {!p.github && !p.demo && !isHw && !isConcept && !p.href && (
              <span className="lc-link lc-link-muted">demo → {isEs ? "pronto" : "soon"}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const cardClass = `lab-card ${sizeClass} ${p.bgExtra ?? ""}`;
  const catAttr   = accentCat;

  if (p.href) {
    return (
      <Link href={p.href} className={cardClass} data-cat={catAttr} style={{ textDecoration: "none" }}>
        {inner}
      </Link>
    );
  }

  return (
    <div className={cardClass} data-cat={catAttr}>
      {inner}
    </div>
  );
}

// ── PAGE ───────────────────────────────────────────────
export default function LabPage() {
  const { lang } = useLang();
  const isEs = lang === "es";

  const [filter, setFilter] = useState<LabTag>("all");
  const [bootDone, setBootDone]   = useState(false);
  const [bootLines, setBootLines] = useState<boolean[]>(Array(BOOT_LINES.length).fill(false));
  const [barPct, setBarPct]       = useState(0);
  const [showBar, setShowBar]     = useState(false);
  const [uptime, setUptime]       = useState("--d --h --m --s");
  const startTimeRef = useRef(Date.now() - START_OFFSET_MS);

  useEffect(() => {
    setUptime(formatUptime(startTimeRef.current));
    const id = setInterval(() => setUptime(formatUptime(startTimeRef.current)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(BOOT_KEY)) { setBootDone(true); return; }
    BOOT_LINES.forEach((_, i) => {
      setTimeout(() => {
        setBootLines(prev => { const n = [...prev]; n[i] = true; return n; });
      }, i * 180);
    });
    setTimeout(() => setShowBar(true), BOOT_LINES.length * 180 + 100);
    let pct = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        pct += 2; setBarPct(pct);
        if (pct >= 100) {
          clearInterval(id);
          setTimeout(() => { localStorage.setItem(BOOT_KEY, "1"); setBootDone(true); }, 350);
        }
      }, 18);
    }, BOOT_LINES.length * 180 + 100);
    return () => clearTimeout(t);
  }, []);

  const filtered = filter === "all"
    ? LAB_PROJECTS
    : LAB_PROJECTS.filter(p => p.tags.includes(filter as Exclude<LabTag,"all">));

  const hwCount      = LAB_PROJECTS.filter(p => p.status === "hardware").length;
  const conceptCount = LAB_PROJECTS.filter(p => p.status === "concept").length;

  return (
    <>
      <div className="lab-root">

        {/* Boot */}
        <div className={`lab-boot${bootDone ? " done" : ""}`}>
          <div className="lab-boot-inner">
            <div className="lab-boot-title">MGH.LAB // SYSTEM INIT</div>
            <div className="lab-boot-lines">
              {BOOT_LINES.map((line, i) => (
                <span key={i} className={`lab-boot-line${bootLines[i] ? " show" : ""}`}
                  dangerouslySetInnerHTML={{ __html: line.html }} />
              ))}
            </div>
            <div className="lab-boot-bar-wrap" style={{ opacity: showBar ? 1 : 0 }}>
              <div className="lab-boot-bar-label">
                <span>{barPct >= 100 ? "done." : (isEs ? "cargando proyectos..." : "loading projects...")}</span>
                <span>{barPct}%</span>
              </div>
              <div className="lab-boot-bar-track">
                <div className="lab-boot-bar-fill" style={{ width: `${barPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="lab-nav">
          <div className="lab-nav-inner">
            <Link href="/" className="lab-brand"><em>MGH</em>.dev</Link>
            <div className="lab-nav-status">
              <span className="lab-live"><span className="lab-blink" />system.online</span>
              <span className="lab-sep">//</span>
              <span className="lab-uptime">{uptime}</span>
            </div>
            <Link href="/" className="lab-back">← /home</Link>
          </div>
        </nav>

        {/* Main */}
        <main className={`lab-main${bootDone ? " visible" : ""}`}>

          <section className="lab-hero">
            <div className="lab-eyebrow">
              lab.init() — {isEs ? "experimentos personales" : "personal experiments"}
            </div>
            <h1 className="lab-title" data-text="LAB">LAB</h1>
            <div className="lab-hero-meta">
              <p className="lab-hero-desc" style={{ whiteSpace: "pre-line" }}>
                {isEs
                  ? "// proyectos que construyo porque me apetece.\n// sin presión, sin deadline.\n// orden en el caos."
                  : "// projects I build because I feel like it.\n// no pressure, no deadline.\n// order in chaos."}
              </p>
              <div className="lab-stats">
                <div><span className="lab-stat-val">{LAB_PROJECTS.length}</span>{isEs ? "proyectos" : "projects"}</div>
                <div><span className="lab-stat-val">{hwCount}</span>hardware</div>
                <div><span className="lab-stat-val">{conceptCount}</span>{isEs ? "conceptos" : "concepts"}</div>
              </div>
            </div>
          </section>

          <div className="lab-filters">
            {(["all","frontend","security","hardware","ai","tool"] as LabTag[]).map(tag => (
              <button key={tag} type="button"
                className={`lab-filter-btn${filter === tag ? " active" : ""}`}
                onClick={() => setFilter(tag)}>
                [{tag}]
              </button>
            ))}
          </div>

          <div className="lab-section-label">projects.log</div>

          <div className="lab-bento">
            {filtered.map(p => (
              <LabCard key={p.index} p={p} isEs={isEs} />
            ))}
          </div>

        </main>
      </div>
    </>
  );
}
