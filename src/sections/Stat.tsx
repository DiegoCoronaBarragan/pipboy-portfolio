const BASE_URL = import.meta.env.BASE_URL;

type StatProps = {
  onNavigate: (section: "INV") => void;
};

interface SkillGroup {
  category: string;
  skills: readonly string[];
  evidence: string;
}

const skillGroups = [
  {
    category: "FRONTEND",
    skills: ["React", "TypeScript", "JavaScript", "CSS / Sass"],
    evidence:
      "Responsive, component-based interfaces for institutional platforms.",
  },
  {
    category: "BACKEND",
    skills: ["Ruby on Rails", "Moodle"],
    evidence:
      "Reporting, client-management, and online learning platform features.",
  },
  {
    category: "DATA",
    skills: ["MongoDB", "PostgreSQL"],
    evidence:
      "Application persistence, CRUD workflows, and database management.",
  },
  {
    category: "DELIVERY",
    skills: ["Git", "GitHub", "Vite", "Responsive UI"],
    evidence:
      "Version-controlled development, production builds, and web deployment.",
  },
] as const satisfies readonly SkillGroup[];

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
        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <SkillGroupCard
              key={group.category}
              {...group}
              animationDelay={`${index * 0.06}s`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type SkillGroupCardProps = SkillGroup & {
  animationDelay: string;
};

function SkillGroupCard({
  category,
  skills,
  evidence,
  animationDelay,
}: SkillGroupCardProps) {
  return (
    <article
      className="skill-group section-content-item"
      style={{ animationDelay }}
    >
      <h2>{category}</h2>
      <ul className="skill-tags" aria-label={`${category} technologies`}>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <p className="skill-evidence">
        <span>EVIDENCE</span>
        {evidence}
      </p>
    </article>
  );
}
