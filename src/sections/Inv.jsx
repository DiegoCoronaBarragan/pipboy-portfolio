import { useState } from "react";

const projects = [
  {
    id: 1,
    name: "Pip-Boy Portfolio",
    tech: "React / CSS",
    status: "ACTIVE",
    description:
      "Personal portfolio inspired by the Fallout Pip-Boy interface, designed to showcase projects, skills, and system-style UI interactions.",
    repo: "https://github.com/DiegoCoronaBarragan/pipboy-portfolio",
  },
  {
    id: 2,
    name: "SESAECOL-GOB",
    tech: "Web Platform",
    status: "DEPLOYED",
    description:
      "SESAECOL-GOB is the official institutional website of the Secretaría Ejecutiva del Sistema Anticorrupción del Estado de Colima. Developed primarily using React, the platform provides structured access to institutional information and multiple public repositories, including financial data, events, articles, official records, curricula, FAQs, tools, reports, regulations, transparency resources, communication materials, and public policies.",
    live: "https://sesaecol-gob.com/",
  },
  {
    id: 3,
    name: "Interfaz Académica SESAECOL (IAS)",
    tech: "Frontend / Web System",
    status: "DEPLOYED",
    description:
      "Interfaz Académica SESAECOL (IAS) is a web-based learning platform developed primarily using Moodle, providing user authentication (login and registration) and access to courses, informational resources, and tools from multiple institutions. The platform enables users to enroll in educational content and obtain certificates and/or official recognitions upon successful course completion. The platform allows users to enroll in educational content and obtain certificates and/or official recognitions upon successful course completion.",
    live: "https://iasesaecol.mx/",
  },
  {
    id: 4,
    name: "LINCE",
    tech: "Web System",
    status: "OFFLINE",
    description:
      "LINCE was an internal web system developed primarily with Ruby on Rails, designed for structured data collection and analysis. The platform allowed authorized users to register and manage population-related information, generate analytical reports, visualizations, statistics, and geographic mappings to support institutional decision-making. The system is currently offline.",
  },
  {
    id: 5,
    name: "Inventory Control System (DIF)",
    tech: "Web System",
    status: "OFFLINE",
    description:
      "Inventory Control System (DIF) was a simple internal web-based inventory management system developed primarily using HTML and PHP. The system allowed authorized users to register, edit, delete, and view inventory records, supporting basic asset tracking and internal data management. The platform is currently offline.",
  },
];

export default function Inv() {
  const [selected, setSelected] = useState(projects[0]);

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

