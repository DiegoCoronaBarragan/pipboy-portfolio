import { useEffect, useState } from "react";

type BootScreenProps = {
  onFinish: () => void;
};

const BOOT_MESSAGES = [
  "Initializing system...",
  "Loading core modules...",
  "Mounting data drive...",
  "Calibrating interface...",
  "Starting Pip-Boy OS...",
] as const;

export default function BootScreen({ onFinish }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<(typeof BOOT_MESSAGES)[number]>(
    BOOT_MESSAGES[0],
  );

  useEffect(() => {
    let currentProgress = 0;
    let finishTimeout: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      currentProgress = Math.min(
        100,
        currentProgress + Math.floor(Math.random() * 10) + 6,
      );
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        finishTimeout = setTimeout(onFinish, 200);
        return;
      }

      setMessage(
        BOOT_MESSAGES[Math.floor(Math.random() * BOOT_MESSAGES.length)]!,
      );
    }, 250);

    return () => {
      clearInterval(interval);
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  return (
    <div className="boot-screen">
      <h1>PORTFOLIO 3000</h1>
      <p className="boot-message">{message}</p>
      <div
        aria-label={"Loading portfolio: " + progress + "%"}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="progress-bar"
        role="progressbar"
      >
        <div className="progress-fill" style={{ width: progress + "%" }} />
      </div>
      <p className="boot-percent">{progress}%</p>
      <p className="boot-loading">Loading portfolio...</p>
    </div>
  );
}
