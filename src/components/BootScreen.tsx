import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

type BootScreenProps = {
  onFinish: () => void;
};

const STEP_DURATION = 500;
const EXIT_DURATION = 500;

export default function BootScreen({ onFinish }: BootScreenProps) {
  const { content } = useLanguage();
  const steps = content.boot.messages;
  const [completedSteps, setCompletedSteps] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishedRef = useRef(false);

  const finishBoot = useCallback(
    (animate: boolean) => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      if (intervalRef.current) clearInterval(intervalRef.current);

      if (!animate) {
        onFinish();
        return;
      }

      setCompletedSteps(steps.length);
      setIsExiting(true);
      finishTimeoutRef.current = setTimeout(onFinish, EXIT_DURATION);
    },
    [onFinish, steps.length],
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      finishBoot(false);
      return;
    }

    let currentStep = 0;
    const handleSkipKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== "Escape") return;
      event.preventDefault();
      finishBoot(true);
    };

    window.addEventListener("keydown", handleSkipKey);
    intervalRef.current = setInterval(() => {
      currentStep += 1;
      setCompletedSteps(currentStep);

      if (currentStep >= steps.length) finishBoot(true);
    }, STEP_DURATION);

    return () => {
      window.removeEventListener("keydown", handleSkipKey);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    };
  }, [finishBoot, steps.length]);

  const progress = Math.round((completedSteps / steps.length) * 100);
  const activeStep = Math.min(completedSteps, steps.length - 1);

  return (
    <div className={`boot-screen ${isExiting ? "boot-exit" : ""}`}>
      <div className="boot-console">
        <header className="boot-brand">
          <div>
            <p>{content.boot.protocol}</p>
            <h1>PORTFOLIO 3000</h1>
          </div>
          <span>{content.boot.version}</span>
        </header>

        <ol className="boot-steps" aria-hidden="true">
          {steps.map((step, index) => {
            const state = index < completedSteps
              ? "complete"
              : index === activeStep
                ? "current"
                : "pending";

            return (
              <li className={`boot-step ${state}`} key={step}>
                <span className="boot-step-code">
                  {state === "complete" ? "[OK]" : state === "current" ? "[>>]" : "[--]"}
                </span>
                <span>{step}</span>
              </li>
            );
          })}
        </ol>

        <span className="sr-only" aria-live="polite">
          {steps[activeStep]}
        </span>

        <div className="boot-progress-row">
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
          <span className="boot-percent">{String(progress).padStart(3, "0")}%</span>
        </div>

        <footer className="boot-footer">
          <span>{content.boot.skipHint}</span>
          <button className="boot-skip" onClick={() => finishBoot(true)} type="button">
            {content.boot.skip}
          </button>
        </footer>
      </div>
    </div>
  );
}
