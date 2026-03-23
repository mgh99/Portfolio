// src/app/lab/stream-deck/page.tsx
"use client";

import { useLang } from "@/context/LanguageContext";
import Link from "next/link";
import { useState } from "react";
import "./stream-deck.css";

const PHOTOS = [
  "/gallery/stream_dock_01.jpeg",
  "/gallery/stream_dock_02.jpeg",
  "/gallery/stream_dock_03.jpeg",
  "/gallery/stream_dock_04.jpeg",
  "/gallery/stream_dock_05.jpeg",
  "/gallery/stream_dock_06.jpeg",
];

export default function StreamDeckPage() {
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
            <div className="sd-eyebrow">[007] — hardware</div>
            <h1 className="sd-title">
              {isEs ? <>Stream Deck<br /><span>desde cero</span></> : <>Stream Deck<br /><span>from scratch</span></>}
            </h1>
          </section>

          {/* Cover photos */}
          <div className="sd-cover">
            <div className="sd-cover-main" onClick={() => setActivePhoto(PHOTOS[0])}>
              <img src={PHOTOS[0]} alt="Stream deck" />
            </div>
            <div className="sd-cover-side" onClick={() => setActivePhoto(PHOTOS[1])}>
              <img src={PHOTOS[1]} alt="Stream deck detalle" />
            </div>
            <div className="sd-cover-side" onClick={() => setActivePhoto(PHOTOS[2])}>
              <img src={PHOTOS[2]} alt="Stream deck keycaps" />
            </div>
          </div>

          {/* Meta */}
          <div className="sd-meta">
            <div className="sd-meta-item">
              <span className="sd-meta-label">{isEs ? "Dificultad" : "Difficulty"}</span>
              <span className="sd-meta-val yellow">Medium</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">{isEs ? "Tiempo total" : "Total time"}</span>
              <span className="sd-meta-val">~12h</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">{isEs ? "Impresión 3D" : "3D print time"}</span>
              <span className="sd-meta-val">2h carcasa + 8h caps</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">Software</span>
              <span className="sd-meta-val">WPF · C# · .NET</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">Hardware</span>
              <span className="sd-meta-val green">ESP32-C3 Super Mini</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">{isEs ? "Botones" : "Buttons"}</span>
              <span className="sd-meta-val">12 × Cherry MX Ergo Clear</span>
            </div>
          </div>

          {/* Intro */}
          <section className="sd-section">
            <div className="sd-section-num">intro</div>
            <h2 className="sd-section-title">
              {isEs ? "¿Por qué construirlo?" : "Why build it?"}
            </h2>
            <p className="sd-prose">
              {isEs
                ? "Los stream decks comerciales cuestan entre 100€ y 250€. Este salió por una fracción de ese precio y además es 100% mío — diseño de las caps incluido. Lo uso a diario para lanzar apps, abrir URLs que visito constantemente y ejecutar atajos de teclado. Cuando enciendo el ordenador, el software arranca solo y se queda corriendo en segundo plano. Cada botón es configurable desde una interfaz gráfica sin tocar código."
                : "Commercial stream decks cost between €100 and €250. This one cost a fraction of that and is 100% mine — custom keycap designs included. I use it daily to launch apps, open frequently visited URLs and trigger keyboard shortcuts. When I boot my computer, the software starts automatically and runs in the background. Each button is configurable through a GUI without touching any code."}
            </p>
            <div className="sd-tags">
              <span className="sd-tag">ESP32-C3</span>
              <span className="sd-tag">WPF</span>
              <span className="sd-tag">C#</span>
              <span className="sd-tag">Cherry MX</span>
              <span className="sd-tag">3D Print</span>
              <span className="sd-tag">Bambu Lab X1</span>
              <span className="sd-tag">Bambu Studio</span>
            </div>
          </section>

          {/* Materials */}
          <section className="sd-section">
            <div className="sd-section-num">step 00 — {isEs ? "materiales" : "materials"}</div>
            <h2 className="sd-section-title">{isEs ? "Lo que necesitas" : "What you need"}</h2>
            <div className="sd-materials">
              {[
                { name: "ESP32-C3 Super Mini", note: isEs ? "Microcontrolador principal" : "Main microcontroller" },
                { name: "Cherry MX Ergo Clear ×12", note: isEs ? "Switches táctiles sin clic" : "Tactile no-click switches" },
                { name: isEs ? "Filamento PLA" : "PLA Filament", note: isEs ? "Para carcasa y keycaps" : "For case and keycaps" },
                { name: isEs ? "Estaño" : "Solder", note: isEs ? "Para soldar switches al ESP32" : "To solder switches to ESP32" },
                { name: isEs ? "Cables" : "Wires", note: isEs ? "Para conexiones internas" : "For internal connections" },
                { name: isEs ? "Termorretráctiles" : "Heat shrink tubing", note: isEs ? "Opcional, para mayor limpieza" : "Optional, for cleaner wiring" },
                { name: "Cable USB-C a USB-C", note: isEs ? "Para conectar al PC" : "To connect to PC" },
                { name: "Bambu Lab X1", note: isEs ? "O cualquier impresora FDM" : "Or any FDM printer" },
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

          {/* Step 1: 3D Print */}
          <section className="sd-section">
            <div className="sd-section-num">step 01 — {isEs ? "impresión 3D" : "3D printing"}</div>
            <h2 className="sd-section-title">{isEs ? "Carcasa y keycaps" : "Case and keycaps"}</h2>
            <div className="sd-step">
              <div>
                <p className="sd-step-label">{isEs ? "Carcasa" : "Case"}</p>
                <p className="sd-step-title">{isEs ? "Modelo de Thingiverse" : "Thingiverse model"}</p>
                <p className="sd-prose">
                  {isEs
                    ? <>El modelo de la carcasa es de <a href="https://www.thingiverse.com/thing:4186055" target="_blank" rel="noopener">__CDante en Thingiverse</a>. Lo imprimí en una Bambu Lab X1 en PLA, tardó 2 horas. No modifiqué el modelo.</>
                    : <>The case model is by <a href="https://www.thingiverse.com/thing:4186055" target="_blank" rel="noopener">__CDante on Thingiverse</a>. Printed on a Bambu Lab X1 in PLA, took 2 hours. No modifications to the model.</>}
                </p>
              </div>
              <div
                className="sd-step-photo"
                onClick={() => setActivePhoto(PHOTOS[3])}
              >
                <img src={PHOTOS[3]} alt="Carcasa impresa" />
              </div>
            </div>
            <div className="sd-step reverse">
              <div
                className="sd-step-photo"
                onClick={() => setActivePhoto(PHOTOS[4])}
              >
                <img src={PHOTOS[4]} alt="Keycaps con diseño personalizado" />
              </div>
              <div>
                <p className="sd-step-label">{isEs ? "Keycaps personalizadas" : "Custom keycaps"}</p>
                <p className="sd-step-title">{isEs ? "Diseños propios con AMS" : "Custom designs with AMS"}</p>
                <p className="sd-prose">
                  {isEs
                    ? "Las keycaps sí las diseñé yo. El proceso: descargo la imagen que quiero, la paso a SVG con Photoshop, y luego pego el SVG sobre la cap en el laminador de Bambu Studio. Las 12 caps tardaron 8 horas porque se requiere AMS para el cambio de filamento en los diseños de colores."
                    : "The keycaps I designed myself. The process: download the image I want, convert it to SVG with Photoshop, then apply the SVG onto the cap in the Bambu Studio slicer. All 12 caps took 8 hours because AMS is required for filament changes in the colour designs."}
                </p>
              </div>
            </div>
          </section>

          {/* Step 2: Electronics */}
          <section className="sd-section">
            <div className="sd-section-num">step 02 — {isEs ? "electrónica" : "electronics"}</div>
            <h2 className="sd-section-title">{isEs ? "Soldadura y conexiones" : "Soldering and wiring"}</h2>
            <div className="sd-step-full">
              <p className="sd-prose">
                {isEs
                  ? "Cada switch tiene dos pines. Un pin de cada switch se conecta a un GPIO diferente del ESP32-C3, y el otro pin de todos los switches va a GND compartido. El ESP32 usa los pines GPIO en modo INPUT_PULLUP, de forma que cuando se pulsa un switch el pin pasa de HIGH a LOW."
                  : "Each switch has two pins. One pin from each switch connects to a different GPIO on the ESP32-C3, and the other pin from all switches shares a common GND. The ESP32 uses GPIO pins in INPUT_PULLUP mode, so when a switch is pressed the pin goes from HIGH to LOW."}
              </p>
              <div className="sd-code">
                <span className="sd-cmt">{isEs ? "// Esquema básico de conexión" : "// Basic wiring scheme"}</span>{"\n"}
                {`Switch 1  →  GPIO4  +  GND\n`}
                {`Switch 2  →  GPIO5  +  GND\n`}
                {`Switch 3  →  GPIO6  +  GND\n`}
                {`...        →  GPIO N  +  GND\n`}
                {`Switch 12 →  GPIO N  +  GND\n\n`}
                <span className="sd-cmt">{isEs ? "// Todos los GND al pin GND del ESP32-C3" : "// All GND pins to the ESP32-C3 GND pin"}</span>
              </div>
              <p className="sd-prose" style={{ marginTop: "1rem" }}>
                {isEs
                  ? "Los termorretráctiles son opcionales pero recomendables para proteger las soldaduras y que el cableado interno quede más limpio. Una vez soldado todo, se monta dentro de la carcasa impresa."
                  : "Heat shrink tubing is optional but recommended to protect the solder joints and keep the internal wiring cleaner. Once everything is soldered, it mounts inside the printed case."}
              </p>
            </div>
          </section>

          {/* Step 3: ESP32 */}
          <section className="sd-section">
            <div className="sd-section-num">step 03 — {isEs ? "programación ESP32" : "ESP32 programming"}</div>
            <h2 className="sd-section-title">{isEs ? "Firmware del microcontrolador" : "Microcontroller firmware"}</h2>
            <div className="sd-step-full">
              <p className="sd-prose">
                {isEs
                  ? "El firmware del ESP32-C3 es simple: detecta qué botón se ha pulsado y manda el identificador por puerto serie a 115200 baudios. El software de Windows escucha ese puerto y ejecuta la acción configurada."
                  : "The ESP32-C3 firmware is simple: it detects which button was pressed and sends the identifier over serial at 115200 baud. The Windows software listens on that port and executes the configured action."}
              </p>
              <div className="sd-code">
                <span className="sd-cmt">{"// Arduino C++ — ESP32-C3 firmware (simplificado)"}</span>{"\n\n"}
                <span className="sd-kw">const int</span>{" buttons[] = {4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15};\n"}
                <span className="sd-kw">const int</span>{" N = 12;\n\n"}
                <span className="sd-fn">void</span>{" "}<span className="sd-fn">setup</span>{"() {\n"}
                {"  Serial."}<span className="sd-fn">begin</span>{"(115200);\n"}
                {"  "}<span className="sd-kw">for</span>{" (int i = 0; i < N; i++)\n"}
                {"    pinMode(buttons[i], INPUT_PULLUP);\n"}
                {"}\n\n"}
                <span className="sd-fn">void</span>{" "}<span className="sd-fn">loop</span>{"() {\n"}
                {"  "}<span className="sd-kw">for</span>{" (int i = 0; i < N; i++) {\n"}
                {"    "}<span className="sd-kw">if</span>{" (digitalRead(buttons[i]) == LOW) {\n"}
                {"      Serial."}<span className="sd-fn">println</span>{"("}<span className="sd-str">{"\"BTN\""}</span>{" + String(i + 1));\n"}
                {"      delay(200); "}<span className="sd-cmt">{"// debounce"}</span>{"\n"}
                {"    }\n  }\n}"}
              </div>
            </div>
          </section>

          {/* Step 4: Software */}
          <section className="sd-section">
            <div className="sd-section-num">step 04 — software</div>
            <h2 className="sd-section-title">{isEs ? "App de Windows (WPF + C#)" : "Windows app (WPF + C#)"}</h2>
            <div className="sd-step-full">
              <p className="sd-prose">
                {isEs
                  ? "El software está escrito en C# con WPF (.NET). Escucha el puerto serie (COM5 por defecto), recibe los identificadores de botón y ejecuta la acción configurada: abrir una app, abrir una URL, o enviar un atajo de teclado."
                  : "The software is written in C# with WPF (.NET). It listens on the serial port (COM5 by default), receives button identifiers and executes the configured action: open an app, open a URL, or send a keyboard shortcut."}
              </p>
              <div className="sd-code">
                <span className="sd-cmt">{isEs ? "// Tipos de acción disponibles" : "// Available action types"}</span>{"\n"}
                <span className="sd-str">"app"</span>{"  → "}<span className="sd-cmt">{isEs ? "// lanza un ejecutable" : "// launches an executable"}</span>{"\n"}
                <span className="sd-str">"url"</span>{"  → "}<span className="sd-cmt">{isEs ? "// abre en el navegador" : "// opens in browser"}</span>{"\n"}
                <span className="sd-str">"key"</span>{"  → "}<span className="sd-cmt">{isEs ? "// envía tecla (UP, DOWN...)" : "// sends key (UP, DOWN...)"}</span>{"\n\n"}
                <span className="sd-cmt">{isEs ? "// config.json — ejemplo de botón" : "// config.json — button example"}</span>{"\n"}
                {"{\n"}
                {"  "}<span className="sd-str">"Id"</span>{": "}<span className="sd-str">"BTN1"</span>{",\n"}
                {"  "}<span className="sd-str">"Label"</span>{": "}<span className="sd-str">"VS Code"</span>{",\n"}
                {"  "}<span className="sd-str">"ActionType"</span>{": "}<span className="sd-str">"app"</span>{",\n"}
                {"  "}<span className="sd-str">"Value"</span>{": "}<span className="sd-str">"C:\\...\\Code.exe"</span>{"\n}"}
              </div>
              <p className="sd-prose" style={{ marginTop: "1rem" }}>
                {isEs
                  ? "El software se añade al registro de Windows para arrancar automáticamente al inicio. Cuando se cierra la ventana, la app se minimiza a la bandeja del sistema — sigue corriendo en segundo plano. La configuración se guarda en JSON en AppData."
                  : "The software adds itself to the Windows registry to start automatically on boot. When the window is closed, the app minimizes to the system tray — it keeps running in the background. Configuration is saved as JSON in AppData."}
              </p>
            </div>
          </section>

          {/* Step 5: Assembly */}
          <section className="sd-section">
            <div className="sd-section-num">step 05 — {isEs ? "montaje final" : "final assembly"}</div>
            <h2 className="sd-section-title">{isEs ? "Ensamblaje" : "Assembly"}</h2>
            <div className="sd-step">
              <div
                className="sd-step-photo"
                onClick={() => setActivePhoto(PHOTOS[5])}
              >
                <img src={PHOTOS[5]} alt="Montaje final" />
              </div>
              <div>
                <p className="sd-prose">
                  {isEs
                    ? "Una vez impresa la carcasa, soldado el cableado y flasheado el ESP32, se monta todo dentro. Los switches encajan en los agujeros de la carcasa, el ESP32 va en el interior, y las keycaps se colocan encima de los switches. El USB-C sale por la parte trasera."
                    : "Once the case is printed, wiring is soldered and the ESP32 is flashed, everything mounts inside. The switches fit into the case holes, the ESP32 sits inside, and the keycaps press onto the switches. The USB-C exits from the back."}
                </p>
                <p className="sd-prose" style={{ marginTop: "0.75rem" }}>
                  {isEs
                    ? "Al conectarlo al PC, Windows lo reconoce como dispositivo serie. Hay que asegurarse de que el puerto en el código coincida con el asignado (COM5 en mi caso). Una vez configurado, funciona solo."
                    : "When connected to the PC, Windows recognises it as a serial device. Make sure the port in the code matches the one assigned (COM5 in my case). Once configured, it just works."}
                </p>
              </div>
            </div>
          </section>

          {/* Result */}
          <section className="sd-section">
            <div className="sd-section-num">{isEs ? "resultado" : "result"}</div>
            <h2 className="sd-section-title">{isEs ? "Cómo lo uso" : "How I use it"}</h2>
            <p className="sd-prose">
              {isEs
                ? "12 botones configurables para lo que necesites. En mi caso: VS Code, navegador, Spotify, URLs que abro constantemente, y algún atajo de teclado. Cada vez que arranco el ordenador está listo sin hacer nada. Si quiero cambiar qué hace un botón, abro la app desde la bandeja y lo edito en segundos."
                : "12 configurable buttons for whatever you need. In my case: VS Code, browser, Spotify, URLs I open constantly, and some keyboard shortcuts. Every time I boot my computer it's ready without doing anything. If I want to change what a button does, I open the app from the tray and edit it in seconds."}
            </p>

            {/* Full gallery */}
            <div className="sd-gallery" style={{ marginTop: "1.5rem" }}>
              {PHOTOS.map((src, i) => (
                <div
                  key={i}
                  className="sd-gallery-item"
                  onClick={() => setActivePhoto(src)}
                >
                  <img src={src} alt={`Stream deck ${i + 1}`} />
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
