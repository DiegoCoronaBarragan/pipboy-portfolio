import { useEffect, useRef } from "react";

const TABS = ["STAT", "INV", "DATA", "LOG"];

export default function PipboyMenu({ active, onChange }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const activeTab = menuRef.current.querySelector(".active");
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
      {TABS.map(tab => (
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

