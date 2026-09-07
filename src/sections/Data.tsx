import { useState } from "react";

type DataSectionKey = "experience" | "education" | "certifications";

interface BaseItem {
  id: number;
  title: string;
}

interface ExperienceItem extends BaseItem {
  place: string;
  period: string;
  technologies: readonly string[];
  highlights: readonly string[];
}

interface EducationItem extends BaseItem {
  place: string;
  period: string;
  description: string;
}

interface CertificationItem extends BaseItem {
  issuer: string;
  year: string;
  file: string;
}

type DataItem =
  | ExperienceItem
  | EducationItem
  | CertificationItem;

interface DataSection<T extends BaseItem> {
  title: string;
  items: T[];
}

type DataSections = {
  experience: DataSection<ExperienceItem>;
  education: DataSection<EducationItem>;
  certifications: DataSection<CertificationItem>;
};

const dataSections: DataSections = {
  experience: {
    title: "EXPERIENCE",
    items: [
      {
        id: 1,
        title: "SESAECOL Web Developer",
        place:
          "SESAECOL – Secretaría Ejecutiva del Sistema Anticorrupción del Estado de Colima",
        period: "Feb 2025 – Present",
        technologies: ["React", "JavaScript", "CSS / Sass", "MongoDB", "Moodle"],
        highlights: [
          "Contribute to the ongoing development and maintenance of the official institutional website, centralizing public, financial, and transparency information.",
          "Created and administer the IAS Moodle platform, including course configuration, learning resources, updates, and certificate-enabled training.",
          "Build responsive, accessible interface updates with a focus on clear information architecture for citizens and public institutions.",
        ],
      },
      {
        id: 2,
        title: "ForenTec Ruby on Rails Developer",
        place: "ForenTec",
        period: "Jul 2023 – Dec 2024",
        technologies: ["Ruby on Rails", "JavaScript", "Google Maps API", "Railway"],
        highlights: [
          "Developed an anonymous reporting system for public security institutions using Ruby on Rails.",
          "Built client-management CRUD workflows for surveys, events, requests, and reports.",
          "Implemented geographic data visualization with Google Maps API and managed separate project databases.",
          "Supported the production deployment of a client project using Railway.",
        ],
      },
      {
        id: 3,
        title: "Bright Coders Ruby on Rails Developer",
        place: "Bright Coders",
        period: "Dec 2022 – Apr 2023",
        technologies: ["Ruby on Rails", "JavaScript", "Git", "RuboCop", "RubyCritic"],
        highlights: [
          "Developed web application features with Ruby on Rails and JavaScript using version-controlled workflows.",
          "Applied test-driven development practices and reviewed code quality with RuboCop and RubyCritic.",
          "Collaborated through agile practices, code reviews, and shared delivery responsibilities.",
        ],
      },
      {
        id: 4,
        title: "DIF Estatal Colima Full Stack Developer",
        place: "DIF Estatal Colima",
        period: "Feb 2022 – Oct 2022",
        technologies: ["Full Stack Development", "CRUD", "Inventory Management"],
        highlights: [
          "Designed and developed a web-based inventory control system for institutional warehouse operations.",
          "Implemented workflows to register, edit, delete, and visualize inventory records.",
          "Improved operational visibility and resource tracking by centralizing inventory information.",
        ],
      },
    ],
  },

  education: {
    title: "EDUCATION",
    items: [
      {
        id: 1,
        title: "Bachelor’s Degree in Intelligent Computer Engineering",
        place: "Universidad de Colima",
        period: "2019 – 2024",
        description:
          "Bachelor’s degree focused on software development, system analysis, and web technologies, with emphasis on problem-solving and continuous learning.",
      },
    ],
  },

  certifications: {
    title: "CERTIFICATIONS",
    items: [
      {
        id: 1,
        title: "Ruby on Rails Web Developer",
        issuer: "Professional Certification",
        year: "2023",
        file: import.meta.env.BASE_URL + "certificates/BC1222022.pdf",
      },
      {
        id: 2,
        title: "English Level Certificate (B1)",
        issuer: "Language Proficiency Assessment",
        year: "2023",
        file: import.meta.env.BASE_URL + "certificates/EF_SET_Certificate.pdf",
      },
    ],
  },
};


export default function Data() {
  const [activeSection, setActiveSection] =
    useState<DataSectionKey>("experience");

  const [selected, setSelected] =
    useState<DataItem>(dataSections.experience.items[0]!);

  const section = dataSections[activeSection];

  return (
    <div className="data-screen">
      <div className="data-menu">
        {(Object.keys(dataSections) as DataSectionKey[]).map((key) => (
          <button
            key={key}
            className={`data-tab ${
              activeSection === key ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection(key);
              setSelected(dataSections[key].items[0]!);
            }}
          >
            {dataSections[key].title}
          </button>
        ))}
      </div>

      <div className="data-list">
        {section.items.map((item) => (
          <button
            key={item.id}
            className={`data-item ${
              selected.id === item.id ? "active" : ""
            }`}
            onClick={() => setSelected(item)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="data-details">
        <div className="data-title">{selected.title}</div>

        {"place" in selected && (
          <p>
            <span>PLACE</span> {selected.place}
          </p>
        )}

        {"period" in selected && (
          <p>
            <span>PERIOD</span> {selected.period}
          </p>
        )}

        {"issuer" in selected && (
          <p>
            <span>ISSUER</span> {selected.issuer}
          </p>
        )}

        {"year" in selected && (
          <p>
            <span>YEAR</span> {selected.year}
          </p>
        )}

        {"description" in selected && (
          <p className="data-desc">
            {selected.description}
          </p>
        )}

        {"technologies" in selected && (
          <ul className="data-tech" aria-label="Technologies and practices">
            {selected.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        )}

        {"highlights" in selected && (
          <div className="data-contributions">
            <div className="data-section-label">SELECTED CONTRIBUTIONS</div>
            <ul className="data-highlights">
              {selected.highlights.map((highlight, index) => (
                <li key={highlight}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{highlight}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {"file" in selected && (
          <a
            href={selected.file}
            target="_blank"
            rel="noopener noreferrer"
            className="data-link"
          >
            VIEW CERTIFICATE
          </a>
        )}
      </div>
    </div>
  );
}

