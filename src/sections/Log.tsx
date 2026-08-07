import { useEffect, useRef, useState } from "react";

const EMAIL = "d.coronabarragan@gmail.com";

export default function Log() {
  const [copied, setCopied] = useState(false);
  const resetCopyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetCopyTimeout.current) clearTimeout(resetCopyTimeout.current);
  }, []);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      if (resetCopyTimeout.current) clearTimeout(resetCopyTimeout.current);
      resetCopyTimeout.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Clipboard copy failed:", error);
    }
  };

  return (
    <div className="log-screen">
      <div className="log-header">USER PROFILE LOADED</div>
      <div className="log-info">
        <p><span>NAME</span> Diego Jeancarlo Corona Barragán</p>
        <p><span>ROLE</span> Full Stack Developer</p>
        <p><span>LOCATION</span> Colima, Mexico</p>
        <p>
          <span>EMAIL</span> {EMAIL}
          <button className="copy-btn" onClick={handleCopy} type="button">
            {copied ? "COPIED" : "COPY"}
          </button>
        </p>
        <p>
          <span>GITHUB</span>
          <a href="https://github.com/DiegoCoronaBarragan" rel="noopener noreferrer" target="_blank">
            github.com/DiegoCoronaBarragan
          </a>
        </p>
        <p>
          <span>LINKEDIN</span>
          <a href="https://www.linkedin.com/in/itsdiegocorona/" rel="noopener noreferrer" target="_blank">
            linkedin.com/in/itsdiegocorona
          </a>
        </p>
      </div>
      <div className="log-actions">
        <a className="log-link" href={import.meta.env.BASE_URL + "cv/Diego_Corona_CV.pdf"} rel="noopener noreferrer" target="_blank">
          DOWNLOAD CV
        </a>
      </div>
    </div>
  );
}
