import { useEffect, useState } from "react";

export default function BootScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing system...");

  useEffect(() => {
    const messages = [
      "Initializing system...",
      "Loading core modules...",
      "Mounting data drive...",
      "Calibrating interface...",
      "Starting Pip-Boy OS..."
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 10) + 6;

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 200);
          return 100;
        }

        setMessage(messages[Math.floor(Math.random() * messages.length)]);
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="boot-screen">
      <h1>PORTFOLIO 3000</h1>
      <p className="boot-message">{message}</p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="boot-percent">{progress}%</p>
      <p className="boot-loading">Loading portfolio...</p>
    </div>
  );
}

