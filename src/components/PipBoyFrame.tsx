import type { ReactNode } from "react";

interface PipBoyFrameProps {
  children: ReactNode;
}

export default function PipBoyFrame({ children }: PipBoyFrameProps) {
  return (
    <div className="pipboy-frame flicker">
      <div className="pipboy-screen distort">
        {children}
      </div>
    </div>
  );
}

