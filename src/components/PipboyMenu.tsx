import type { Section } from "../types/navigation";

interface PipboyMenuProps {
  active: Section;
  onChange: (section: Section) => void;
}

interface TabDefinition {
  section: Section;
  label: string;
}

const TABS = [
  { section: "STAT", label: "ABOUT" },
  { section: "INV", label: "PROJECTS" },
  { section: "DATA", label: "EXPERIENCE" },
  { section: "LOG", label: "CONTACT" },
] as const satisfies readonly TabDefinition[];

export default function PipboyMenu({ active, onChange }: PipboyMenuProps) {
  return (
    <nav aria-label="Primary portfolio navigation" className="pipboy-menu">
      {TABS.map(({ section, label }) => (
        <button
          key={section}
          aria-current={active === section ? "page" : undefined}
          aria-label={`${label} (${section})`}
          className={"pipboy-tab " + (active === section ? "active" : "")}
          onClick={() => onChange(section)}
          type="button"
        >
          <span className="pipboy-tab-code">{section}</span>
          <span className="pipboy-tab-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
