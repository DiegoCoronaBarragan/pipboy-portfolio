import { useState } from "react";
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

function App() {
  const [booted, setBooted] = useState<boolean>(false);
  const [section, setSection] = useState<Section>("STAT");

  const renderSection = () => {
    switch (section) {
      case "STAT":
        return <Stat />;
      case "INV":
        return <Inv />;
      case "DATA":
        return <Data />;
      case "LOG":
        return <Log />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <PipBoyFrame>
        {!booted ? (
          <BootScreen onFinish={() => setBooted(true)} />
        ) : (
          <div className="pipboy-layout">
            <PipboyMenu
              active={section}
              onChange={setSection}
            />
            <div className="pipboy-content">
              {renderSection()}
            </div>
          </div>
        )}
      </PipBoyFrame>
    </div>
  );
}

export default App;

