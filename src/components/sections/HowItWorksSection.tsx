/**
 * How It Works Section Component
 * Explique le processus en 3 étapes
 */

import { memo } from 'react';
import { Section, SectionHeader, GradientText } from '@/components/ui';
import { STEPS_DATA } from '@/lib/constants';
import type { StepData } from '@/types';

// ============================================================================
// StepNumber Component
// ============================================================================

interface StepNumberProps {
  number: string;
}

function StepNumber({ number }: StepNumberProps) {
  return (
    <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-cyan-500/50 flex items-center justify-center font-mono text-2xl font-bold text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
      {number}
    </div>
  );
}

// ============================================================================
// Step Component
// ============================================================================

interface StepProps {
  step: StepData;
}

function Step({ step }: StepProps) {
  return (
    <div className="flex gap-6 items-start">
      <StepNumber number={step.number} />
      <div>
        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
        <p className="text-slate-400">{step.description}</p>
      </div>
    </div>
  );
}

// ============================================================================
// HowItWorksSection Component
// ============================================================================

function HowItWorksSectionComponent() {
  return (
    <Section
      id="how-it-works"
      className="bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950"
    >
      <SectionHeader
        title={
          <>
            Comment ça <GradientText variant="amber">Marche</GradientText> ?
          </>
        }
        subtitle="Trois étapes simples pour commencer à générer des revenus passifs"
      />

      <div className="grid md:grid-cols-3 gap-12 md:gap-8">
        {STEPS_DATA.map((step) => (
          <Step key={step.number} step={step} />
        ))}
      </div>
    </Section>
  );
}

export const HowItWorksSection = memo(HowItWorksSectionComponent);
HowItWorksSection.displayName = 'HowItWorksSection';
