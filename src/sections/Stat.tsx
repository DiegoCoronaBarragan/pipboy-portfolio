const BASE_URL = import.meta.env.BASE_URL;

type StatProps = {
  onNavigate: (section: "INV") => void;
};

interface Skill {
  label: string;
  value: number;
}

interface StatBarProps {
  label: string;
  value: number;
}

const skills: readonly Skill[] = [
  { label: "REACT", value: 75 },
  { label: "TYPESCRIPT", value: 65 },
  { label: "RUBY ON RAILS", value: 70 },
  { label: "JAVASCRIPT", value: 65 },
  { label: "CSS / SASS", value: 75 },
  { label: "MONGODB", value: 65 },
  { label: "POSTGRESQL", value: 55 },
  { label: "GIT / GITHUB", value: 70 },
  { label: "PYTHON", value: 50 },
];

export default function Stat({ onNavigate }: StatProps) {
  return (
    <div className="stat-screen">
      <div className="stat-left">
        <div className="stat-avatar">
          <img
            alt="Diego Corona"
            className="stat-avatar-image"
            src={BASE_URL + "images/Avatar.svg"}
          />
        </div>
        <div className="stat-info">
          <p><span>SYSTEM</span> ONLINE</p>
          <p><span>LANG</span> ES / EN</p>
          <p><span>MODE</span> FULL STACK</p>
        </div>
      </div>
      <div className="stat-right">
        <div className="stat-hero">
          <p className="stat-eyebrow">PROFILE // FULL STACK DEVELOPER</p>
          <h1>DIEGO J. CORONA BARRAGÁN</h1>
          <p className="stat-headline">
            I build accessible, maintainable web applications from interface
            to database.
          </p>
          <p className="stat-summary">
            Professional experience developing and maintaining institutional
            platforms with React, TypeScript, Ruby on Rails, MongoDB, and
            PostgreSQL, focused on practical solutions for real users.
          </p>
          <div className="stat-actions">
            <button
              className="stat-action"
              onClick={() => onNavigate("INV")}
              type="button"
            >
              VIEW PROJECTS
            </button>
            <a
              className="stat-action"
              href={BASE_URL + "cv/Diego_Corona_CV.pdf"}
              rel="noopener noreferrer"
              target="_blank"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>
        <div className="stat-divider">SKILLS</div>
        <div className="stat-bars">
          {skills.map((skill, index) => (
            <div
              key={skill.label}
              className="section-content-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <StatBar {...skill} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value }: StatBarProps) {
  return (
    <div className="stat-bar">
      <span className="label">{label}</span>
      <div className="bar">
        <div className="fill" style={{ width: value + "%" }} />
      </div>
      <span className="value">{value}%</span>
    </div>
  );
}
