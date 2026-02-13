import { useState } from "react";

type ProjectStatus = "ACTIVE" | "DEPLOYED" | "OFFLINE";

interface Project {
  id: number;
  name: string;
  tech: string;
  status: ProjectStatus;
  description: string;
  repo?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Pip-Boy Portfolio",
    tech: "React + TypeScript (Strict Mode)",
    status: "ACTIVE",
    description:
      "Personal portfolio inspired by the Fallout Pip-Boy interface, built with React and fully migrated to TypeScript using strict typing. The project focuses on component-based architecture, scalable state management, and strong type safety through interfaces, union types, and generics. Designed to simulate a system-style UI with animated boot sequences and modular sections for skills, projects, experience, and contact information.",
    repo: "https://github.com/DiegoCoronaBarragan/pipboy-portfolio",
  },
  {
    id: 2,
    name: "SESAECOL-GOB",
    tech: "Web Platform",
    status: "DEPLOYED",
    description:
      "SESAECOL-GOB is the official institutional website of the Secretaría Ejecutiva del Sistema Anticorrupción del Estado de Colima...",
    live: "https://sesaecol-gob.com/",
  },
  {
    id: 3,
    name: "Interfaz Académica SESAECOL (IAS)",
    tech: "Frontend / Web System",
    status: "DEPLOYED",
    description:
      "Interfaz Académica SESAECOL (IAS) is a web-based learning platform developed primarily using Moodle...",
    live: "https://iasesaecol.mx/",
  },
  {
    id: 4,
    name: "LINCE",
    tech: "Web System",
    status: "OFFLINE",
    description:
      "LINCE was an internal web system developed primarily with Ruby on Rails...",
  },
  {
    id: 5,
    name: "Inventory Control System (DIF)",
    tech: "Web System",
    status: "OFFLINE",
    description:
      "Inventory Control System (DIF) was a simple internal web-based inventory management system...",
  },
];

export default function Inv() {
  const [selected, setSelected] = useState<Project>(projects[0]!);

  return (
    <div className="inv-screen">
      <div className="inv-list">
        {projects.map((project) => (
          <button
            key={project.id}
            className={`inv-item ${
              selected.id === project.id ? "active" : ""
            }`}
            onClick={() => setSelected(project)}
          >
            {project.name}
          </button>
        ))}
      </div>

      <div className="inv-details">
        <div className="inv-title">{selected.name}</div>
        <p><span>TECH</span> {selected.tech}</p>
        <p><span>STATUS</span> {selected.status}</p>
        <p className="inv-desc">{selected.description}</p>

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
      </div>
    </div>
  );
}

