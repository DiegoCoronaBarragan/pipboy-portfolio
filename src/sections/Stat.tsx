import { useLanguage } from "../i18n/LanguageContext";

const BASE_URL = import.meta.env.BASE_URL;

type StatProps = {
  onNavigate: (section: "INV") => void;
};

export default function Stat({ onNavigate }: StatProps) {
  const { content } = useLanguage();
  const copy = content.stat;

  return (
    <div className="stat-screen">
      <div className="stat-left">
        <div className="stat-avatar">
          <img
            alt={copy.avatarAlt}
            className="stat-avatar-image"
            src={BASE_URL + "images/Avatar.svg"}
          />
        </div>
        <div className="stat-info">
          <p><span>{copy.system}</span> {copy.online}</p>
          <p><span>{copy.language}</span> ES / EN</p>
          <p><span>{copy.mode}</span> FULL STACK</p>
        </div>
      </div>
      <div className="stat-right">
        <div className="stat-hero">
          <p className="stat-eyebrow">{copy.eyebrow}</p>
          <h1>{copy.name}</h1>
          <p className="stat-headline">{copy.headline}</p>
          <p className="stat-summary">{copy.summary}</p>
          <div className="stat-actions">
            <button
              className="stat-action"
              onClick={() => onNavigate("INV")}
              type="button"
            >
              {copy.viewProjects}
            </button>
            <a
              className="stat-action"
              href={BASE_URL + "cv/Diego_Corona_CV.pdf"}
              rel="noopener noreferrer"
              target="_blank"
            >
              {copy.downloadCv}
            </a>
          </div>
        </div>
        <div className="stat-divider">{copy.skillsTitle}</div>
        <div className="skill-grid">
          {copy.skillGroups.map((group, index) => (
            <article
              key={group.category}
              className="skill-group section-content-item"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <h2>{group.category}</h2>
              <ul
                className="skill-tags"
                aria-label={`${group.category} ${copy.technologiesLabel}`}
              >
                {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
              <p className="skill-evidence">
                <span>{copy.evidenceLabel}</span>
                {group.evidence}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
