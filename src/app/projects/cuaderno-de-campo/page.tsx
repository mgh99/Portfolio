// src/app/projects/cuaderno-de-campo/page.tsx
"use client";

import { useLang } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

export default function FieldNotebookProjectPage() {
    const { lang } = useLang();

    const isEs = lang === "es";

    const title = isEs
        ? "Cuaderno de campo digital"
        : "Digital field notebook";

    const intro = isEs
        ? "Aplicación web interna para gestionar actividades agrícolas (fincas, parcelas y campañas) de forma centralizada. Por motivos de privacidad, la demo pública no está disponible, ya que se utiliza con datos reales."
        : "Internal web application to manage agricultural activities (fields, plots and campaigns) in a centralized way. For privacy reasons, there is no public demo, as it is used with real-world data.";

    const techIntro = isEs
        ? "Tecnologías principales"
        : "Main technologies";

    const techList = isEs
        ? [
            "Frontend SPA (Flutter / React según la versión del proyecto).",
            "Firebase Authentication para acceso privado.",
            "Firestore como base de datos NoSQL.",
            "Firebase Hosting para el despliegue.",
        ]
        : [
            "SPA frontend (Flutter / React depending on the project version).",
            "Firebase Authentication for private access.",
            "Firestore as NoSQL database.",
            "Firebase Hosting for deployment.",
        ];

    const featuresTitle = isEs ? "Funcionalidades clave" : "Key features";

    const features = isEs
        ? [
            "Registro de actividades por finca, parcela y campaña.",
            "Filtros por fecha, tipo de actividad y responsable.",
            "Visualización rápida de superficies y campañas activas.",
            "Exportación de tablas en CSV para uso externo.",
            "Control de acceso restringido a usuarios internos.",
        ]
        : [
            "Register activities by field, plot and campaign.",
            "Filtering by date, activity type and owner.",
            "Quick view of areas and active campaigns.",
            "Export tables to CSV for external use.",
            "Restricted access for internal users only.",
        ];

    const architectureTitle = isEs ? "Arquitectura y diseño" : "Architecture & design";

    const architectureText = isEs
        ? "El proyecto está diseñado como una aplicación de uso interno, enfocada en la productividad diaria. La base de datos está organizada por campañas y fincas, lo que permite escalar a nuevas temporadas sin perder el histórico. Se han definido reglas de seguridad en Firestore para garantizar que solo los usuarios autorizados puedan acceder o modificar los datos."
        : "The project is designed as an internal-use application focused on daily productivity. The database is organised by campaigns and fields, allowing the system to scale to new seasons without losing historical data. Firestore security rules ensure that only authorised users can access or modify data.";

    const privacyTitle = isEs ? "Privacidad y acceso" : "Privacy & access";

    const privacyText = isEs
        ? "Por tratarse de un entorno real con información sensible, no existe demo pública ni repositorio abierto. Bajo solicitud, se pueden compartir capturas anonimizadas o explicaciones técnicas adicionales durante procesos de selección."
        : "Because this is a real environment with sensitive information, there is no public demo or open repository. Upon request, anonymised screenshots or further technical explanations can be shared during recruitment processes.";

    const backLabel = isEs ? "← Volver a proyectos" : "← Back to projects";

    return (
        <main className="container py-5">
        <div className="mb-4">
            <Link href="/#projects" className="text-muted-soft small">
            {backLabel}
            </Link>
        </div>

        <section className="mb-4">
            <span className="accent-pill">
                {isEs ? "Proyecto interno" : "Internal project"}
            </span>
            <h1 className="mt-3 mb-2 fw-bold">{title}</h1>
            <p className="section-muted" style={{ maxWidth: 720 }}>
                {intro}
            </p>
        </section>

        <section className="row g-4 align-items-start">
            <div className="col-12 col-lg-7">
                <div className="card portfolio-card border rounded-4 h-100">
                    <div className="card-body">
                        <h2 className="h5 mb-3">{techIntro}</h2>
                        <ul className="section-muted">
                            {techList.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>

                        <h2 className="h5 mt-4 mb-3">{featuresTitle}</h2>
                        <ul className="section-muted">
                            {features.map((f) => (
                                <li key={f}>{f}</li>
                            ))}
                        </ul>

                        <h2 className="h5 mt-4 mb-2">{architectureTitle}</h2>
                        <p className="section-muted">{architectureText}</p>

                        <h2 className="h5 mt-4 mb-2">{privacyTitle}</h2>
                        <p className="section-muted mb-0">{privacyText}</p>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-5">
  <div className="card portfolio-card border rounded-4 overflow-hidden">
    {/* Carrusel Bootstrap */}
    <div
      id="fieldNotebookCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4500" // 4.5 segundos entre fotos
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="ratio ratio-16x9">
            <Image
              src="/gallery/field-1.png"
              alt={`${title} – screenshot 1`}
              width={1600}
              height={900}
              className="object-fit-cover"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="ratio ratio-16x9">
            <Image
              src="/gallery/field-2.png"
              alt={`${title} – screenshot 2`}
              width={1600}
              height={900}
              className="object-fit-cover"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="ratio ratio-16x9">
            <Image
              src="/gallery/field-3.png"
              alt={`${title} – screenshot 3`}
              width={1600}
              height={900}
              className="object-fit-cover"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="ratio ratio-16x9">
            <Image
              src="/gallery/field-4.png"
              alt={`${title} – screenshot 4`}
              width={1600}
              height={900}
              className="object-fit-cover"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="ratio ratio-16x9">
            <Image
              src="/gallery/field-5.png"
              alt={`${title} – screenshot 5`}
              width={1600}
              height={900}
              className="object-fit-cover"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="ratio ratio-16x9">
            <Image
              src="/gallery/field-6.png"
              alt={`${title} – screenshot 6`}
              width={1600}
              height={900}
              className="object-fit-cover"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="ratio ratio-16x9">
            <Image
              src="/gallery/field-7.png"
              alt={`${title} – screenshot 7`}
              width={1600}
              height={900}
              className="object-fit-cover"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="ratio ratio-16x9">
            <Image
              src="/gallery/field-8.png"
              alt={`${title} – screenshot 8`}
              width={1600}
              height={900}
              className="object-fit-cover"
            />
          </div>
        </div>
      </div>

      {/* Flechas de navegación */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#fieldNotebookCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#fieldNotebookCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    {/* Texto y chips debajo del carrusel */}
    <div className="card-body">
      <p className="section-muted mb-2">
        {isEs
          ? "Galería de pantallas representativas de la aplicación. Los datos están anonimizados por privacidad."
          : "Gallery of representative screens from the application. Data is anonymised for privacy reasons."}
      </p>
      <div className="d-flex flex-wrap gap-2">
        <span className="badge badge-tech">Firebase</span>
        <span className="badge badge-tech">Firestore</span>
        <span className="badge badge-tech">Authentication</span>
        <span className="badge badge-tech">SPA</span>
      </div>
    </div>
  </div>
</div>

        </section>
    </main>
    );
}
