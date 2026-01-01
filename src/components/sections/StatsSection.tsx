/**
 * Stats Section Component
 * Affiche les statistiques clés de la plateforme avec animations époustouflantes
 */

'use client';

import { memo, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS_DATA } from '@/lib/constants';
import type { StatData } from '@/types';

// ============================================================================
// AnimatedCounter Component
// ============================================================================

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
}

function AnimatedCounter({ value, suffix }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Extract numeric value and format
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const isPercentage = value.includes('%');
  const isMoney = value.includes('$') || value.includes('€');

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, numericValue]);

  const formatValue = (num: number) => {
    if (isPercentage) return `${Math.round(num)}`;
    if (isMoney) return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      onViewportEnter={() => setIsVisible(true)}
    >
      <div className="font-mono text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
        {isVisible ? formatValue(count) : '0'}
        {suffix && (
          <span className="text-cyan-400/70 text-xl md:text-2xl">{suffix}</span>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================================
// LiveStat Component
// ============================================================================

interface LiveStatProps {
  stat: StatData;
}

function LiveStat({ stat }: LiveStatProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      <motion.div
        className="text-slate-400 text-sm uppercase tracking-widest"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {stat.label}
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// StatsSection Component
// ============================================================================

function StatsSectionComponent() {
  return (
    <section className="py-20 px-6 border-y border-slate-800">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {STATS_DATA.map((stat) => (
          <LiveStat key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}

export const StatsSection = memo(StatsSectionComponent);
StatsSection.displayName = 'StatsSection';
