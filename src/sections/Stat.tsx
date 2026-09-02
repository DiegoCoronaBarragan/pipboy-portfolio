const BASE_URL = import.meta.env.BASE_URL;

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

export default function Stat() {
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
        <div className="stat-info">
          <p><span>NAME</span> DIEGO J. CORONA BARRAGÁN</p>
          <p><span>ROLE</span> FULL STACK DEVELOPER</p>
          <p><span>FOCUS</span> WEB APPLICATIONS</p>
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
        <div className="stat-divider">PROFILE</div>
        <p className="stat-description">
          I'm an Intelligent Computer Engineer passionate about web development in both front-end and back-end. I'm open to different perspectives and problem-solving approaches, always seeking efficient and well-structured solutions. I have a strong interest in system improvement, optimization, and technical innovation, with a mindset focused on performance, scalability, and maintainability. I am committed to staying up-to-date with modern technologies and development tools while continuously learning and improving. My goal is to grow professionally as a full-stack developer, working collaboratively within a team, learning from experienced developers, and gradually advancing to higher levels of responsibility.
        </p>
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
