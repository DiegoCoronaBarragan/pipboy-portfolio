import { useState } from "react";

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

const projects = [
  {
    id: 1,
    name: "SESAECOL Institutional Website",
    type: "PUBLIC-SECTOR WEB PLATFORM",
    status: "LIVE",
    summary:
      "Official website for the Secretaría Ejecutiva del Sistema Anticorrupción del Estado de Colima.",
    technologies: ["React", "JavaScript", "Responsive UI"],
    challenge:
      "The institution needed an official digital presence where citizens could find essential public, financial, transparency, and institutional information.",
    contribution:
      "Contributed to the website's initial development and continue to support its administration, content updates, and ongoing maintenance.",
    outcome:
      "Delivered an active institutional platform that centralizes public information and access to anticorruption services and resources.",
    image: "images/projects/sesaecol-home.png",
    imageAlt:
      "SESAECOL institutional website homepage showing public services and transparency navigation",
    sourcePrivate: true,
    live: "https://sesaecol-gob.com/",
  },
  {
    id: 2,
    name: "Interfaz Académica SESAECOL",
    type: "LEARNING AND CERTIFICATION PLATFORM",
    status: "LIVE",
    summary:
      "Online learning environment for public-sector courses, resources, and certificates.",
    technologies: ["Moodle", "LMS Administration", "Course Management"],
    challenge:
      "Public institutions needed a shared platform where they could publish courses and provide certificates to participants.",
    contribution:
      "Created the Moodle-based platform and remain responsible for its administration, course configuration, updates, and maintenance.",
    outcome:
      "Launched an active system that currently hosts public-sector courses, learning resources, and certificate-enabled training.",
    image: "images/projects/ias-home.png",
    imageAlt:
      "IAS learning platform homepage showing the Interfaz Académica SESAECOL course portal",
    live: "https://iasesaecol.mx/",
  },
  {
    id: 3,
    name: "LINCE",
    type: "SURVEY OPERATIONS SYSTEM",
    status: "INTERNAL",
    summary:
      "Internal platform for managing citizen surveys and their operational logistics.",
    technologies: ["Ruby", "Ruby on Rails"],
    challenge:
      "Survey teams needed a centralized way to register, count, and administer citizen surveys while maintaining control over field logistics.",
    contribution:
      "Participated in the system's creation and supported its administration, updates, and continued operation.",
    outcome:
      "The completed system was used during an electoral period to manage survey records and coordinate the associated logistics.",
    sourcePrivate: true,
  },
  {
    id: 4,
    name: "Pip-Boy Portfolio",
    type: "PERSONAL FRONTEND PROJECT",
    status: "ACTIVE",
    summary:
      "A Fallout-inspired portfolio designed as an interactive, strongly typed system interface.",
    technologies: ["React", "TypeScript", "Vite", "CSS"],
    challenge:
      "Create a memorable portfolio without sacrificing maintainability, accessibility, or clear access to professional information.",
    contribution:
      "Designed and developed the complete interface, component architecture, strict TypeScript model, animations, and GitHub Pages deployment workflow.",
    outcome:
      "Produced a responsive portfolio that presents skills, projects, experience, certifications, and contact information in a distinctive format.",
    image: "images/projects/pipboy-portfolio-stat.png",
    imageAlt:
      "Pip-Boy portfolio STAT screen showing Diego Corona's profile and technical skills",
    repo: "https://github.com/DiegoCoronaBarragan/pipboy-portfolio",
    live: "https://diegocoronabarragan.github.io/pipboy-portfolio/",
  },
] as const satisfies readonly Project[];

export default function Inv() {
  const [selected, setSelected] = useState<Project>(projects[0]);

  return (
    <div className="inv-screen">
      <div className="inv-list" aria-label="Featured projects">
        {projects.map((project, index) => (
          <button
            key={project.id}
            className={`inv-item ${
              selected.id === project.id ? "active" : ""
            }`}
            onClick={() => setSelected(project)}
            type="button"
          >
            <span className="inv-item-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="inv-item-copy">
              <strong>{project.name}</strong>
              <small>{project.status}</small>
            </span>
          </button>
        ))}
      </div>

      <article className="inv-details">
        <header className="inv-header">
          <p className="inv-kicker">CASE STUDY // {selected.type}</p>
          <div className="inv-title-row">
            <h1>{selected.name}</h1>
            <span className={`inv-status status-${selected.status.toLowerCase()}`}>
              {selected.status}
            </span>
          </div>
          <p className="inv-summary">{selected.summary}</p>
        </header>

        <ul className="inv-tech" aria-label="Technologies used">
          {selected.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="inv-case-grid">
          <section>
            <h2>CHALLENGE</h2>
            <p>{selected.challenge}</p>
          </section>
          <section>
            <h2>MY CONTRIBUTION</h2>
            <p>{selected.contribution}</p>
          </section>
          <section>
            <h2>OUTCOME</h2>
            <p>{selected.outcome}</p>
          </section>
        </div>

        <div className="inv-actions">
          {selected.live && (
            <a
              href={selected.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inv-link"
            >
              OPEN LIVE SYSTEM
            </a>
          )}

          {selected.repo && (
            <a
              href={selected.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inv-link"
            >
              OPEN REPOSITORY
            </a>
          )}

          {selected.sourcePrivate && (
            <span className="inv-private">SOURCE PRIVATE</span>
          )}
        </div>

        {selected.image && selected.imageAlt && (
          <figure className="inv-preview">
            <img
              src={BASE_URL + selected.image}
              alt={selected.imageAlt}
              loading="lazy"
            />
            <figcaption>PROJECT PREVIEW // {selected.name}</figcaption>
          </figure>
        )}
      </article>
    </div>
  );
}
