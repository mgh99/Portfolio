/* components/PublicationsSection.tsx*/
"use client";

import { useLang, type Dict } from "@/context/LanguageContext";

type Publication = {
  year: string;
  statusKey: "accepted" | "published" | "under_review";
  titleKey: keyof Dict["publications"];
  subtitleKey: keyof Dict["publications"];
  imageSrc?: string;
  tags: string[];
  venueUrl?: string;
  details: {
    venue: string;
    whenWhere: string;
    affiliations: string;
    supervisors: { name: string; url: string }[];
    noteKey?: keyof Dict["publications"];
  };
};

const publications = [
  {
    year: "2026",
    statusKey: "accepted",
    titleKey: "paperTitle",
    subtitleKey: "paperSubtitle",
    imageSrc: "/gallery/posterVideo.jpg",
    tags: ["IEEE", "Research", "Cybersecurity", "LLMs"],
    venueUrl: "https://www.ieeesmc.org/cai-2026/",
    details: {
      venue: "IEEE Conference on Artificial Intelligence (CAI 2026)",
      whenWhere: "Granada, Spain — 8–10 May 2026",
      affiliations: "University of Essex · BT Security Research",
      supervisors: [
        { name: "Zeba Khanam", url: "https://www.linkedin.com/in/zebakhanam/" },
        { name: "Amit Singh", url: "https://www.linkedin.com/in/amit-singh-82abb815/" },
      ],
      noteKey: "noteAfterPublication",
    },
  },
] as const satisfies ReadonlyArray<Publication>;


export default function PublicationsSection() {
  const { t } = useLang();

  return (
    <section id="publications" className="mt-5">
      <h2 className="section-title">{t.sections.publicationsTitle}</h2>
      <p className="section-muted mb-4">{t.sections.publicationsSubtitle}</p>

      <div className="pub-timeline">
        {publications.map((p, idx) => (
          <div className="pub-item" key={`${p.year}-${idx}`}>
            <div className="pub-year">{p.year}</div>

            <div className="pub-card portfolio-card border rounded-4">
              <div className="pub-card-inner">
                {/* Badge status */}
                <span className={`pub-badge ${p.statusKey === "accepted" ? "accepted" : ""}`}>
                  {t.publications[p.statusKey].toUpperCase()}
                </span>

                {/* Image */}
                {p.imageSrc && (
                  <div className="pub-image-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.imageSrc} alt="IEEE CAI 2026" className="pub-image" />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="h5 fw-bold mb-2">
                    {t.publications[p.titleKey]}{" "}
                    <span className="text-muted-soft">({t.publications[p.statusKey]})</span>
                  </h3>

                  <p className="section-muted mb-3">{t.publications[p.subtitleKey]}</p>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {p.tags.map((tag) => (
                      <span key={tag} className="badge-tech">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="d-flex gap-2 flex-wrap">
                    {/* Details button triggers modal */}
                    <button
                      type="button"
                      className="btn btn-sm"
                      style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                      data-bs-toggle="modal"
                      data-bs-target={`#pubModal-${idx}`}
                    >
                      <i className="bi bi-info-circle me-1" />
                      {t.publications.details}
                    </button>

                    {/* Venue link */}
                    {p.venueUrl && (
                      <a
                        href={p.venueUrl}
                        target="_blank"
                        rel="noopener"
                        className="btn btn-sm btn-outline-secondary"
                        style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                      >
                        <i className="bi bi-box-arrow-up-right me-1" />
                        {t.publications.venue}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id={`pubModal-${idx}`} tabIndex={-1} aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content pub-modal">
                  <div className="modal-header">
                    <h5 className="modal-title fw-bold">{t.publications[p.titleKey]}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>

                  <div className="modal-body">
                    <ul className="pub-details">
                      <li>
                        <span>{t.publications.venueLabel}:</span> {p.details.venue}
                      </li>
                      <li>
                        <span>{t.publications.whenWhereLabel}:</span> {p.details.whenWhere}
                      </li>
                      <li>
                        <span>{t.publications.statusLabel}:</span> {t.publications[p.statusKey]}
                      </li>
                      <li>
                        <span>{t.publications.affiliationsLabel}:</span> {p.details.affiliations}
                      </li>
                      <li>
                        <span>{t.publications.supervisorsLabel}:</span>{" "}
                        {p.details.supervisors.map((s, i) => (
                          <span key={s.url}>
                            <a href={s.url} target="_blank" rel="noopener">
                              {s.name}
                            </a>
                            {i < p.details.supervisors.length - 1 ? " · " : ""}
                          </span>
                        ))}
                      </li>

                      {p.details.noteKey && (
                        <li>
                          <span>{t.publications.noteLabel}:</span> {t.publications[p.details.noteKey]}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                      data-bs-dismiss="modal"
                    >
                      {t.common.close}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
