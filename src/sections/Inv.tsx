import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const BASE_URL = import.meta.env.BASE_URL;
type ProjectStatus = "LIVE" | "INTERNAL" | "ACTIVE";

interface Project {
  id: number;
  name: string;
  type: string;
  status: ProjectStatus;
  summary: string;
  technologies: readonly string[];
  challenge: string;
  contribution: string;
  outcome: string;
  image?: string;
  imageAlt?: string;
  sourcePrivate?: boolean;
  repo?: string;
  live?: string;
}

export default function Inv() {
  const { content } = useLanguage();
  const copy = content.projects;
  const projects = copy.items as readonly Project[];
  const [selectedId, setSelectedId] = useState(1);
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0]!;

  return (
    <div className="inv-screen">
      <div className="inv-list" aria-label={copy.listLabel}>
        {projects.map((project, index) => (
          <button
            key={project.id}
            className={`inv-item ${selected.id === project.id ? "active" : ""}`}
            onClick={() => setSelectedId(project.id)}
            type="button"
          >
            <span className="inv-item-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="inv-item-copy">
              <strong>{project.name}</strong>
              <small>{copy.statusLabels[project.status]}</small>
            </span>
          </button>
        ))}
      </div>

      <article className="inv-details">
        <header className="inv-header">
          <p className="inv-kicker">{copy.caseStudy} // {selected.type}</p>
          <div className="inv-title-row">
            <h1>{selected.name}</h1>
            <span className={`inv-status status-${selected.status.toLowerCase()}`}>
              {copy.statusLabels[selected.status]}
            </span>
          </div>
          <p className="inv-summary">{selected.summary}</p>
        </header>

        <ul className="inv-tech" aria-label={copy.technologiesLabel}>
          {selected.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>

        <div className="inv-case-grid">
          <section><h2>{copy.challenge}</h2><p>{selected.challenge}</p></section>
          <section><h2>{copy.contribution}</h2><p>{selected.contribution}</p></section>
          <section><h2>{copy.outcome}</h2><p>{selected.outcome}</p></section>
        </div>

        <div className="inv-actions">
          {selected.live && <a href={selected.live} target="_blank" rel="noopener noreferrer" className="inv-link">{copy.openLive}</a>}
          {selected.repo && <a href={selected.repo} target="_blank" rel="noopener noreferrer" className="inv-link">{copy.openRepo}</a>}
          {selected.sourcePrivate && <span className="inv-private">{copy.sourcePrivate}</span>}
        </div>

        {selected.image && selected.imageAlt && (
          <figure className="inv-preview">
            <img src={BASE_URL + selected.image} alt={selected.imageAlt} loading="lazy" />
            <figcaption>{copy.preview} // {selected.name}</figcaption>
          </figure>
        )}
      </article>
    </div>
  );
}
