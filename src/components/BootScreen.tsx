import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

type BootScreenProps = {
  onFinish: () => void;
};

export default function BootScreen({ onFinish }: BootScreenProps) {
  const { content } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

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

      setMessageIndex(Math.floor(Math.random() * content.boot.messages.length));
    }, 250);

    return () => {
      clearInterval(interval);
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, [content.boot.messages.length, onFinish]);

  return (
    <div className="boot-screen">
      <h1>PORTFOLIO 3000</h1>
      <p className="boot-message">{content.boot.messages[messageIndex]}</p>
      <div
        aria-label={`${content.boot.progressLabel}: ${progress}%`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="progress-bar"
        role="progressbar"
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="boot-percent">{progress}%</p>
      <p className="boot-loading">{content.boot.loading}</p>
    </div>
  );
}
