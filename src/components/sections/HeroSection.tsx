/**
 * Hero Section Component
 * Section d'accroche principale avec animations époustouflantes
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { AnimatedGrid, ParticleField, GradientOrb } from '@/components/background';
import { Button, Badge, GradientText, StatusDot } from '@/components/ui';
import { ArrowRightIcon, PlayIcon } from '@/components/icons';

// ============================================================================
// HeroBadge Component
// ============================================================================

function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Badge className="mb-8">
        <StatusDot status="active" />
        <span className="text-sm text-slate-400">Propulsé par Grok AI</span>
      </Badge>
    </motion.div>
  );
}

// ============================================================================
// HeroTitle Component
// ============================================================================

function HeroTitle() {
  return (
    <motion.h1
      className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      Le Trading
      <br />
      <motion.span
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(45deg, #22d3ee, #34d399, #22d3ee)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}
      >
        Automatisé
      </motion.span>
      <br />
      Nouvelle Génération
    </motion.h1>
  );
}

// ============================================================================
// HeroDescription Component
// ============================================================================

function HeroDescription() {
  return (
    <motion.p
      className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      Laissez l'intelligence artificielle de Grok analyser les marchés 24/7 et
      exécuter des trades optimaux pour vous.<br />
      <motion.span
        className="text-cyan-400 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        Comme recommandé par DefendIntelligence dans sa vidéo !
      </motion.span>
    </motion.p>
  );
}

// ============================================================================
// HeroCTA Component
// ============================================================================

function HeroCTA() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          variant="primary"
          size="lg"
          className="group relative overflow-hidden hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all duration-300"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">Démarrer Gratuitement</span>
          <motion.div
            className="relative z-10"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </motion.div>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          variant="secondary"
          size="lg"
          className="group relative overflow-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-500/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="relative z-10 mr-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <PlayIcon className="w-5 h-5" />
          </motion.div>
          <span className="relative z-10">Voir la Démo</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// HeroSection Component
// ============================================================================

function HeroSectionComponent() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20">
      {/* Background Effects */}
      <AnimatedGrid />
      <ParticleField />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <HeroBadge />
        <HeroTitle />
        <HeroDescription />
        <HeroCTA />
      </div>

      {/* Gradient Orb Effect */}
      <GradientOrb />
    </section>
  );
}

export const HeroSection = memo(HeroSectionComponent);
HeroSection.displayName = 'HeroSection';
