// src/app/lab/longboard/page.tsx
"use client";

import { useLang } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./longboard.css";

const PHOTOS = [
  "/gallery/longboard_01.jpg", // componentes sobre la cama
  "/gallery/longboard_02.jpg", // rueda azul + hub
  "/gallery/longboard_03.jpg", // motor mount Torque Boards
  "/gallery/longboard_04.jpg", // truck con motor montado
  "/gallery/longboard_05.jpg", // batería LiPo
  "/gallery/longboard_06.jpg", // BMS + switch + XT60
  "/gallery/longboard_07.jpg", // pantalla LCD voltaje
  "/gallery/longboard_08.jpg", // caja cerrada bajo tablero
  "/gallery/longboard_09.jpg", // esquema a mano
  "/gallery/longboard_10.jpg", // resultado final (si tienes)
];

export default function LongboardPage() {
  const { lang } = useLang();
  const isEs = lang === "es";
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const open = (src: string) => setActivePhoto(src);
  const close = () => setActivePhoto(null);

  return (
    <div className="lb-root">

      {/* Lightbox */}
      {activePhoto && (
        <div className="lb-lightbox" onClick={close}>
          <button className="lb-lightbox-close" onClick={close}>
            ✕ {isEs ? "cerrar" : "close"}
          </button>
          <img src={activePhoto} alt="" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Nav */}
      <nav className="lb-nav">
        <div className="lb-nav-inner">
          <Link href="/" className="lb-brand"><em>MGH</em>.dev</Link>
          <Link href="/lab" className="lb-back">← /lab</Link>
        </div>
      </nav>

      <main className="lb-main">

        {/* Hero */}
        <section className="lb-hero">
          <div className="lb-eyebrow">[002] — hardware</div>
          <h1 className="lb-title">
            {isEs
              ? <>{`Longboard`}<br /><span>{`eléctrico`}</span></>
              : <>{`Electric`}<br /><span>{`longboard`}</span></>}
          </h1>
        </section>

        {/* Cover */}
        <div className="lb-cover">
          <div className="lb-cover-main" onClick={() => open(PHOTOS[3])}>
            <Image src={PHOTOS[3]} alt="Motor montado en truck" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 55vw" priority />
          </div>
          <div className="lb-cover-side" onClick={() => open(PHOTOS[0])}>
            <Image src={PHOTOS[0]} alt="Componentes" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 22vw" />
          </div>
          <div className="lb-cover-side" onClick={() => open(PHOTOS[7])}>
            <Image src={PHOTOS[7]} alt="Caja electrónica montada" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 22vw" />
          </div>
        </div>

        {/* Meta */}
        <div className="lb-meta">
          <div className="lb-meta-item">
            <span className="lb-meta-label">{isEs ? "Dificultad" : "Difficulty"}</span>
            <span className="lb-meta-val yellow">High</span>
          </div>
          <div className="lb-meta-item">
            <span className="lb-meta-label">{isEs ? "Edad al construirlo" : "Age when built"}</span>
            <span className="lb-meta-val">16 {isEs ? "años" : "years old"}</span>
          </div>
          <div className="lb-meta-item">
            <span className="lb-meta-label">Motor</span>
            <span className="lb-meta-val">Turnigy Aerodrive SK3</span>
          </div>
          <div className="lb-meta-item">
            <span className="lb-meta-label">ESC</span>
            <span className="lb-meta-val green">VESC</span>
          </div>
          <div className="lb-meta-item">
            <span className="lb-meta-label">{isEs ? "Batería" : "Battery"}</span>
            <span className="lb-meta-val blue">LiPo 10S · 42V</span>
          </div>
          <div className="lb-meta-item">
            <span className="lb-meta-label">{isEs ? "Mando" : "Remote"}</span>
            <span className="lb-meta-val">2.4 GHz trigger</span>
          </div>
          <div className="lb-meta-item">
            <span className="lb-meta-label">{isEs ? "Ruedas" : "Wheels"}</span>
            <span className="lb-meta-val">83mm transparentes azules</span>
          </div>
          <div className="lb-meta-item">
            <span className="lb-meta-label">{isEs ? "Estado" : "Status"}</span>
            <span className="lb-meta-val green">{isEs ? "Funciona ✓" : "Working ✓"}</span>
          </div>
        </div>

        {/* Intro */}
        <section className="lb-section">
          <div className="lb-section-num">intro</div>
          <h2 className="lb-section-title">
            {isEs ? "¿Por qué construirlo?" : "Why build it?"}
          </h2>
          <p className="lb-prose">
            {isEs
              ? "Fue uno de los primeros proyectos que no se quedó en papel. Ya existían algunos monopatines eléctricos, pero eran más prototipos en webs como Kickstarter que productos comercializados. Cada pieza llegó de una parte distinta del mundo — la mayoría entre China y Estados Unidos. Las primeras pruebas no salieron del todo bien; con alguna salí disparada. Recalculé, ajusté, y ya funcionó."
              : "One of the first projects that didn't stay on paper. Electric skateboards existed, but they were more like prototypes on sites like Kickstarter than actual products you could buy. Each part shipped from a different corner of the world — most of them from China or the US. The first test runs didn't go perfectly; I went flying a couple of times. Recalculated, adjusted, and got it working."}
          </p>
          <div className="lb-tags">
            <span className="lb-tag">brushless motor</span>
            <span className="lb-tag">VESC</span>
            <span className="lb-tag">LiPo 10S</span>
            <span className="lb-tag">XT60</span>
            <span className="lb-tag">bullet 5mm</span>
            <span className="lb-tag">2.4 GHz</span>
            <span className="lb-tag">Torque Boards</span>
          </div>
        </section>

        {/* Step 0 — Materiales */}
        <section className="lb-section">
          <div className="lb-section-num">step 00 — {isEs ? "componentes" : "components"}</div>
          <h2 className="lb-section-title">{isEs ? "Todo lo que necesitas" : "Everything you need"}</h2>
          <div className="lb-materials">
            {[
              {
                name: "Turnigy Aerodrive SK3 — 6364",
                note: isEs ? "Motor brushless outrunner" : "Brushless outrunner motor",
              },
              {
                name: "VESC (Electronic Speed Controller)",
                note: isEs ? "Control de velocidad programable" : "Programmable speed control",
              },
              {
                name: isEs ? "Batería LiPo 10S" : "LiPo battery 10S",
                note: isEs ? "42V nominal, conector XT60" : "42V nominal, XT60 connector",
              },
              {
                name: "Torque Boards Motor Mount",
                note: isEs ? "Soporte de aluminio mecanizado" : "Machined aluminium bracket",
              },
              {
                name: isEs ? "Ruedas 83mm transparentes" : "83mm transparent wheels",
                note: isEs ? "Con hub para la correa" : "With hub for belt drive",
              },
              {
                name: isEs ? "Correa de transmisión" : "Drive belt",
                note: isEs ? "Polea motor + polea rueda" : "Motor pulley + wheel pulley",
              },
              {
                name: "Mando 2.4 GHz trigger",
                note: isEs ? "Transmisor + receptor" : "Transmitter + receiver",
              },
              {
                name: isEs ? "Cargador LiPo 42V" : "42V LiPo charger",
                note: isEs ? "Switching power supply Fuyuang" : "Fuyuang switching power supply",
              },
              {
                name: "Conectores XT60 ×2",
                note: isEs ? "Para batería y salida de potencia" : "For battery and power output",
              },
              {
                name: isEs ? "Conectores bullet 5mm" : "5mm bullet connectors",
                note: isEs ? "Fases del motor al VESC" : "Motor phases to VESC",
              },
              {
                name: isEs ? "Switch de encendido" : "Power switch",
                note: isEs ? "Rocker circular integrado en la caja" : "Circular rocker on the enclosure",
              },
              {
                name: isEs ? "Display LCD de voltaje" : "LCD voltage display",
                note: isEs ? "Pantalla verde, caja de madera" : "Green screen, wooden enclosure",
              },
              {
                name: isEs ? "Caja de electrónica" : "Electronics enclosure",
                note: isEs ? "Plástico ABS, tornillada bajo el tablero" : "ABS plastic, bolted under the deck",
              },
              {
                name: isEs ? "Trucks estándar" : "Standard trucks",
                note: isEs ? "Compatibles con el motor mount" : "Compatible with motor mount",
              },
            ].map(m => (
              <div className="lb-material-item" key={m.name}>
                <span className="lb-material-dot" />
                <div>
                  <span className="lb-material-name">{m.name}</span>
                  <span className="lb-material-note">{m.note}</span>
                </div>
              </div>
            ))}
          </div>

          {/* foto componentes */}
          <div className="lb-step-full" style={{ marginTop: "1.5rem" }}>
            <div
              className="lb-step-photo"
              style={{ aspectRatio: "16/9" }}
              onClick={() => open(PHOTOS[0])}
            >
              <Image src={PHOTOS[0]} alt="Componentes del longboard" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 60vw" />
            </div>
            <p className="lb-prose" style={{ marginTop: "0.75rem" }}>
              {isEs
                ? "Motor Turnigy, ESC, ruedas transparentes azules, motor mount Torque Boards, mando, BMS, conectores XT60 y los bullet de 5mm para las fases — todo antes de la primera soldadura."
                : "Turnigy motor, ESC, transparent blue wheels, Torque Boards motor mount, remote, BMS, XT60 connectors and the 5mm bullet connectors for the motor phases — everything before the first solder."}
            </p>
          </div>
        </section>

        {/* Step 1 — Motor mount */}
        <section className="lb-section">
          <div className="lb-section-num">step 01 — {isEs ? "sistema de tracción" : "drivetrain"}</div>
          <h2 className="lb-section-title">{isEs ? "Motor mount y poleas" : "Motor mount and pulleys"}</h2>
          <div className="lb-step">
            <div>
              <p className="lb-step-label">{isEs ? "Soporte de motor" : "Motor bracket"}</p>
              <p className="lb-step-title">Torque Boards mount</p>
              <p className="lb-prose">
                {isEs
                  ? "El motor mount de Torque Boards sujeta el motor brushless al truck con tornillos Allen. Lleva dos piezas: el soporte principal (que abraza el truck) y la placa del motor con su ranura de tensión para ajustar la correa. El conjunto lleva una polea de motor y una polea de rueda — la transmisión es por correa dentada."
                  : "The Torque Boards motor mount clamps to the truck with Allen bolts. It comes in two pieces: the main bracket (which wraps around the truck) and the motor plate with a tension slot to adjust the belt. The assembly uses a motor pulley and a wheel pulley — belt drive transmission."}
              </p>
            </div>
            <div className="lb-step-photo" onClick={() => open(PHOTOS[2])}>
              <Image src={PHOTOS[2]} alt="Motor mount Torque Boards" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
          </div>

          <div className="lb-step reverse" style={{ marginTop: "10px" }}>
            <div className="lb-step-photo" onClick={() => open(PHOTOS[1])}>
              <Image src={PHOTOS[1]} alt="Rueda transparente azul con hub" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
            <div>
              <p className="lb-step-label">{isEs ? "Ruedas y hub" : "Wheels and hub"}</p>
              <p className="lb-step-title">{isEs ? "83mm transparentes" : "83mm transparent"}</p>
              <p className="lb-prose">
                {isEs
                  ? "Las ruedas de 83mm en color azul transparente llevan un hub de aluminio con 5 tornillos que permite montar la polea de rueda. La polea encaja sobre el hub y la correa dentada transmite la fuerza del motor hasta la rueda trasera derecha."
                  : "The 83mm transparent blue wheels have an aluminium hub with 5 bolts that mounts the wheel pulley. The pulley fits onto the hub and the toothed belt transfers motor force to the rear right wheel."}
              </p>
            </div>
          </div>

          <div className="lb-step-full" style={{ marginTop: "10px" }}>
            <p className="lb-step-label">{isEs ? "Montaje completo en el truck" : "Full truck assembly"}</p>
            <div className="lb-step-photo" style={{ aspectRatio: "16/9" }} onClick={() => open(PHOTOS[3])}>
              <Image src={PHOTOS[3]} alt="Truck con motor montado" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 60vw" />
            </div>
            <p className="lb-prose" style={{ marginTop: "0.75rem" }}>
              {isEs
                ? "Con el motor mount ajustado, el motor Turnigy SK3 montado y la correa tensada, el sistema de tracción queda completo. El motor tiene tres cables de fase (bullet 5mm) que van al VESC."
                : "With the motor mount tightened, the Turnigy SK3 mounted and the belt tensioned, the drivetrain is complete. The motor has three phase wires (5mm bullets) that connect to the VESC."}
            </p>
          </div>
        </section>

        {/* Step 2 — Electrónica */}
        <section className="lb-section">
          <div className="lb-section-num">step 02 — {isEs ? "electrónica y cableado" : "electronics and wiring"}</div>
          <h2 className="lb-section-title">{isEs ? "Batería, VESC y conexiones" : "Battery, VESC and connections"}</h2>

          <div className="lb-step">
            <div>
              <p className="lb-step-label">{isEs ? "Batería principal" : "Main battery"}</p>
              <p className="lb-step-title">LiPo 10S — 42V</p>
              <p className="lb-prose">
                {isEs
                  ? "La batería LiPo de 10 celdas (10S) proporciona 42V nominales. Está envuelta en funda termorretráctil negra con los cables de potencia (rojo/negro) saliendo por un extremo: uno va al conector de carga (XT60) y otro al switch de encendido que corta la línea positiva antes del VESC."
                  : "The 10-cell LiPo battery (10S) provides 42V nominal. Wrapped in black heat shrink with power cables (red/black) exiting one end: one goes to the charge connector (XT60) and the other to the power switch that breaks the positive line before the VESC."}
              </p>
            </div>
            <div className="lb-step-photo" onClick={() => open(PHOTOS[4])}>
              <Image src={PHOTOS[4]} alt="Batería LiPo" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
          </div>

          <div className="lb-step reverse" style={{ marginTop: "10px" }}>
            <div className="lb-step-photo" onClick={() => open(PHOTOS[5])}>
              <Image src={PHOTOS[5]} alt="BMS, switch y conectores XT60" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
            <div>
              <p className="lb-step-label">{isEs ? "Conectores y switch" : "Connectors and switch"}</p>
              <p className="lb-step-title">XT60 + rocker switch</p>
              <p className="lb-prose">
                {isEs
                  ? "Dos pares de conectores XT60: uno para la salida de potencia al VESC y otro para la carga. El switch circular integrado en la caja de electrónica interrumpe la línea positiva — encendido y apagado limpio sin desconectar físicamente la batería."
                  : "Two pairs of XT60 connectors: one for power output to the VESC and one for charging. The circular switch on the electronics enclosure breaks the positive line — clean on/off without physically disconnecting the battery."}
              </p>
            </div>
          </div>

          <div className="lb-step" style={{ marginTop: "10px" }}>
            <div>
              <p className="lb-step-label">{isEs ? "Display de voltaje" : "Voltage display"}</p>
              <p className="lb-step-title">{isEs ? "Indicador de batería" : "Battery indicator"}</p>
              <p className="lb-prose">
                {isEs
                  ? "Una pantalla LCD verde conectada en paralelo a la batería muestra el voltaje en tiempo real. Montada en una caja de madera propia, integrada en la tapa de la caja principal de electrónica. Con 10S la tensión va de ~42V (llena) a ~33V (vacía)."
                  : "A green LCD screen connected in parallel to the battery shows real-time voltage. Mounted in a custom wooden enclosure, integrated into the lid of the main electronics box. With 10S the voltage goes from ~42V (full) to ~33V (empty)."}
              </p>
            </div>
            <div className="lb-step-photo" onClick={() => open(PHOTOS[6])}>
              <Image src={PHOTOS[6]} alt="Pantalla LCD de voltaje" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
          </div>
        </section>

        {/* Step 3 — Esquema */}
        <section className="lb-section">
          <div className="lb-section-num">step 03 — {isEs ? "esquema eléctrico" : "wiring diagram"}</div>
          <h2 className="lb-section-title">{isEs ? "Plano de conexiones" : "Connection diagram"}</h2>
          <div className="lb-step-full">
            <p className="lb-prose">
              {isEs
                ? "El esquema lo dibujé a mano antes de soldar — buena práctica para no cometer errores con 42V. El flujo básico es: batería → switch → VESC → motor (fases). El receptor del mando va al VESC por PPM. La pantalla de voltaje va en paralelo antes del switch para poder leer el nivel de batería incluso con el sistema apagado."
                : "I drew the wiring diagram by hand before soldering — good practice to avoid mistakes with 42V. The basic flow is: battery → switch → VESC → motor (phases). The remote receiver connects to the VESC via PPM. The voltage display goes in parallel before the switch so you can read battery level even with the system off."}
            </p>
            <div className="lb-diagram" onClick={() => open(PHOTOS[8])}>
              <Image src={PHOTOS[8]} alt="Esquema eléctrico a mano" width={1200} height={900} style={{ width: "100%", height: "auto" }} sizes="(max-width: 768px) 100vw, 60vw" />
            </div>
            <div className="lb-code" style={{ marginTop: "1rem" }}>
              <span className="lb-code acc">Batería 10S</span>{" → "}<span className="lb-code val">XT60 (×2)</span>
              {"\n"}
              <span className="lb-code acc">Switch</span>{" → "}<span className="lb-code cmt">corta línea + antes del VESC</span>
              {"\n"}
              <span className="lb-code acc">VESC</span>{" → "}<span className="lb-code val">Motor (fases × 3, bullet 5mm)</span>
              {"\n"}
              <span className="lb-code acc">Receptor 2.4 GHz</span>{" → "}<span className="lb-code val">VESC PPM</span>
              {"\n"}
              <span className="lb-code acc">Display voltaje</span>{" → "}<span className="lb-code cmt">paralelo, antes del switch</span>
              {"\n"}
              <span className="lb-code acc">Cargador 42V</span>{" → "}<span className="lb-code val">XT60 carga</span>
            </div>
          </div>
        </section>

        {/* Step 4 — Montaje final */}
        <section className="lb-section">
          <div className="lb-section-num">step 04 — {isEs ? "montaje final" : "final assembly"}</div>
          <h2 className="lb-section-title">{isEs ? "Caja y tablero" : "Enclosure and deck"}</h2>
          <div className="lb-step">
            <div className="lb-step-photo" onClick={() => open(PHOTOS[7])}>
              <Image src={PHOTOS[7]} alt="Caja electrónica bajo el tablero" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
            <div>
              <p className="lb-prose">
                {isEs
                  ? "Toda la electrónica — batería, VESC, receptor y display — va dentro de una caja de plástico ABS negra tornillada bajo el tablero. La caja tiene: el switch de encendido en un lateral, la ventana del display de voltaje en la tapa, y el conector de carga accesible desde fuera."
                  : "All electronics — battery, VESC, receiver and display — sit inside a black ABS plastic box bolted under the deck. The box has: the power switch on one side, the voltage display window in the lid, and the charge connector accessible from outside."}
              </p>
              <p className="lb-prose" style={{ marginTop: "0.75rem" }}>
                {isEs
                  ? "El tablero tiene griptape con un diseño de remolinos azules. El truck trasero lleva el motor mount con el Turnigy SK3. Todo el conjunto pesa considerablemente más que un longboard normal — pero funciona."
                  : "The deck has blue swirl griptape. The rear truck carries the motor mount with the Turnigy SK3. The whole assembly weighs considerably more than a normal longboard — but it works."}
              </p>
            </div>
          </div>
        </section>

        {/* Resultado */}
        <section className="lb-section">
          <div className="lb-section-num">{isEs ? "resultado" : "result"}</div>
          <h2 className="lb-section-title">{isEs ? "Qué aprendí" : "What I learned"}</h2>
          <p className="lb-prose">
            {isEs
              ? "Este proyecto fue mi introducción real a la electrónica de potencia: soldadura de alta corriente, gestión de baterías LiPo (que no perdonan los errores), configuración del VESC por UART y el diseño mecánico para transmitir par con una correa. Lo construí con 16 años buscando en foros especializados y viendo horas de vídeos técnicos. Más tarde le di una vuelta — cambié algunos conectores y reforcé el cableado. Sigue rodando."
              : "This project was my real introduction to power electronics: high-current soldering, LiPo battery management (which doesn't forgive mistakes), VESC configuration over UART and the mechanical design to transmit torque with a belt drive. I built it at 16 by reading specialist forums and watching hours of technical videos. I later revisited it — swapped some connectors and reinforced the wiring. It still rides."}
          </p>

          <div className="lb-gallery" style={{ marginTop: "1.5rem" }}>
            {PHOTOS.filter((_, i) => i < 9).map((src, i) => (
              <div key={i} className="lb-gallery-item" onClick={() => open(src)}>
                <Image src={src} alt={`Longboard ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 33vw, 25vw" />
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
