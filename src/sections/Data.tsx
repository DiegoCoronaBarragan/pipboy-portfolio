import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

type DataSectionKey = "experience" | "education" | "certifications";

interface BaseItem { id: number; title: string; }
interface ExperienceItem extends BaseItem { place: string; period: string; technologies: readonly string[]; highlights: readonly string[]; }
interface EducationItem extends BaseItem { place: string; period: string; description: string; }
interface CertificationItem extends BaseItem { issuer: string; year: string; file: string; }
type DataItem = ExperienceItem | EducationItem | CertificationItem;
interface DataSection<T extends BaseItem> { title: string; items: readonly T[]; }
type DataSections = {
  experience: DataSection<ExperienceItem>;
  education: DataSection<EducationItem>;
  certifications: DataSection<CertificationItem>;
};

export default function Data() {
  const { content } = useLanguage();
  const copy = content.data;
  const dataSections = copy.sections as DataSections;
  const [activeSection, setActiveSection] = useState<DataSectionKey>("experience");
  const [selectedId, setSelectedId] = useState(1);
  const section = dataSections[activeSection];
  const selected = (section.items.find((item) => item.id === selectedId) ?? section.items[0]!) as DataItem;

  const selectSection = (key: DataSectionKey) => {
    setActiveSection(key);
    setSelectedId(dataSections[key].items[0]!.id);
  };

  return (
    <div className="data-screen">
      <div className="data-menu">
        {(Object.keys(dataSections) as DataSectionKey[]).map((key) => (
          <button
            key={key}
            className={`data-tab ${activeSection === key ? "active" : ""}`}
            onClick={() => selectSection(key)}
            type="button"
          >
            {dataSections[key].title}
          </button>
        ))}
      </div>

      <div className="data-list">
        {section.items.map((item) => (
          <button
            key={item.id}
            className={`data-item ${selected.id === item.id ? "active" : ""}`}
            onClick={() => setSelectedId(item.id)}
            type="button"
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="data-details">
        <div className="data-title">{selected.title}</div>
        {"place" in selected && <p><span>{copy.place}</span> {selected.place}</p>}
        {"period" in selected && <p><span>{copy.period}</span> {selected.period}</p>}
        {"issuer" in selected && <p><span>{copy.issuer}</span> {selected.issuer}</p>}
        {"year" in selected && <p><span>{copy.year}</span> {selected.year}</p>}
        {"description" in selected && <p className="data-desc">{selected.description}</p>}

        {"technologies" in selected && (
          <ul className="data-tech" aria-label={copy.technologiesLabel}>
            {selected.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        )}

        {"highlights" in selected && (
          <div className="data-contributions">
            <div className="data-section-label">{copy.contributions}</div>
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
            href={import.meta.env.BASE_URL + selected.file}
            target="_blank"
            rel="noopener noreferrer"
            className="data-link"
          >
            {copy.viewCertificate}
          </a>
        )}
      </div>
    </div>
  );
}
