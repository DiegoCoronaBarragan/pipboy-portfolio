import { useEffect, useRef } from "react";
import type { Section } from "../types/navigation";

interface PipboyMenuProps {
  active: Section;
  onChange: (section: Section) => void;
}

const TABS: Section[] = ["STAT", "INV", "DATA", "LOG"];

export default function PipboyMenu({ active, onChange }: PipboyMenuProps) {
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    const activeTab = menuRef.current.querySelector(".active") as HTMLElement | null;
    if (!activeTab) return;

    const menuRect = menuRef.current.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    const start = ((tabRect.left - menuRect.left) / menuRect.width) * 100;
    const end = ((tabRect.right - menuRect.left) / menuRect.width) * 100;

    menuRef.current.style.setProperty("--cut-start", `${start}%`);
    menuRef.current.style.setProperty("--cut-end", `${end}%`);
  }, [active]);

  return (
    <nav className="pipboy-menu" ref={menuRef}>
      {TABS.map((tab) => (
        <button
          key={tab}
          className={`pipboy-tab ${active === tab ? "active" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}

