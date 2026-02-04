"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./OmEasterEgg.module.css";

export default function OmEasterEgg() {
  const [showOverlay, setShowOverlay] = useState(false);
  const clickCountRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClick = () => {
      clickCountRef.current += 1;

      if (clickCountRef.current === 1) {
        // Start timer for 13 clicks
        timeoutRef.current = window.setTimeout(() => {
          clickCountRef.current = 0;
        }, 5000); // 5s window for 13 clicks
      } else if (clickCountRef.current === 13) {
        setShowOverlay(true);
        clickCountRef.current = 0;

        // Clear any existing timeout
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }

        // Auto-dismiss after 5 seconds
        timeoutRef.current = window.setTimeout(() => {
          setShowOverlay(false);
        }, 5000);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (showOverlay && event.key === "Escape") {
        setShowOverlay(false);
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
      }
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [showOverlay]);

  if (!showOverlay) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-label="OM easter egg"
      aria-live="polite"
    >
      <div className={styles.content}>
        <div className={styles.emojiContainer}>
          <img src="/OM.webp" alt="OM Logo" className={styles.emoji} />
          <img src="/OM.webp" alt="OM Logo" className={styles.emoji} />
          <img src="/OM.webp" alt="OM Logo" className={styles.emoji} />
          <img src="/OM.webp" alt="OM Logo" className={styles.emoji} />
          <img src="/OM.webp" alt="OM Logo" className={styles.emoji} />
          <img src="/OM.webp" alt="OM Logo" className={styles.emoji} />
          <img src="/OM.webp" alt="OM Logo" className={styles.emoji} />
        </div>
        <h1 className={styles.title}>OM Time! ⚽</h1>
        <div className={styles.trophy}>
          <span className={styles.trophyDrip} aria-hidden="true">
            🏆
          </span>
          <span className={styles.trophyDrip} aria-hidden="true">
            🏆
          </span>
          <span className={styles.trophyDrip} aria-hidden="true">
            🏆
          </span>
        </div>
      </div>
    </div>
  );
}
