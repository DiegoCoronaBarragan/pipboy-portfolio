import { useState } from "react";

const dataSections = {
  experience: {
    title: "EXPERIENCE",
    items: [
      {
        id: 1,
        title: "SESAECOL Web Developer",
        place: "SESAECOL – Secretaría Ejecutiva del Sistema Anticorrupción del Estado de Colima",
        period: "Feb 2025 – Present",
        description:
          "Development and maintenance of institutional web platforms focused on transparency and public access to information. Contributed to the development and ongoing maintenance of the official SESAECOL website and the IAS learning platform. Daily work includes frontend development with React, JavaScript, CSS, Sass, MongoDB, and Moodle-based educational solutions, ensuring accessibility, responsive design, and clear information structure.",
      },
      {
        id: 2,
        title: "ForenTec Ruby on Rails Developer",
        place: "ForenTec",
        period: "Jul 2023 – Dec 2024",
        description:
          "Worked on multiple Ruby on Rails projects for real-world clients. Developed an anonymous reporting web system for public security institutions and a client management platform using CRUD operations for surveys, events, requests, and reports. Implemented data visualization with Google Maps API and managed independent databases. One project was deployed using Railway.",
      },
      {
        id: 3,
        title: "Bright Coders Ruby on Rails Developer",
        place: "Bright Coders",
        period: "Dec 2022 – Apr 2023",
        description:
          "Developed web systems using Ruby on Rails and JavaScript while applying good development practices, test-driven development, and version control workflows. Performed unit testing with Rubocop and Rubycritic and worked under agile methodologies, strengthening teamwork and communication skills. This experience strengthened my foundations in professional development workflows and collaborative environments.",
      },
      {
        id: 4,
        title: "DIF Estatal Colima Full Stack Developer",
        place: "DIF Estatal Colima",
        period: "Feb 2022 – Oct 2022",
        description:
          "Designed and developed a web-based inventory control system for warehouse management. The system allowed users to register, edit, delete, and visualize inventory data, improving resource tracking and operational efficiency within the institution.",
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
        file: "/certificates/BC1222022.pdf",
      },
      {
        id: 2,
        title: "English Level Certificate (B1)",
        issuer: "Language Proficiency Assessment",
        year: "2023",
        file: "/certificates/EF_SET_Certificate.pdf",
      },
    ],
  },

};

export default function Data() {
  const [activeSection, setActiveSection] = useState("experience");
  const [selected, setSelected] = useState(
    dataSections.experience.items[0]
  );

  const section = dataSections[activeSection];

  return (
    <div className="data-screen">
      <div className="data-menu">
        {Object.keys(dataSections).map((key) => (
          <button
            key={key}
            className={`data-tab ${activeSection === key ? "active" : ""}`}
            onClick={() => {
              setActiveSection(key);
              setSelected(dataSections[key].items[0]);
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

        {selected.place && (
          <p>
            <span>PLACE</span> {selected.place}
          </p>
        )}

        {selected.period && (
          <p>
            <span>PERIOD</span> {selected.period}
          </p>
        )}

        {selected.issuer && (
          <p>
            <span>ISSUER</span> {selected.issuer}
          </p>
        )}

        {selected.year && (
          <p>
            <span>YEAR</span> {selected.year}
          </p>
        )}

        {selected.description && (
          <p className="data-desc">{selected.description}</p>
        )}

        {selected.file && (
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

