import { useCallback, useState, type ComponentType } from "react";
import PipBoyFrame from "./components/PipBoyFrame";
import BootScreen from "./components/BootScreen";
import PipboyMenu from "./components/PipboyMenu";
import Stat from "./sections/Stat";
import Inv from "./sections/Inv";
import Data from "./sections/Data";
import Log from "./sections/Log";
import type { Section } from "./types/navigation";
import "./styles/variables.css";
import "./styles/pipboy.css";
import "./styles/animations.css";

interface SectionComponentProps {
  onNavigate: (section: Section) => void;
}

const SECTION_COMPONENTS: Record<Section, ComponentType<SectionComponentProps>> = {
  STAT: Stat,
  INV: Inv,
  DATA: Data,
  LOG: Log,
};

function App() {
  const [booted, setBooted] = useState(false);
  const [section, setSection] = useState<Section>("STAT");
  const handleBootFinish = useCallback(() => setBooted(true), []);
  const handleNavigate = useCallback((nextSection: Section) => {
    setSection(nextSection);
  }, []);
  const CurrentSection = SECTION_COMPONENTS[section];

  return (
    <div className="app">
      <PipBoyFrame>
        {!booted ? (
          <BootScreen onFinish={handleBootFinish} />
        ) : (
          <div className="pipboy-layout">
            <PipboyMenu active={section} onChange={setSection} />
            <main className="pipboy-content">
              <div key={section} className="section-transition">
                <CurrentSection onNavigate={handleNavigate} />
              </div>
            </main>
          </div>
        )}
      </PipBoyFrame>
    </div>
  );
}

export default App;
