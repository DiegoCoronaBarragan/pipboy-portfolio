import { useEffect, useRef } from "react";
import type { Section } from "../types/navigation";

interface PipboyMenuProps {
  active: Section;
  onChange: (section: Section) => void;
}

const TABS: readonly Section[] = ["STAT", "INV", "DATA", "LOG"];

export default function PipboyMenu({ active, onChange }: PipboyMenuProps) {
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const updateIndicator = () => {
      const activeTab = menu.querySelector<HTMLElement>('[aria-current="page"]');
      const menuRect = menu.getBoundingClientRect();

      if (!activeTab || menuRect.width === 0) return;

      const tabRect = activeTab.getBoundingClientRect();
      const start = ((tabRect.left - menuRect.left) / menuRect.width) * 100;
      const end = ((tabRect.right - menuRect.left) / menuRect.width) * 100;

      menu.style.setProperty("--cut-start", start + "%");
      menu.style.setProperty("--cut-end", end + "%");
    };

    updateIndicator();
    const observer = new ResizeObserver(updateIndicator);
    observer.observe(menu);

    return () => observer.disconnect();
  }, [active]);

  return (
    <nav aria-label="Portfolio sections" className="pipboy-menu" ref={menuRef}>
      {TABS.map((tab) => (
        <button
          key={tab}
          aria-current={active === tab ? "page" : undefined}
          className={"pipboy-tab " + (active === tab ? "active" : "")}
          onClick={() => onChange(tab)}
          type="button"
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
