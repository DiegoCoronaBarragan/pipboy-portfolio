import { useRef, type KeyboardEvent } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import type { Section } from "../types/navigation";

interface PipboyMenuProps {
  active: Section;
  onChange: (section: Section) => void;
}

const SECTIONS: readonly Section[] = ["STAT", "INV", "DATA", "LOG"];

export default function PipboyMenu({ active, onChange }: PipboyMenuProps) {
  const { language, setLanguage, content } = useLanguage();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % SECTIONS.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + SECTIONS.length) % SECTIONS.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = SECTIONS.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextSection = SECTIONS[nextIndex]!;
    onChange(nextSection);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="pipboy-navigation">
      <nav aria-label={content.navigation.ariaLabel} className="pipboy-menu">
        {SECTIONS.map((section, index) => {
          const label = content.navigation.tabs[section];

          return (
            <button
              key={section}
              aria-current={active === section ? "page" : undefined}
              aria-controls="portfolio-content"
              aria-label={`${label} (${section})`}
              className={`pipboy-tab ${active === section ? "active" : ""}`}
              onClick={() => onChange(section)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(element) => { tabRefs.current[index] = element; }}
              type="button"
            >
              <span className="pipboy-tab-code">{section}</span>
              <span className="pipboy-tab-label">{label}</span>
            </button>
          );
        })}
      </nav>

      <div
        className="language-switcher"
        aria-label={content.navigation.languageLabel}
        role="group"
      >
        {(["en", "es"] as const).map((option) => (
          <button
            key={option}
            aria-label={option === "en" ? "English" : "Español"}
            aria-pressed={language === option}
            className={language === option ? "active" : ""}
            onClick={() => setLanguage(option)}
            type="button"
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
