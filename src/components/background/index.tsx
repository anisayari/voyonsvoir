/**
 * Composants de fond animés pour la landing page
 * Séparés pour une meilleure performance et réutilisabilité
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION } from '@/lib/constants';

// ============================================================================
// ParticleField - Particules flottantes animées avec Framer Motion
// ============================================================================

function ParticleFieldComponent() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: ANIMATION.particleCount }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(i) * 10, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + (i * 0.1) % 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export const ParticleField = memo(ParticleFieldComponent);
ParticleField.displayName = 'ParticleField';

// ============================================================================
// AnimatedGrid - Grille de fond avec effet de fade animé
// ============================================================================

function AnimatedGridComponent() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {/* Animated Grid lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Radial fade overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgb(2, 6, 23) 70%)',
        }}
      />
    </div>
  );
}

export const AnimatedGrid = memo(AnimatedGridComponent);
AnimatedGrid.displayName = 'AnimatedGrid';

// ============================================================================
// GradientOrb - Orbe lumineux animé pour l'effet héro
// ============================================================================

interface GradientOrbProps {
  className?: string;
}

function GradientOrbComponent({ className }: GradientOrbProps) {
  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 pointer-events-none ${className ?? ''}`}
      style={{
        background:
          'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(52, 211, 153, 0.05) 40%, transparent 70%)',
        filter: 'blur(60px)',
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export const GradientOrb = memo(GradientOrbComponent);
GradientOrb.displayName = 'GradientOrb';

// ============================================================================
// SectionGlow - Effet de glow pour les sections CTA
// ============================================================================

interface SectionGlowProps {
  position?: 'top' | 'center';
}

function SectionGlowComponent({ position = 'top' }: SectionGlowProps) {
  const positionStyle = position === 'top' ? 'ellipse at top' : 'ellipse at center';

  return (
    <div
      className="absolute inset-0 opacity-30"
      style={{
        background: `radial-gradient(${positionStyle}, rgba(34, 211, 238, 0.2) 0%, transparent 60%)`,
      }}
    />
  );
}

export const SectionGlow = memo(SectionGlowComponent);
SectionGlow.displayName = 'SectionGlow';
