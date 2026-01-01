/**
 * Features Section Component
 * Présente les fonctionnalités clés de la plateforme avec animations époustouflantes
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeader, Card, IconBox, GradientText } from '@/components/ui';
import { Icon } from '@/components/icons';
import { FEATURES_DATA } from '@/lib/constants';
import type { FeatureData } from '@/types';

// ============================================================================
// FeatureCard Component
// ============================================================================

interface FeatureCardProps {
  feature: FeatureData;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <Card hover className="group p-6 md:p-8 h-full">
        {/* Enhanced hover overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          whileHover={{
            background: "linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)"
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            className="mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <IconBox>
              <Icon name={feature.iconName} />
            </IconBox>
          </motion.div>
          <motion.h3
            className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {feature.title}
          </motion.h3>
          <p className="text-slate-400 leading-relaxed">{feature.description}</p>
        </div>
      </Card>
    </motion.div>
  );
}

// ============================================================================
// FeaturesSection Component
// ============================================================================

function FeaturesSectionComponent() {
  return (
    <Section id="features">
      <SectionHeader
        title={
          <>
            Pourquoi <GradientText>GrokTrade</GradientText> ?
          </>
        }
        subtitle="Une technologie de pointe au service de votre patrimoine"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES_DATA.map((feature, index) => (
          <FeatureCard key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </Section>
  );
}

export const FeaturesSection = memo(FeaturesSectionComponent);
FeaturesSection.displayName = 'FeaturesSection';
