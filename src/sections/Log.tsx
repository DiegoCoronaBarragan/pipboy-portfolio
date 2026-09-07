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
      <header className="log-hero">
        <div className="log-hero-topline">
          <p className="log-kicker">{copy.kicker}</p>
          <span className="log-status">{copy.status}</span>
        </div>
        <h1>{copy.title}</h1>
        <p className="log-intro">{copy.intro}</p>
      </header>

      <div className="log-contact-grid">
        <section className="log-profile" aria-labelledby="contact-profile-title">
          <h2 className="log-header" id="contact-profile-title">{copy.header}</h2>
          <div className="log-info">
            <p><span>{copy.name}</span> Diego Jeancarlo Corona Barragán</p>
            <p><span>{copy.role}</span> {copy.roleValue}</p>
            <p><span>{copy.location}</span> {copy.locationValue}</p>
            <p className="log-email-row">
              <span>{copy.email}</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <button className="copy-btn" onClick={handleCopy} type="button">
                {copied ? copy.copied : copy.copy}
              </button>
              <span className="copy-feedback" aria-live="polite" role="status">
                {copied ? copy.copyConfirmation : ""}
              </span>
            </p>
          </div>
        </section>

        <nav className="log-actions" aria-label={copy.actionsLabel}>
          <a
            className="log-link log-link-primary"
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(copy.emailSubject)}`}
          >
            {copy.sendEmail}
          </a>
          <a
            aria-label={`${copy.viewLinkedIn} (${content.accessibility.opensNewTab})`}
            className="log-link"
            href="https://www.linkedin.com/in/itsdiegocorona/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {copy.viewLinkedIn}
          </a>
          <a
            aria-label={`${copy.viewGithub} (${content.accessibility.opensNewTab})`}
            className="log-link"
            href="https://github.com/DiegoCoronaBarragan"
            rel="noopener noreferrer"
            target="_blank"
          >
            {copy.viewGithub}
          </a>
          <a
            aria-label={`${copy.downloadCv} (${content.accessibility.opensNewTab})`}
            className="log-link"
            href={import.meta.env.BASE_URL + "cv/Diego_Corona_CV.pdf"}
            rel="noopener noreferrer"
            target="_blank"
          >
            {copy.downloadCv}
          </a>
        </nav>
      </div>
    </div>
  );
}
