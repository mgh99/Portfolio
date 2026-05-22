// src/app/lab/armario-digital/page.tsx
"use client";

import { useLang } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./armario.css";

// Fotos en /public/gallery/ con estos nombres:
// armario_01.png → vista principal Mi armario (imagen 1)
// armario_02.png → modal editar prenda (imagen 2)
// armario_03.png → informe mensual (imagen 3)
// armario_04.png → recomendaciones IA (imagen 4)
// armario_05.png → compras inteligentes (imagen 5)

const PHOTOS = [
  "/gallery/armario_01.png",
  "/gallery/armario_02.png",
  "/gallery/armario_03.png",
  "/gallery/armario_04.png",
  "/gallery/armario_05.png",
];

export default function ArmarioPage() {
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
            <div className="sd-eyebrow">[013] — ai · tool · fullstack</div>
            <h1 className="sd-title">
              {isEs
                ? <>closet<span>.ai</span></>
                : <>closet<span>.ai</span></>}
            </h1>
          </section>

          {/* Cover — screenshot principal ocupa toda la anchura */}
          <div
            className="ar-cover-full"
            onClick={() => setActivePhoto(PHOTOS[0])}
          >
            <Image src={PHOTOS[0]} alt="Vista principal del armario" width={1600} height={1000} style={{ width: "100%", height: "auto", display: "block" }} sizes="(max-width: 768px) 100vw, 80vw" priority />
          </div>

          {/* Meta */}
          <div className="sd-meta">
            <div className="sd-meta-item">
              <span className="sd-meta-label">{isEs ? "Estado" : "Status"}</span>
              <span className="sd-meta-val" style={{ color: "var(--ar-accent)" }}>
                {isEs ? "Uso personal" : "Personal use"}
              </span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">Frontend</span>
              <span className="sd-meta-val">React + Vite</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">Backend</span>
              <span className="sd-meta-val">Supabase (Postgres + Storage)</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">AI</span>
              <span className="sd-meta-val" style={{ color: "var(--ar-accent)" }}>
                Claude Sonnet via API
              </span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">{isEs ? "Prendas registradas" : "Items tracked"}</span>
              <span className="sd-meta-val">40</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">GitHub</span>
              <span className="sd-meta-val">{isEs ? "Código · sin .env" : "Code · no .env"}</span>
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
                ? "Tenía 40 prendas y no sabía cuáles usaba de verdad. Quería saber qué tenía sin usar, qué outfits me funcionaban mejor y qué me faltaba comprar — sin necesidad de abrir el armario. La solución obvia era una app con IA que conociera mi armario tan bien como yo."
                : "I had 40 items and had no idea which ones I actually wore. I wanted to know what was gathering dust, which outfits worked best, and what I actually needed to buy — without opening the wardrobe. The obvious solution was an AI app that knows my wardrobe as well as I do."}
            </p>
            <div className="sd-tags">
              <span className="sd-tag">React</span>
              <span className="sd-tag">Vite</span>
              <span className="sd-tag">Supabase</span>
              <span className="sd-tag">PostgreSQL</span>
              <span className="sd-tag">Supabase Storage</span>
              <span className="sd-tag">Claude API</span>
              <span className="sd-tag">Claude Sonnet</span>
              <span className="sd-tag">JavaScript</span>
            </div>
          </section>

          {/* Step 1: Mi armario */}
          <section className="sd-section">
            <div className="sd-section-num">feature 01 — {isEs ? "mi armario" : "my wardrobe"}</div>
            <h2 className="sd-section-title">
              {isEs ? "Registro de prendas" : "Garment tracking"}
            </h2>
            <div className="sd-step">
              <div>
                <p className="sd-step-label">{isEs ? "Qué hace" : "What it does"}</p>
                <p className="sd-step-title">
                  {isEs ? "Todas tus prendas, con todo el contexto" : "All your garments, fully in context"}
                </p>
                <p className="sd-prose">
                  {isEs
                    ? "Cada prenda tiene nombre, categoría, color, material, tienda, precio, fecha de compra, temporada, valoración y notas. Las fotos se suben directamente a Supabase Storage. La app rastrea automáticamente cuántas veces se usa cada prenda y marca las que llevan demasiado tiempo sin tocarse."
                    : "Each garment has name, category, colour, material, store, price, purchase date, season, rating and notes. Photos are uploaded directly to Supabase Storage. The app automatically tracks how many times each garment is worn and flags ones that haven't been touched in too long."}
                </p>
              </div>
              <div className="sd-step-photo" onClick={() => setActivePhoto(PHOTOS[1])}>
                <Image src={PHOTOS[1]} alt="Modal editar prenda" fill style={{ objectFit: "contain", background: "#f5f3ef" }} sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            </div>
          </section>

          {/* Step 2: Informe */}
          <section className="sd-section">
            <div className="sd-section-num">feature 02 — {isEs ? "informe mensual" : "monthly report"}</div>
            <h2 className="sd-section-title">
              {isEs ? "Métricas reales de tu armario" : "Real wardrobe metrics"}
            </h2>
            <div className="sd-step reverse">
              <div className="sd-step-photo" onClick={() => setActivePhoto(PHOTOS[2])}>
                <Image src={PHOTOS[2]} alt="Informe mensual" fill style={{ objectFit: "contain", background: "#f5f3ef" }} sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div>
                <p className="sd-step-label">{isEs ? "Qué muestra" : "What it shows"}</p>
                <p className="sd-step-title">
                  {isEs ? "Top 5 más y menos usadas" : "Top 5 most and least worn"}
                </p>
                <p className="sd-prose">
                  {isEs
                    ? "El informe mensual muestra prendas totales, usos totales, valoración media y cuántas prendas llevan a cero usos este año. También hace un ranking de las 5 más usadas frente a las 5 menos usadas — con miniaturas de las fotos — y destaca el outfit estrella del mes."
                    : "The monthly report shows total items, total uses, average rating and how many items have zero uses this year. It also ranks the top 5 most vs least worn — with photo thumbnails — and highlights the outfit of the month."}
                </p>
              </div>
            </div>
          </section>

          {/* Step 3: IA */}
          <section className="sd-section">
            <div className="sd-section-num">feature 03 — {isEs ? "estilista con ia" : "ai stylist"}</div>
            <h2 className="sd-section-title">
              {isEs ? "Recomendaciones personalizadas" : "Personalised recommendations"}
            </h2>
            <div className="sd-step">
              <div>
                <p className="sd-step-label">{isEs ? "Cómo funciona" : "How it works"}</p>
                <p className="sd-step-title">
                  {isEs ? "Claude conoce tu armario completo" : "Claude knows your full wardrobe"}
                </p>
                <p className="sd-prose">
                  {isEs
                    ? "La IA recibe como contexto el inventario completo de prendas con sus usos, valoraciones y el historial de feedback (outfits aceptados y rechazados). Con eso genera outfits nuevos agrupados por ocasión, explica por qué encajan con tu estilo y aprende de cada me gusta / no es mi estilo. También hay un chat libre para preguntar cosas como «¿qué me pongo esta semana?» o «¿qué prenda me falta?»."
                    : "The AI receives the full garment inventory as context — including wear counts, ratings and feedback history (accepted and rejected outfits). From that it generates new outfits grouped by occasion, explains why they fit your style and learns from each like / not my style. There's also a free chat to ask things like 'what should I wear this week?' or 'what am I missing?'."}
                </p>
              </div>
              <div className="sd-step-photo" onClick={() => setActivePhoto(PHOTOS[3])}>
                <Image src={PHOTOS[3]} alt="Recomendaciones IA" fill style={{ objectFit: "contain", background: "#f5f3ef" }} sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            </div>

            <div className="sd-step-full" style={{ marginTop: "8px" }}>
              <p className="sd-step-label">{isEs ? "Arquitectura de la llamada a la API" : "API call architecture"}</p>
              <div className="sd-code">
                <span className="sd-cmt">{isEs ? "// Contexto que recibe Claude en cada llamada" : "// Context Claude receives on each call"}</span>{"\n\n"}
                {"system_prompt:\n"}
                {"  → "}<span className="sd-str">instrucciones del estilista</span>{"\n"}
                {"  → "}<span className="sd-str">inventario completo serializado</span>{"  "}<span className="sd-cmt">// nombre, categoría, color, usos, rating</span>{"\n"}
                {"  → "}<span className="sd-str">historial de feedback</span>{"           "}<span className="sd-cmt">// outfits aceptados / rechazados</span>{"\n\n"}
                {"user_message:\n"}
                {"  → "}<span className="sd-str">{isEs ? "\"genera 4 outfits para [ocasión]\"" : "\"generate 4 outfits for [occasion]\""}</span>{"\n\n"}
                {"response:\n"}
                {"  → JSON con outfits + explicación por outfit\n"}
                {"  → "}<span className="sd-cmt">{isEs ? "// se guarda feedback en Supabase para próximas llamadas" : "// feedback saved to Supabase for next calls"}</span>
              </div>
            </div>
          </section>

          {/* Step 4: Compras */}
          <section className="sd-section">
            <div className="sd-section-num">feature 04 — {isEs ? "compras inteligentes" : "smart shopping"}</div>
            <h2 className="sd-section-title">
              {isEs ? "Huecos reales en tu armario" : "Real gaps in your wardrobe"}
            </h2>
            <div className="sd-step reverse">
              <div className="sd-step-photo" onClick={() => setActivePhoto(PHOTOS[4])}>
                <Image src={PHOTOS[4]} alt="Compras inteligentes" fill style={{ objectFit: "contain", background: "#f5f3ef" }} sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div>
                <p className="sd-step-label">{isEs ? "Qué detecta" : "What it detects"}</p>
                <p className="sd-step-title">
                  {isEs ? "Lo que falta, no lo que apetece" : "What's missing, not what's tempting"}
                </p>
                <p className="sd-prose">
                  {isEs
                    ? "La IA analiza el armario completo y detecta categorías infrarrepresentadas o prendas versátiles que falta tener. Para cada hueco propone dos o tres opciones concretas — con rango de precio, descripción detallada y explicación de por qué combina con lo que ya tienes. Se pueden filtrar por prioridad y marcar como interesante o no."
                    : "The AI analyses the full wardrobe and detects underrepresented categories or missing versatile pieces. For each gap it proposes two or three specific options — with price range, detailed description and explanation of why it combines with what you already own. Results can be filtered by priority and marked as interesting or not."}
                </p>
              </div>
            </div>
          </section>

          {/* Tech */}
          <section className="sd-section">
            <div className="sd-section-num">{isEs ? "arquitectura" : "architecture"}</div>
            <h2 className="sd-section-title">
              {isEs ? "Cómo está construido" : "How it's built"}
            </h2>
            <div className="sd-step-full">
              <p className="sd-prose">
                {isEs
                  ? "Todo el estado se gestiona con un hook personalizado (useClosetData) que encapsula las operaciones CRUD contra Supabase. Las imágenes se suben al bucket de Supabase Storage — hay una función de migración que convierte las imágenes base64 antiguas a URLs públicas de Storage automáticamente al cargar la app si las detecta."
                  : "All state is managed with a custom hook (useClosetData) that encapsulates CRUD operations against Supabase. Images are uploaded to a Supabase Storage bucket — there's a migration function that automatically converts old base64 images to public Storage URLs on app load if it detects any."}
              </p>
              <div className="sd-code" style={{ marginTop: "1rem" }}>
                <span className="sd-cmt">{isEs ? "// Stack completo" : "// Full stack"}</span>{"\n\n"}
                {"Frontend   → React 18 + Vite\n"}
                {"State      → useClosetData() hook (useState + useCallback)\n"}
                {"Database   → Supabase Postgres\n"}
                {"Storage    → Supabase Storage (bucket: item-images)\n"}
                {"Auth       → "}<span className="sd-cmt">{isEs ? "// sin auth — uso personal" : "// no auth — personal use"}</span>{"\n"}
                {"AI         → Anthropic API · claude-sonnet-4-20250514\n"}
                {"Deploy     → "}<span className="sd-cmt">{isEs ? "// local — no hay demo pública" : "// local — no public demo"}</span>{"\n\n"}
                <span className="sd-cmt">{isEs ? "// .env contiene VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY + VITE_ANTHROPIC_KEY" : "// .env holds VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY + VITE_ANTHROPIC_KEY"}</span>{"\n"}
                <span className="sd-cmt">{isEs ? "// el repo de GitHub no incluye el .env" : "// GitHub repo does not include .env"}</span>
              </div>
              <p className="sd-prose" style={{ marginTop: "1rem" }}>
                {isEs
                  ? "No hay autenticación porque es de uso estrictamente personal — la URL de Supabase y la anon key con las RLS policies configuradas son suficientes para los datos propios. El código es abierto en GitHub pero sin el .env nadie puede conectarse a la base de datos."
                  : "There's no authentication because it's strictly for personal use — the Supabase URL and anon key with configured RLS policies are enough for personal data. The code is open on GitHub but without the .env nobody can connect to the database."}
              </p>
            </div>
          </section>

          {/* Galería completa */}
          <section className="sd-section">
            <div className="sd-section-num">{isEs ? "galería" : "gallery"}</div>
            <h2 className="sd-section-title">{isEs ? "Todas las pantallas" : "All screens"}</h2>
            <div className="sd-gallery" style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "1.25rem", gap: "10px" }}>
              {PHOTOS.map((src, i) => (
                <div
                  key={i}
                  className="sd-gallery-item"
                  onClick={() => setActivePhoto(src)}
                  style={{ aspectRatio: "16/10", position: "relative" }}
                >
                  <Image
                    src={src}
                    alt={`closet.ai screen ${i + 1}`}
                    fill
                    style={{ objectFit: "contain", background: "#f5f3ef" }}
                    sizes="(max-width: 768px) 50vw, 40vw"
                  />
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
