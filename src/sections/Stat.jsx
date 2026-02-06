export default function Stat() {
  return (
    <div className="stat-screen">
      {/* COLUMNA IZQUIERDA */}
      <div className="stat-left">
        <div className="stat-avatar">
          <div className="avatar-placeholder">
            USER
          </div>
        </div>

        <div className="stat-info">
          <p><span>SYSTEM</span> ONLINE</p>
          <p><span>LANG</span> ES / EN</p>
          <p><span>MODE</span> FULL STACK</p>
        </div>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="stat-right">
        <div className="stat-info">
          <p><span>NAME</span> DIEGO J. CORONA BARRAGÁN</p>
          <p><span>ROLE</span> FULL STACK DEVELOPER</p>
          <p><span>FOCUS</span> WEB APPLICATIONS</p>
        </div>

        <div className="stat-divider">SKILLS</div>

        <div className="stat-bars">
          <StatBar label="REACT" value={75} />
          <StatBar label="RUBY ON RAILS" value={70} />
          <StatBar label="JAVASCRIPT" value={65} />
          <StatBar label="CSS / SASS" value={75} />
          <StatBar label="MONGODB" value={65} />
          <StatBar label="POSTGRESQL" value={55} />
          <StatBar label="GIT / GITHUB" value={70} />
          <StatBar label="PYTHON" value={50} />
        </div>

        <div className="stat-divider">PROFILE</div>

        <p className="stat-description">
          I'm an Intelligent Computer Engineer passionate about web development 
          in both front-end and back-end. I'm open to different perspectives and 
          problem-solving approaches, always seeking efficient and well-structured 
          solutions. I have a strong interest in system improvement, optimization, 
          and technical innovation, with a mindset focused on performance, scalability, 
          and maintainability. I am committed to staying up-to-date with modern technologies 
          and development tools while continuously learning and improving. My goal is to 
          grow professionally as a full-stack developer, working collaboratively within 
          a team, learning from experienced developers, and gradually advancing to higher 
          levels of responsibility.
        </p>
      </div>
    </div>
  );
}

function StatBar({ label, value }) {
  return (
    <div className="stat-bar">
      <span className="label">{label}</span>
      <div className="bar">
        <div className="fill" style={{ width: `${value}%` }} />
      </div>
      <span className="value">{value}%</span>
    </div>
  );
}

