import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const EMAIL = "d.coronabarragan@gmail.com";

export default function Log() {
  const { content } = useLanguage();
  const copy = content.contact;
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
      <div className="log-header">{copy.header}</div>
      <div className="log-info">
        <p><span>{copy.name}</span> Diego Jeancarlo Corona Barragán</p>
        <p><span>{copy.role}</span> {copy.roleValue}</p>
        <p><span>{copy.location}</span> {copy.locationValue}</p>
        <p>
          <span>{copy.email}</span> {EMAIL}
          <button className="copy-btn" onClick={handleCopy} type="button">
            {copied ? copy.copied : copy.copy}
          </button>
        </p>
        <p>
          <span>GITHUB</span>
          <a href="https://github.com/DiegoCoronaBarragan" rel="noopener noreferrer" target="_blank">github.com/DiegoCoronaBarragan</a>
        </p>
        <p>
          <span>LINKEDIN</span>
          <a href="https://www.linkedin.com/in/itsdiegocorona/" rel="noopener noreferrer" target="_blank">linkedin.com/in/itsdiegocorona</a>
        </p>
      </div>
      <div className="log-actions">
        <a className="log-link" href={import.meta.env.BASE_URL + "cv/Diego_Corona_CV.pdf"} rel="noopener noreferrer" target="_blank">
          {copy.downloadCv}
        </a>
      </div>
    </div>
  );
}
