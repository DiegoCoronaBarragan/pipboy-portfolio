import { useState } from "react";

export default function Log() {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(
        "d.coronabarragan@gmail.com"
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Clipboard copy failed:", error);
    }
  };

  return (
    <div className="log-screen">
      <div className="log-header">USER PROFILE LOADED</div>

      <div className="log-info">
        <p>
          <span>NAME</span> Diego Jeancarlo Corona Barragán
        </p>

        <p>
          <span>ROLE</span> Full Stack Developer
        </p>

        <p>
          <span>LOCATION</span> Colima, Mexico
        </p>

        <p>
          <span>EMAIL</span> d.coronabarragan@gmail.com
          <button
            className="copy-btn"
            onClick={handleCopy}
          >
            {copied ? "COPIED" : "COPY"}
          </button>
        </p>

        <p>
          <span>GITHUB</span>
          <a
            href="https://github.com/DiegoCoronaBarragan"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/DiegoCoronaBarragan
          </a>
        </p>

        <p>
          <span>LINKEDIN</span>
          <a
            href="https://www.linkedin.com/in/itsdiegocorona/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/itsdiegocorona
          </a>
        </p>
      </div>

      <div className="log-actions">
        <a
          href="/cv/Diego_Corona_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="log-link"
        >
          DOWNLOAD CV
        </a>
      </div>
    </div>
  );
}

