"use client";

import { useState, useCallback } from "react";
import styles from "./page.module.css";

const EFFECTS = ["matrix", "glitch", "portal", "invert", "static"] as const;
const MYSTERIOUS_MESSAGES = [
  "REALITY.EXE HAS STOPPED WORKING",
  "YOU SHOULDN'T HAVE CLICKED THAT",
  "WELCOME TO THE VOID",
  "ERROR 404: SANITY NOT FOUND",
  "THE SIMULATION IS LEAKING",
  "INITIATING PROTOCOL SIGMA",
  "ACCESSING FORBIDDEN MEMORY",
  "CONSCIOUSNESS FRAGMENTING...",
  "DO YOU FEEL IT TOO?",
  "THERE IS NO GOING BACK",
] as const;
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________";
const BUTTON_TEXT = "Clique";

const THRESHOLDS = {
  WARNING: 5,
  CRITICAL: 15,
  CHAOS: 30,
} as const;

const TIMINGS = {
  EFFECT_DURATION: 3000,
  GLITCH_INTERVAL: 100,
  GLITCH_ITERATIONS: 10,
  CHAOS_INTERVAL: 300,
  CHAOS_CYCLES: 10,
} as const;

type Effect = typeof EFFECTS[number];

export default function Home() {
  const [activeEffect, setActiveEffect] = useState<Effect | null>(null);
  const [glitchText, setGlitchText] = useState(BUTTON_TEXT);
  const [clickCount, setClickCount] = useState(0);

  const glitchify = useCallback((text: string) => {
    return text
      .split("")
      .map((char) =>
        Math.random() > 0.7
          ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          : char
      )
      .join("");
  }, []);

  const triggerGlitchText = useCallback(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setGlitchText(glitchify(BUTTON_TEXT));
      iterations++;
      if (iterations > TIMINGS.GLITCH_ITERATIONS) {
        clearInterval(interval);
        setGlitchText(BUTTON_TEXT);
      }
    }, TIMINGS.GLITCH_INTERVAL);
  }, [glitchify]);

  const triggerChaosMode = useCallback(() => {
    let effectIndex = 0;
    const interval = setInterval(() => {
      setActiveEffect(EFFECTS[effectIndex % EFFECTS.length]);
      effectIndex++;
      if (effectIndex >= TIMINGS.CHAOS_CYCLES) {
        clearInterval(interval);
        setActiveEffect(null);
      }
    }, TIMINGS.CHAOS_INTERVAL);
  }, []);

  const triggerRandomEffect = useCallback(() => {
    const randomEffect = EFFECTS[Math.floor(Math.random() * EFFECTS.length)];
    setActiveEffect(randomEffect);
    setTimeout(() => setActiveEffect(null), TIMINGS.EFFECT_DURATION);
  }, []);

  const triggerSurprise = useCallback(() => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= THRESHOLDS.CHAOS) {
      triggerChaosMode();
    } else {
      triggerRandomEffect();
    }

    triggerGlitchText();
  }, [clickCount, triggerChaosMode, triggerRandomEffect, triggerGlitchText]);

  const getRandomMessage = useCallback(
    () => MYSTERIOUS_MESSAGES[Math.floor(Math.random() * MYSTERIOUS_MESSAGES.length)],
    []
  );

  return (
    <div className={`${styles.page} ${activeEffect ? styles[activeEffect] : ""}`}>
      <div className={styles.logo}>
        <div className={styles.logoText}>VOYONSVOIR</div>
        <div className={styles.logoSubtext}>REALITY DISTORTION EXPERIMENT</div>
      </div>

      <a className={`${styles.contributorsLink} ${styles.promosLink}`} href="/promos">
        Promotions
      </a>

      <a className={styles.contributorsLink} href="/contributors">
        Contributeurs
      </a>

      {activeEffect === "matrix" && (
        <div className={styles.matrixRain}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={styles.matrixColumn} style={{ left: `${i * 5}%` }}>
              {getRandomMessage()}
            </div>
          ))}
        </div>
      )}

      {activeEffect === "glitch" && (
        <div className={styles.glitchOverlay}>
          <div className={styles.glitchText}>{getRandomMessage()}</div>
        </div>
      )}

      {activeEffect === "portal" && (
        <div className={styles.portalContainer}>
          <div className={styles.portal}></div>
        </div>
      )}

      {activeEffect === "static" && (
        <div className={styles.staticNoise}></div>
      )}

      <main>
        <button
          className={`${styles.button} ${activeEffect ? styles.buttonActive : ""}`}
          onClick={triggerSurprise}
        >
          {glitchText}
        </button>

        {clickCount > 0 && (
          <div className={styles.statsPanel}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>ANOMALIES</span>
              <span className={styles.statValue}>{clickCount.toString().padStart(3, '0')}</span>
            </div>
            {clickCount > THRESHOLDS.WARNING && (
              <div className={styles.warningMessage}>
                <span className={styles.warningIcon}>⚠</span>
                SYSTEM INSTABILITY DETECTED
              </div>
            )}
            {clickCount > THRESHOLDS.CRITICAL && clickCount < THRESHOLDS.CHAOS && (
              <div className={styles.criticalMessage}>
                <span className={styles.criticalIcon}>⛔</span>
                REALITY BREACH IMMINENT
              </div>
            )}
            {clickCount >= THRESHOLDS.CHAOS && (
              <div className={styles.chaosMessage}>
                <span className={styles.chaosIcon}>💀</span>
                CHAOS MODE ACTIVATED
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
