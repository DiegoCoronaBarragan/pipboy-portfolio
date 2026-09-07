import { useLanguage } from "../i18n/LanguageContext";
import type { Section } from "../types/navigation";

interface PipboyMenuProps {
  active: Section;
  onChange: (section: Section) => void;
}

const SECTIONS: readonly Section[] = ["STAT", "INV", "DATA", "LOG"];

export default function PipboyMenu({ active, onChange }: PipboyMenuProps) {
  const { language, setLanguage, content } = useLanguage();

  return (
    <div className="pipboy-navigation">
      <nav aria-label={content.navigation.ariaLabel} className="pipboy-menu">
        {SECTIONS.map((section) => {
          const label = content.navigation.tabs[section];

          return (
            <button
              key={section}
              aria-current={active === section ? "page" : undefined}
              aria-label={`${label} (${section})`}
              className={`pipboy-tab ${active === section ? "active" : ""}`}
              onClick={() => onChange(section)}
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
