'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './BikiniEasterEgg.module.css';

const TARGET_SEQUENCE = 'bikini';

export default function BikiniEasterEgg() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [keySequence, setKeySequence] = useState('');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Handle ESC key to dismiss overlay
      if (showOverlay && event.key === 'Escape') {
        setShowOverlay(false);
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
        return;
      }
      
      // Ignore if user is typing in an input field or modifier keys are pressed
      const target = event.target as HTMLElement;
      const isInputField = target.tagName === 'INPUT' || 
                          target.tagName === 'TEXTAREA' || 
                          target.isContentEditable;
      const hasModifier = event.ctrlKey || event.metaKey || event.altKey;
      
      if (isInputField || hasModifier) {
        return;
      }
      
      const key = event.key.toLowerCase();
      
      // Only track letter keys
      if (key.length === 1 && key >= 'a' && key <= 'z') {
        setKeySequence((prev) => {
          const newSequence = (prev + key).slice(-TARGET_SEQUENCE.length);
          
          if (newSequence === TARGET_SEQUENCE) {
            setShowOverlay(true);
            
            // Clear any existing timeout
            if (timeoutRef.current) {
              window.clearTimeout(timeoutRef.current);
            }
            
            // Auto-dismiss after 5 seconds
            timeoutRef.current = window.setTimeout(() => {
              setShowOverlay(false);
            }, 5000);
            
            return '';
          }
          
          return newSequence;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      // Clean up timeout on unmount
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
      aria-label="Bikini mode easter egg"
      aria-live="polite"
    >
      <div className={styles.content}>
        <div className={styles.emojiContainer}>
          <span className={styles.emoji} aria-hidden="true">👙</span>
          <span className={styles.emoji} aria-hidden="true">🏖️</span>
          <span className={styles.emoji} aria-hidden="true">👙</span>
          <span className={styles.emoji} aria-hidden="true">☀️</span>
          <span className={styles.emoji} aria-hidden="true">👙</span>
          <span className={styles.emoji} aria-hidden="true">🌊</span>
          <span className={styles.emoji} aria-hidden="true">👙</span>
        </div>
        <h1 className={styles.title}>PUT ME IN BIKINI NOW ! 👙</h1>
        <div className={styles.waves}>
          <span className={styles.wave} aria-hidden="true">🌊</span>
          <span className={styles.wave} aria-hidden="true">🌊</span>
          <span className={styles.wave} aria-hidden="true">🌊</span>
        </div>
      </div>
    </div>
  );
}
