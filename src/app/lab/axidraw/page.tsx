// src/app/lab/axidraw/page.tsx
"use client";

import { useLang } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./axidraw.css";

// Renombra tus fotos en /public/gallery/:
// axidraw_01.jpg → IMG_20180420_003019 (electrónica + CNC shield)
// axidraw_02.jpg → IMG_20180420_003052 (plotter completo en mesa)
// axidraw_03.jpg → IMG_20180420_003102 (servo y varillas)
// axidraw_04.jpg → IMG_20180420_003109 (cabezal porta-bolígrafo)
// axidraw_05.jpg → IMG_20180420_003113 (motor esquina)
// axidraw_06.jpg → IMG_20180630_124749 (vista final montado)
// axidraw_07.jpg → IMG_20180630_124756 (plotter dibujando)
// axidraw_grbl_panel.jpg   → Grbl-Panel-Example.JPG
// axidraw_grbl_offsets.jpg → GrblPanelOffsets.JPG
// axidraw_grbl_settings.jpg→ GrblPanelSettings.JPG

const PHOTOS = [
  "/gallery/axidraw_01.jpg",
  "/gallery/axidraw_02.jpg",
  "/gallery/axidraw_03.jpg",
  "/gallery/axidraw_04.jpg",
  "/gallery/axidraw_05.jpg",
  "/gallery/axidraw_06.jpg",
  "/gallery/axidraw_07.jpg",
];

export default function AxidrawPage() {
  const { lang } = useLang();
  const isEs = lang === "es";
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <>
      <div className="sd-root">

        {/* Lightbox */}
        {activePhoto && (
          <div className="sd-lightbox" onClick={() => setActivePhoto(null)}>
            <button className="sd-lightbox-close" onClick={() => setActivePhoto(null)}>
              ✕ {isEs ? "cerrar" : "close"}
            </button>
            <img src={activePhoto} alt="" onClick={e => e.stopPropagation()} />
          </div>
        )}

        {/* Nav */}
        <nav className="sd-nav">
          <div className="sd-nav-inner">
            <Link href="/" className="sd-brand"><em>MGH</em>.dev</Link>
            <Link href="/lab" className="sd-back">← /lab</Link>
          </div>
        </nav>

        <main className="sd-main">

          {/* Hero */}
          <section className="sd-hero">
            <div className="sd-eyebrow">[008] — hardware · plotter · cnc</div>
            <h1 className="sd-title">
              {isEs
                ? <>4xidraw Clone<br /><span>desde cero</span></>
                : <>4xidraw Clone<br /><span>from scratch</span></>}
            </h1>
          </section>

          {/* Cover photos */}
          <div className="sd-cover">
            <div className="sd-cover-main" onClick={() => setActivePhoto(PHOTOS[1])}>
              <Image src={PHOTOS[1]} alt="Plotter completo montado" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 55vw" priority />
            </div>
            <div className="sd-cover-side" onClick={() => setActivePhoto(PHOTOS[0])}>
              <Image src={PHOTOS[0]} alt="Arduino + CNC Shield" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 22vw" />
            </div>
            <div className="sd-cover-side" onClick={() => setActivePhoto(PHOTOS[2])}>
              <Image src={PHOTOS[2]} alt="Servo y varillas de cerca" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 22vw" />
            </div>
          </div>

          {/* Meta */}
          <div className="sd-meta">
            <div className="sd-meta-item">
              <span className="sd-meta-label">{isEs ? "Año" : "Year"}</span>
              <span className="sd-meta-val yellow">2018</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">{isEs ? "Piezas 3D" : "3D Parts"}</span>
              <span className="sd-meta-val">{isEs ? "Encargadas a empresa" : "Outsourced"}</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">Firmware</span>
              <span className="sd-meta-val green">GRBL 1.1</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">Controller</span>
              <span className="sd-meta-val">Arduino UNO + CNC Shield</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">Software</span>
              <span className="sd-meta-val">Inkscape 0.91 + GrblPanel</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">{isEs ? "Motores" : "Motors"}</span>
              <span className="sd-meta-val">2× NEMA 17 + SG90</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">{isEs ? "Dibujo más largo" : "Longest draw"}</span>
              <span className="sd-meta-val">~30 min</span>
            </div>
          </div>

          {/* Intro */}
          <section className="sd-section">
            <div className="sd-section-num">intro</div>
            <h2 className="sd-section-title">
              {isEs ? "¿Qué es y por qué construirlo?" : "What is it and why build it?"}
            </h2>
            <p className="sd-prose">
              {isEs
                ? "Un plotter CNC es una máquina de dos ejes que arrastra un bolígrafo sobre papel siguiendo coordenadas en GCode. El Axidraw comercial cuesta más de 500€. Este es un clon basado en el diseño open source 4xidraw de MISAN — piezas en PLA, Arduino UNO como cerebro, y dos motores paso a paso para los ejes X e Y. En 2018 todavía no tenía impresora 3D propia, así que encargué todas las piezas estructurales a una empresa de impresión local."
                : "A CNC plotter is a two-axis machine that drags a pen over paper following GCode coordinates. The commercial Axidraw costs over €500. This is a clone based on MISAN's open source 4xidraw design — PLA parts, Arduino UNO as the brain, and two stepper motors for the X and Y axes. In 2018 I didn't have my own 3D printer yet, so I outsourced all the structural parts to a local printing company."}
            </p>
            <div className="sd-tags">
              <span className="sd-tag">Arduino UNO</span>
              <span className="sd-tag">CNC Shield v3</span>
              <span className="sd-tag">A4988 Pololu</span>
              <span className="sd-tag">NEMA 17</span>
              <span className="sd-tag">SG90 servo</span>
              <span className="sd-tag">GRBL 1.1</span>
              <span className="sd-tag">Inkscape 0.91</span>
              <span className="sd-tag">GrblPanel</span>
              <span className="sd-tag">GT2 belt</span>
              <span className="sd-tag">LM8UU bearings</span>
              <span className="sd-tag">Thingiverse:2301776</span>
            </div>
          </section>

          {/* Materials */}
          <section className="sd-section">
            <div className="sd-section-num">step 00 — {isEs ? "materiales" : "materials"}</div>
            <h2 className="sd-section-title">{isEs ? "Lo que necesitas" : "What you need"}</h2>
            <div className="sd-materials">
              {[
                { name: "Arduino UNO",               note: isEs ? "Microcontrolador principal" : "Main microcontroller" },
                { name: "CNC Shield v3",              note: isEs ? "Se apila sobre el Arduino" : "Stacks on top of Arduino" },
                { name: "2× A4988 Pololu drivers",    note: isEs ? "Drivers de motor paso a paso" : "Stepper motor drivers" },
                { name: "2× NEMA 17",                 note: isEs ? "Motores paso a paso ejes X e Y" : "Stepper motors for X and Y axes" },
                { name: "SG90 servo",                 note: isEs ? "Sube y baja el bolígrafo (eje Z)" : "Raises and lowers the pen (Z axis)" },
                { name: isEs ? "Piezas 3D — 4xidraw" : "3D Parts — 4xidraw", note: isEs ? "13 piezas PLA, Thingiverse:2301776" : "13 PLA parts, Thingiverse:2301776" },
                { name: "8× LM8UU + varillas 8mm",    note: isEs ? "Rodamientos lineales y guías" : "Linear bearings and guide rails" },
                { name: "10× F623ZZ",                 note: isEs ? "Rodamientos para la correa GT2" : "Bearings for the GT2 belt" },
                { name: "2× Polea GT2 + correa 1.4m", note: isEs ? "Sistema de transmisión" : "Drive transmission system" },
                { name: isEs ? "Fuente 12V 2A" : "12V 2A power supply", note: isEs ? "Para los motores (no desde USB)" : "For the motors (not from USB)" },
                { name: "Inkscape 0.91",              note: isEs ? "Con el plugin J Tech Photonics" : "With the J Tech Photonics plugin" },
                { name: "GrblPanel.exe",              note: isEs ? "Software de envío de GCode" : "GCode sender software" },
              ].map((m) => (
                <div className="sd-material-item" key={m.name}>
                  <span className="sd-material-dot" />
                  <div>
                    <span className="sd-material-name">{m.name}</span>
                    <span className="sd-material-note">{m.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step 1: Estructura */}
          <section className="sd-section">
            <div className="sd-section-num">step 01 — {isEs ? "estructura" : "structure"}</div>
            <h2 className="sd-section-title">{isEs ? "Piezas 3D y montaje" : "3D parts and assembly"}</h2>
            <div className="sd-step">
              <div>
                <p className="sd-step-label">{isEs ? "Modelo base" : "Base model"}</p>
                <p className="sd-step-title">{isEs ? "4xidraw de MISAN" : "MISAN's 4xidraw"}</p>
                <p className="sd-prose">
                  {isEs
                    ? <>El diseño está en <a href="https://www.thingiverse.com/thing:2301776" target="_blank" rel="noopener">Thingiverse (thing:2301776)</a>. Son 13 piezas en PLA: bases del eje X, base central con rodamientos, tensor de correa, sujeta-servo y dos opciones de porta-bolígrafo (vertical y 30°/45°). Las encargué a una empresa porque en 2018 todavía no tenía impresora 3D.</>
                    : <>The design is on <a href="https://www.thingiverse.com/thing:2301776" target="_blank" rel="noopener">Thingiverse (thing:2301776)</a>. It's 13 PLA parts: X-axis bases, central carriage with bearings, belt tensioner, servo mount and two pen holder options (vertical and 30°/45°). I outsourced them because in 2018 I didn't yet have a 3D printer.</>}
                </p>
              </div>
              <div className="sd-step-photo" onClick={() => setActivePhoto(PHOTOS[5])}>
                <Image src={PHOTOS[5]} alt="Estructura montada" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            </div>
            <div className="sd-step reverse" style={{ marginTop: "8px" }}>
              <div className="sd-step-photo" onClick={() => setActivePhoto(PHOTOS[3])}>
                <Image src={PHOTOS[3]} alt="Cabezal porta-bolígrafo" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div>
                <p className="sd-step-label">{isEs ? "Mecanismo del eje Z" : "Z axis mechanism"}</p>
                <p className="sd-step-title">{isEs ? "Servo + cremallera" : "Servo + rack gear"}</p>
                <p className="sd-prose">
                  {isEs
                    ? "El servo SG90 mueve un engranaje que empuja o suelta la pieza con cremallera donde va el bolígrafo. En M3 s0 (posición «baja»), la zona sin dientes queda frente a la cremallera y el bolígrafo cae por su propio peso. En M3 s50, los dientes empujan la cremallera hacia arriba. No usar s100: la pieza choca con el sujeta-servo y descoloca el engranaje."
                    : "The SG90 servo moves a gear that pushes or releases the rack piece holding the pen. At M3 s0 ('down' position), the toothless zone faces the rack and the pen falls by its own weight. At M3 s50, the teeth push the rack upward. Avoid s100: the piece hits the servo mount and shifts the gear out of place."}
                </p>
              </div>
            </div>
          </section>

          {/* Step 2: Electrónica */}
          <section className="sd-section">
            <div className="sd-section-num">step 02 — {isEs ? "electrónica" : "electronics"}</div>
            <h2 className="sd-section-title">{isEs ? "Arduino + CNC Shield" : "Arduino + CNC Shield"}</h2>
            <div className="sd-step">
              <div>
                <p className="sd-step-label">{isEs ? "Conexiones clave" : "Key connections"}</p>
                <p className="sd-step-title">{isEs ? "Dos alimentaciones separadas" : "Two separate power supplies"}</p>
                <p className="sd-prose">
                  {isEs
                    ? "La CNC Shield v3 se apila directamente sobre el Arduino UNO. Los dos A4988 van en los slots X e Y. El servo SG90 conecta a Z+ (señal), 5V y GND. Los motores necesitan 12V 2A desde una fuente externa por la clema de la Shield — el Arduino se alimenta por USB desde el ordenador."
                    : "The CNC Shield v3 stacks directly onto the Arduino UNO. The two A4988 drivers go into the X and Y slots. The SG90 servo connects to Z+ (signal), 5V and GND. The motors need 12V 2A from an external supply through the Shield's terminal block — the Arduino draws power from USB."}
                </p>
              </div>
              <div className="sd-step-photo" onClick={() => setActivePhoto(PHOTOS[0])}>
                <Image src={PHOTOS[0]} alt="CNC Shield montado sobre Arduino con drivers" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            </div>
            <div className="sd-step-full" style={{ marginTop: "8px" }}>
              <div className="sd-code">
                <span className="sd-cmt">{isEs ? "// Conexiones del servo al CNC Shield" : "// Servo connections to CNC Shield"}</span>{"\n"}
                {"SEÑAL → Z+ (SpinEn)\n"}
                {"VCC   → 5V\n"}
                {"GND   → GND\n\n"}
                <span className="sd-cmt">{isEs ? "// IMPORTANTE: jumpers debajo de cada A4988 → TODOS puestos" : "// IMPORTANT: jumpers under each A4988 → ALL installed"}</span>{"\n"}
                <span className="sd-cmt">{isEs ? "// Sin jumpers = el motor no da todos los micropasos y pierde posición" : "// Without jumpers = motor skips microsteps and loses position"}</span>
              </div>
            </div>
          </section>

          {/* Step 3: Firmware */}
          <section className="sd-section">
            <div className="sd-section-num">step 03 — firmware</div>
            <h2 className="sd-section-title">GRBL 1.1</h2>
            <div className="sd-step-full">
              <p className="sd-prose">
                {isEs
                  ? "GRBL es un firmware open source para Arduino UNO que interpreta GCode y controla los motores paso a paso. Se carga desde el IDE de Arduino con la librería grbl-master. Una vez en la placa, la comunicación es a 115200 baudios por puerto serie."
                  : "GRBL is an open source firmware for Arduino UNO that interprets GCode and controls stepper motors. It's loaded from the Arduino IDE using the grbl-master library. Once flashed, communication happens at 115200 baud over serial."}
              </p>
              <div className="sd-code" style={{ marginTop: "1rem" }}>
                <span className="sd-cmt">{isEs ? "// Configuración GRBL — los parámetros que más costó calibrar" : "// GRBL config — parameters that took most trial and error"}</span>{"\n\n"}
                {"$0   = 10      "}<span className="sd-cmt">{"// step pulse µsec"}</span>{"\n"}
                {"$100 = 80.000  "}<span className="sd-cmt">{"// x step/mm  ← calibrar: mover 100mm, medir real, ajustar"}</span>{"\n"}
                {"$101 = 80.000  "}<span className="sd-cmt">{"// y step/mm  ← ídem"}</span>{"\n"}
                {"$110 = 5000    "}<span className="sd-cmt">{"// x max rate mm/min"}</span>{"\n"}
                {"$111 = 5000    "}<span className="sd-cmt">{"// y max rate mm/min"}</span>{"\n"}
                {"$120 = 5000    "}<span className="sd-cmt">{"// x accel mm/sec²"}</span>{"\n"}
                {"$121 = 5000    "}<span className="sd-cmt">{"// y accel mm/sec²"}</span>{"\n"}
                {"$30  = 1000    "}<span className="sd-cmt">{"// rpm max → define rango de movimiento del servo"}</span>{"\n\n"}
                <span className="sd-cmt">{isEs ? "// M3 s0 = bolígrafo abajo · M3 s50 = arriba · NO usar s100 (choca)" : "// M3 s0 = pen down · M3 s50 = pen up · DO NOT use s100 (jams)"}</span>
              </div>
              <p className="sd-prose" style={{ marginTop: "1rem" }}>
                {isEs
                  ? "La guía de referencia (LSM) era un punto de partida, pero los valores no funcionaban igual con mi montaje. $100 y $101 hay que calibrarlos empíricamente: ordenar moverse 100mm, medir cuánto se desplaza de verdad, y ajustar hasta que coincidan."
                  : "The reference guide (LSM) was a starting point, but the values didn't work the same with my assembly. $100 and $101 must be calibrated empirically: command 100mm movement, measure actual displacement, and adjust until they match."}
              </p>
            </div>
          </section>

          {/* Step 4: Software */}
          <section className="sd-section">
            <div className="sd-section-num">step 04 — software</div>
            <h2 className="sd-section-title">{isEs ? "Inkscape + GrblPanel" : "Inkscape + GrblPanel"}</h2>
            <div className="sd-step">
              <div>
                <p className="sd-step-label">{isEs ? "Generar el GCode" : "Generating GCode"}</p>
                <p className="sd-step-title">{isEs ? "Inkscape 0.91 + plugin J Tech" : "Inkscape 0.91 + J Tech plugin"}</p>
                <p className="sd-prose">
                  {isEs
                    ? "Se usa Inkscape 0.91 con el plugin J Tech Photonics (modificado por MISAN para plotters). El flujo: abrir imagen → Trayecto → Vectorizar mapa de bits → seleccionar todo → Extensiones → J Tech → exportar .gcode. El problema es que el plugin está pensado para láseres y el GCode que genera necesita correcciones manuales para funcionar con servo."
                    : "Inkscape 0.91 is used with the J Tech Photonics plugin (modified by MISAN for plotters). Flow: open image → Path → Trace Bitmap → select all → Extensions → J Tech → export .gcode. The issue is the plugin is designed for lasers and the resulting GCode needs manual corrections to work with a servo."}
                </p>
              </div>
              <div className="sd-step-photo" onClick={() => setActivePhoto(PHOTOS[4])}>
                <Image src={PHOTOS[4]} alt="Motor esquina con polea GT2" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            </div>
            <div className="sd-step-full" style={{ marginTop: "8px" }}>
              <p className="sd-step-label">{isEs ? "El paso imprescindible: editar el GCode a mano" : "The essential step: edit the GCode manually"}</p>
              <p className="sd-prose">
                {isEs
                  ? "El plugin añade un s0 de más tras las órdenes del servo y los retardos son 0 — el servo no tiene tiempo de moverse antes de que el plotter empiece a trazar. Hay que abrir el .gcode con Notepad++ y hacer tres reemplazos globales usando la opción Especial → Salto de línea manual:"
                  : "The plugin adds a stray s0 after servo commands and the delays are 0 — the servo has no time to move before the plotter starts tracing. Open the .gcode with Notepad++ and do three global replacements using Special → Manual line break:"}
              </p>
              <div className="sd-code" style={{ marginTop: "0.75rem" }}>
                <span className="sd-cmt">{isEs ? "// Buscar → Reemplazar en Notepad++" : "// Find → Replace in Notepad++"}</span>{"\n\n"}
                {"G4 P0         →  G4 P0.1\n"}
                {"M3 s0         →  M3 s0  + [salto_línea] + G4 P0.2\n"}
                {"M3 s100 s0    →  M3 s100 + [salto_línea] + G4 P0.1\n\n"}
                <span className="sd-cmt">{isEs ? "// G4 P0.x = retardo en segundos. Da tiempo al servo antes de trazar" : "// G4 P0.x = delay in seconds. Gives servo time to move before tracing"}</span>
              </div>
              <p className="sd-prose" style={{ marginTop: "1rem" }}>
                {isEs
                  ? "Una vez corregido el archivo, se abre GrblPanel.exe, se conecta al COM del Arduino a 115200 baudios, se carga el .gcode y se pulsa Start."
                  : "Once the file is corrected, open GrblPanel.exe, connect to the Arduino's COM port at 115200 baud, load the .gcode and press Start."}
              </p>
            </div>
          </section>

          {/* Step 5: GrblPanel screenshots */}
          <section className="sd-section">
            <div className="sd-section-num">step 05 — {isEs ? "configuración GrblPanel" : "GrblPanel config"}</div>
            <h2 className="sd-section-title">{isEs ? "Capturas de configuración" : "Configuration screenshots"}</h2>
            <p className="sd-prose">
              {isEs
                ? "GrblPanel es la interfaz gráfica para controlar el plotter: jogging manual en X/Y, configurar los parámetros $$ en tiempo real, ver posición y enviar el archivo GCode."
                : "GrblPanel is the GUI to control the plotter: manual X/Y jogging, live $$ parameter configuration, position display and GCode file sending."}
            </p>
            <div className="sd-gallery" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: "1.25rem" }}>
              {[
                { src: "/gallery/axidraw_grbl_panel.jpg",    cap: isEs ? "Interfaz principal — jogging y posición" : "Main interface — jogging and position" },
                { src: "/gallery/axidraw_grbl_offsets.jpg",  cap: isEs ? "Work offsets — G54 y posición máquina" : "Work offsets — G54 and machine position" },
                { src: "/gallery/axidraw_grbl_settings.jpg", cap: isEs ? "Parámetros $$ de GRBL" : "GRBL $$ parameters" },
              ].map(g => (
                <div
                  key={g.src}
                  className="sd-gallery-item"
                  onClick={() => setActivePhoto(g.src)}
                  style={{ aspectRatio: "16/10", position: "relative" }}
                >
                  <Image
                    src={g.src}
                    alt={g.cap}
                    fill
                    style={{ objectFit: "contain", background: "#08121e" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Resultado */}
          <section className="sd-section">
            <div className="sd-section-num">{isEs ? "resultado" : "result"}</div>
            <h2 className="sd-section-title">{isEs ? "Cómo funciona en la práctica" : "How it works in practice"}</h2>
            <div className="sd-step">
              <div className="sd-step-photo" onClick={() => setActivePhoto(PHOTOS[6])}>
                <Image src={PHOTOS[6]} alt="Plotter dibujando" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div>
                <p className="sd-prose">
                  {isEs
                    ? "El plotter dibuja cualquier imagen que se pueda vectorizar en Inkscape — contornos, tramas de puntos, rellenos con líneas paralelas. El dibujo más largo que hice fue Mike Wazowski en un folio A4, tardó casi media hora. El proceso tiene algo hipnótico: el bolígrafo se mueve solo, sube, baja, y la imagen aparece poco a poco sobre el papel."
                    : "The plotter draws any image that can be vectorised in Inkscape — outlines, stippling, parallel line fills. The longest drawing I made was Mike Wazowski on A4, it took almost half an hour. There's something hypnotic about it: the pen moves on its own, lifts, drops, and the image slowly appears on paper."}
                </p>
                <p className="sd-prose" style={{ marginTop: "0.75rem" }}>
                  {isEs
                    ? "Lo que más aprendí: en hardware, el 80% del trabajo es calibrar y depurar, no construir. Y que leer la fuente primaria — el wiki de GRBL en GitHub — vale infinito más que seguir una guía que puede no aplicar exactamente a tu setup."
                    : "Biggest lesson: in hardware, 80% of the work is calibrating and debugging, not building. And reading the primary source — the GRBL wiki on GitHub — is worth infinitely more than following a guide that might not apply exactly to your setup."}
                </p>
              </div>
            </div>

            {/* Full gallery */}
            <div className="sd-gallery" style={{ marginTop: "1.5rem" }}>
              {PHOTOS.map((src, i) => (
                <div key={i} className="sd-gallery-item" onClick={() => setActivePhoto(src)}>
                  <Image src={src} alt={`4xidraw ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 33vw, 25vw" />
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
