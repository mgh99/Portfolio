// src/app/lab/page.tsx
"use client";

import { useLang } from "@/context/LanguageContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./lab.css";

// ── TYPES ──────────────────────────────────────────────
type LabTag = "all" | "frontend" | "security" | "hardware" | "ai" | "tool";
type LabStatus = "live" | "wip" | "hardware";

type LabProject = {
  index: string;
  nameEs: string;
  nameEn: string;
  descEs: string;
  descEn: string;
  tags: Exclude<LabTag, "all">[];
  github?: string;
  demo?: string;
  gallery?: string[];
  status: LabStatus;
  accentColor?: string;
};

// ── DATA ───────────────────────────────────────────────
const LAB_PROJECTS: LabProject[] = [
  {
    index: "001",
    nameEs: "Pomodoro Timer",
    nameEn: "Pomodoro Timer",
    descEs: "Timer minimalista. Construido para usarlo yo misma.",
    descEn: "Minimal timer. Built to use it myself.",
    tags: ["frontend", "tool"],
    github: "https://github.com/mgh99/pomodoro",
    demo: "https://pomodoro-sand-one.vercel.app/",
    status: "live",
  },
  {
    index: "002",
    nameEs: "To-Do List",
    nameEn: "To-Do List",
    descEs: "Simple. Sin frameworks innecesarios.",
    descEn: "Simple. No unnecessary frameworks.",
    tags: ["frontend", "tool"],
    github: "https://github.com/mgh99/To-do-list",
    demo: "https://to-do-list-ebon-mu-32.vercel.app/",
    status: "live",
  },
  {
    index: "003",
    nameEs: "San Valentín",
    nameEn: "Valentine's Day",
    descEs: "Experimento creativo. Porque se puede.",
    descEn: "Creative experiment. Because why not.",
    tags: ["frontend"],
    github: "https://github.com/mgh99/San-Valentin",
    demo: "https://asset-manager--mgh99.replit.app/",
    status: "live",
  },
  {
    index: "004",
    nameEs: "Rendimiento Web",
    nameEn: "Web Performance",
    descEs: "Análisis de métricas y auditorías web.",
    descEn: "Web metrics analysis and audits.",
    tags: ["frontend", "tool"],
    github: "https://github.com/mgh99/Rendimiento_Web",
    demo: "",
    status: "live",
  },
  {
    index: "005",
    nameEs: "Cyberpunk Body Sim",
    nameEn: "Cyberpunk Body Sim",
    descEs: "Simulador del cuerpo humano. Estética futurista. Métricas interactivas.",
    descEn: "Human body simulator. Futuristic aesthetic. Interactive metrics.",
    tags: ["frontend", "ai"],
    github: "https://github.com/mgh99/Cyberpunk_body",
    demo: "https://cyberpunk-body.vercel.app/",
    status: "wip",
    accentColor: "var(--lab-purple)",
  },
  {
    index: "006",
    nameEs: "Skill Auditor",
    nameEn: "Skill Auditor",
    descEs: "Auditor de seguridad para skills de Claude. Detecta patrones maliciosos, MITM y exfiltración de datos.",
    descEn: "Security auditor for Claude skills. Detects malicious patterns, MITM and data exfiltration.",
    tags: ["security", "ai", "tool"],
    demo: "",
    status: "wip",
    accentColor: "var(--lab-red)",
  },
  {
    index: "007",
    nameEs: "Stream Deck — Desde Cero",
    nameEn: "Stream Deck — From Scratch",
    descEs: "Carcasa impresa en 3D. ESP32 Nano. Switches y keycaps custom. Software configurable en arranque. Botones 100% reprogramables.",
    descEn: "3D-printed case. ESP32 Nano. Custom switches and keycaps. Configurable software on boot. 100% reprogrammable buttons.",
    tags: ["hardware", "tool"],
    gallery: [
      "/gallery/stream_dock_01.jpeg",
      "/gallery/stream_dock_02.jpeg",
      "/gallery/stream_dock_03.jpeg",
      "/gallery/stream_dock_04.jpeg",
      "/gallery/stream_dock_05.jpeg",
      "/gallery/stream_dock_06.jpeg",
    ],
    status: "hardware",
    accentColor: "var(--lab-green)",
  },
];

// ── BOOT LINES ─────────────────────────────────────────
const BOOT_LINES = [
  { html: '> initializing <span style="color:var(--lab-blue)">lab.env</span>...' },
  { html: '> loading <span style="color:var(--lab-green)">kernel</span> modules... <span style="color:var(--lab-green)">[OK]</span>' },
  { html: '> mounting <span style="color:var(--lab-blue)">project.db</span>... <span style="color:var(--lab-green)">[OK]</span>' },
  { html: '> scanning <span style="color:var(--lab-pink)">7</span> entries...' },
  { html: '> threat_check: <span style="color:var(--lab-green)">skill_auditor</span> active' },
  { html: '> hardware detected: <span style="color:var(--lab-green)">stream_deck_v1</span>' },
  { html: '> <span style="color:var(--lab-yellow)">3</span> projects pending deployment' },
  { html: '> all systems nominal. <span style="color:var(--lab-green)">ready.</span>' },
];

const BOOT_KEY = "mgh-lab-booted";

// ── UPTIME ─────────────────────────────────────────────
const START_OFFSET_MS =
  14 * 24 * 60 * 60 * 1000 +
   7 * 60 * 60 * 1000 +
  23 * 60 * 1000;

function formatUptime(startTime: number) {
  const elapsed = Date.now() - startTime;
  const s = Math.floor(elapsed / 1000) % 60;
  const m = Math.floor(elapsed / 60000) % 60;
  const h = Math.floor(elapsed / 3600000) % 24;
  const d = Math.floor(elapsed / 86400000);
  return `${String(d).padStart(2, "0")}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

// ── COMPONENT ──────────────────────────────────────────
export default function LabPage() {
  const { lang } = useLang();
  const isEs = lang === "es";

  const [filter, setFilter] = useState<LabTag>("all");
  const [bootDone, setBootDone] = useState(false);
  const [bootLines, setBootLines] = useState<boolean[]>(Array(BOOT_LINES.length).fill(false));
  const [barPct, setBarPct] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [uptime, setUptime] = useState("--d --h --m --s");
  const startTimeRef = useRef(Date.now() - START_OFFSET_MS);

  // ── Uptime ticker
  useEffect(() => {
    setUptime(formatUptime(startTimeRef.current));
    const id = setInterval(() => {
      setUptime(formatUptime(startTimeRef.current));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Boot sequence
  useEffect(() => {
    const alreadyBooted = localStorage.getItem(BOOT_KEY);
    if (alreadyBooted) {
      setBootDone(true);
      return;
    }

    // Show lines one by one
    BOOT_LINES.forEach((_, i) => {
      setTimeout(() => {
        setBootLines((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 180);
    });

    // Show bar after last line
    setTimeout(() => setShowBar(true), BOOT_LINES.length * 180 + 100);

    // Animate bar
    let pct = 0;
    const barInterval = setTimeout(() => {
      const id = setInterval(() => {
        pct += 2;
        setBarPct(pct);
        if (pct >= 100) {
          clearInterval(id);
          setTimeout(() => {
            localStorage.setItem(BOOT_KEY, "1");
            setBootDone(true);
          }, 350);
        }
      }, 18);
    }, BOOT_LINES.length * 180 + 100);

    return () => clearTimeout(barInterval);
  }, []);

  const allTags: LabTag[] = ["all", "frontend", "security", "hardware", "ai", "tool"];

  const filtered =
    filter === "all"
      ? LAB_PROJECTS
      : LAB_PROJECTS.filter((p) => p.tags.includes(filter as Exclude<LabTag, "all">));

  return (
    <>
      <div className="lab-root">

        {/* ── BOOT SCREEN ── */}
        <div className={`lab-boot${bootDone ? " done" : ""}`}>
          <div className="lab-boot-inner">
            <div className="lab-boot-title">MGH.LAB // SYSTEM INIT</div>
            <div className="lab-boot-lines">
              {BOOT_LINES.map((line, i) => (
                <span
                  key={i}
                  className={`lab-boot-line${bootLines[i] ? " show" : ""}`}
                  dangerouslySetInnerHTML={{ __html: line.html }}
                />
              ))}
            </div>
            <div
              className="lab-boot-bar-wrap"
              style={{ opacity: showBar ? 1 : 0 }}
            >
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

        {/* ── LAB NAVBAR ── */}
        <nav className="lab-nav">
          <div className="lab-nav-inner">
            <Link href="/" className="lab-brand">
              <em>MGH</em>.dev
            </Link>
            <div className="lab-nav-status">
              <span className="lab-live">
                <span className="lab-blink" />
                system.online
              </span>
              <span className="lab-sep">//</span>
              <span className="lab-uptime">{uptime}</span>
            </div>
            <Link href="/" className="lab-back">
              ← /home
            </Link>
          </div>
        </nav>

        {/* ── MAIN ── */}
        <main className={`lab-main${bootDone ? " visible" : ""}`}>

          {/* Hero */}
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
                <div><span className="lab-stat-val">7</span>{isEs ? "proyectos" : "projects"}</div>
                <div><span className="lab-stat-val">1</span>{isEs ? "en progreso" : "in progress"}</div>
                <div><span className="lab-stat-val">1</span>hardware</div>
              </div>
            </div>
          </section>

          {/* Filters */}
          <div className="lab-filters">
            {(["all", "frontend", "security", "hardware", "ai", "tool"] as LabTag[]).map((tag) => (
              <button
                key={tag}
                type="button"
                className={`lab-filter-btn${filter === tag ? " active" : ""}`}
                onClick={() => setFilter(tag)}
              >
                [{tag}]
              </button>
            ))}
          </div>

          <div className="lab-section-label">projects.log</div>

          {/* Bento grid */}
          <div className={filter === "all" ? "lab-bento" : "lab-grid-filtered"}>

            {/* 001 POMODORO */}
            {(filter === "all" || filter === "frontend" || filter === "tool") && (
              <div className="lab-card lc-pomodoro" data-cat="frontend">
                {/* thumb */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "12px" }}>
                  <img
                    src="/thumbs/lab-pomodoro.svg"
                    alt="Pomodoro Timer"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.20 }}
                  />
                </div>
                <div className="lc-clock-bg"><div className="lc-clock-ring" /></div>
                <div className="lc-inner">
                  <div className="lc-header">
                    <span className="lc-idx">[001]</span>
                    <span className="lc-badge lc-badge-live"><span className="lc-badge-dot" />LIVE</span>
                  </div>
                  <div className="lc-footer">
                    <div className="lc-name">Pomodoro Timer</div>
                    <p className="lc-desc">{LAB_PROJECTS[0][isEs ? "descEs" : "descEn"]}</p>
                    <div className="lc-tags">
                      <span className="lc-tag">frontend</span>
                      <span className="lc-tag">tool</span>
                    </div>
                    <div className="lc-links">
                      <a href={LAB_PROJECTS[0].github} className="lc-link" target="_blank" rel="noopener">
                        <i className="bi bi-github" /> repo
                      </a>
                      {LAB_PROJECTS[0].demo && (
                        <a href={LAB_PROJECTS[0].demo} className="lc-link" target="_blank" rel="noopener">
                          <i className="bi bi-box-arrow-up-right" /> demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 002 TO-DO */}
            {(filter === "all" || filter === "frontend" || filter === "tool") && (
              <div className="lab-card lc-todo" data-cat="frontend">
                {/* thumb */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "12px" }}>
                  <img
                    src="/thumbs/lab-to-do-list.png"
                    alt="To-Do List"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.20 }}
                  />
                </div>
                <div className="lc-inner">
                  <div className="lc-header">
                    <span className="lc-idx">[002]</span>
                    <span className="lc-badge lc-badge-live"><span className="lc-badge-dot" />LIVE</span>
                  </div>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.04, fontSize: "5rem", pointerEvents: "none" }}>
                    <i className="bi bi-check2-all" />
                  </div>
                  <div className="lc-footer">
                    <div className="lc-name lc-name-sm">To-Do List</div>
                    <p className="lc-desc">{LAB_PROJECTS[1][isEs ? "descEs" : "descEn"]}</p>
                    <div className="lc-links">
                      <a href={LAB_PROJECTS[1].github} className="lc-link" target="_blank" rel="noopener">
                        <i className="bi bi-github" /> repo
                      </a>
                      {LAB_PROJECTS[1].demo && (
                        <a href={LAB_PROJECTS[1].demo} className="lc-link" target="_blank" rel="noopener">
                          <i className="bi bi-box-arrow-up-right" /> demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 003 SAN VALENTÍN */}
            {(filter === "all" || filter === "frontend") && (
              <div className="lab-card lc-san lc-san-bg" data-cat="frontend">
                {/* thumb */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "12px" }}>
                  <img
                    src="/thumbs/lab-san-valentin.png"
                    alt="San Valentin"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.20 }}
                  />
                </div>
                <div className="lc-inner" style={{ padding: "1rem" }}>
                  <div className="lc-header">
                    <span className="lc-idx">[003]</span>
                    <span className="lc-badge lc-badge-live"><span className="lc-badge-dot" />LIVE</span>
                  </div>
                  <div className="lc-footer">
                    <div className="lc-name lc-name-sm">{isEs ? "San Valentín" : "Valentine's Day"}</div>
                    <div className="lc-links">
                      <a href={LAB_PROJECTS[2].github} className="lc-link" target="_blank" rel="noopener">
                        <i className="bi bi-github" /> repo
                      </a>
                      {LAB_PROJECTS[2].demo && (
                        <a href={LAB_PROJECTS[2].demo} className="lc-link" target="_blank" rel="noopener">
                          <i className="bi bi-box-arrow-up-right" /> demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 004 RENDIMIENTO WEB */}
            {(filter === "all" || filter === "frontend" || filter === "tool") && (
              <div className="lab-card lc-render" data-cat="frontend">
                {/* thumb */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "12px" }}>
                  <img
                    src="/thumbs/lab-web-performance.png"
                    alt="Web Performance"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.20 }}
                  />
                </div>
                <div className="lc-inner">
                  <div className="lc-header">
                    <span className="lc-idx">[004]</span>
                    <span className="lc-badge lc-badge-live"><span className="lc-badge-dot" />LIVE</span>
                  </div>
                  <div className="lc-footer">
                    <div className="lc-name lc-name-sm">{isEs ? "Rendimiento Web" : "Web Performance"}</div>
                    <p className="lc-desc">{LAB_PROJECTS[3][isEs ? "descEs" : "descEn"]}</p>
                    <div className="lc-links">
                      <a href="https://github.com/mgh99/Rendimiento_Web" className="lc-link" target="_blank" rel="noopener">
                        <i className="bi bi-github" /> repo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 005 CYBERPUNK BODY SIM */}
            {(filter === "all" || filter === "frontend" || filter === "ai") && (
              <div className="lab-card lc-cyber lc-cyber-bg" data-cat="ai">
                {/* thumb */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "12px" }}>
                  <img
                    src="/thumbs/lab-cyberpunk-body.png"
                    alt="Cyberpunk Body Simulator"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.20 }}
                  />
                </div>
                <div className="lc-cyber-glow" />
                <div className="lc-inner">
                  <div className="lc-header">
                    <span className="lc-idx" style={{ color: "var(--lab-purple)" }}>[005]</span>
                    <span className="lc-badge lc-badge-wip"><span className="lc-badge-dot" />WIP</span>
                  </div>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0.5rem 0", opacity: 0.1, fontSize: "3.5rem", pointerEvents: "none", color: "var(--lab-purple)" }}>
                    <i className="bi bi-person-bounding-box" />
                  </div>
                  <div className="lc-footer">
                    <div className="lc-name">Cyberpunk Body Sim</div>
                    <p className="lc-desc">{LAB_PROJECTS[4][isEs ? "descEs" : "descEn"]}</p>
                    <div className="lc-tags">
                      <span className="lc-tag">frontend</span>
                      <span className="lc-tag">ai</span>
                    </div>
                    <div className="lc-links">
                      <a href={LAB_PROJECTS[4].github} className="lc-link" target="_blank" rel="noopener">
                        <i className="bi bi-github" /> repo
                      </a>
                      {LAB_PROJECTS[4].demo && (
                        <a href={LAB_PROJECTS[4].demo} className="lc-link" target="_blank" rel="noopener">
                          <i className="bi bi-box-arrow-up-right" /> demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 006 SKILL AUDITOR */}
            {(filter === "all" || filter === "security" || filter === "ai" || filter === "tool") && (
              <div className="lab-card lc-audit" data-cat="security">
                {/* thumb */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "12px" }}>
                  <img
                    src="/thumbs/lab-skill-security-audit.png"
                    alt="Skill Security Auditor"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.20 }}
                  />
                </div>
                <div className="lc-scan-line" />
                <div className="lc-terminal-bg">{`> scanning skills...\n> pattern_match: [MITM] [EXFIL] [INJECT]\n> threat_level: UNKNOWN\n> analyzing: skill_001.md\n> analyzing: skill_002.md\n> status: monitoring...\n> no_threats_detected: false\n> flagged: 0x3f2a\n> report: generating...`}</div>
                <div className="lc-inner">
                  <div className="lc-header">
                    <span className="lc-idx" style={{ color: "var(--lab-red)" }}>[006]</span>
                    <span className="lc-badge lc-badge-wip"><span className="lc-badge-dot" />WIP</span>
                  </div>
                  <div className="lc-footer">
                    <div className="lc-name lc-name-lg">Skill Auditor</div>
                    <p className="lc-desc" style={{ maxWidth: 320 }}>{LAB_PROJECTS[5][isEs ? "descEs" : "descEn"]}</p>
                    <div className="lc-tags">
                      <span className="lc-tag">security</span>
                      <span className="lc-tag">ai</span>
                      <span className="lc-tag">tool</span>
                    </div>
                    <div className="lc-links">
                      <a href={LAB_PROJECTS[5].github} className="lc-link" target="_blank" rel="noopener">
                        <i className="bi bi-github" /> repo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 007 STREAM DECK */}
            {(filter === "all" || filter === "hardware" || filter === "tool") && (
              <Link href="/lab/stream-deck" className="lab-card lc-deck" data-cat="hardware" style={{ textDecoration: "none" }}>
                {/* thumb con opacidad como el resto */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "12px" }}>
                  <img
                    src="/thumbs/lab-stream-deck.png"
                    alt="Stream Deck desde cero"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }}
                  />
                </div>
                <div className="lc-inner">
                  <div className="lc-header">
                    <span className="lc-idx" style={{ color: "var(--lab-green)" }}>[007] — HARDWARE</span>
                    <span className="lc-badge lc-badge-hardware"><span className="lc-badge-dot" />HARDWARE</span>
                  </div>
                  <div className="lc-footer">
                    <div className="lc-name lc-name-lg" style={{ color: "#fff" }}>
                      {isEs ? "Stream Deck\ndesde cero" : "Stream Deck\nfrom scratch"}
                    </div>
                    <p className="lc-desc" style={{ marginBottom: "0.75rem" }}>
                      {LAB_PROJECTS[6][isEs ? "descEs" : "descEn"]}
                    </p>
                    <div className="lc-tags" style={{ marginBottom: "0.75rem" }}>
                      <span className="lc-tag" style={{ color: "var(--lab-green)", borderColor: "rgba(52,211,153,0.3)" }}>hardware</span>
                      <span className="lc-tag">3D print</span>
                      <span className="lc-tag">ESP32</span>
                      <span className="lc-tag">C#</span>
                      <span className="lc-tag">WPF</span>
                    </div>
                    <div className="lc-links">
                      <span className="lc-link" style={{ color: "var(--lab-green)" }}>
                        <i className="bi bi-arrow-right" /> {isEs ? "ver el proceso →" : "see the build →"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
