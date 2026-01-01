/**
 * Pricing Section Component
 * Présente les différents plans tarifaires
 */

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { Section, SectionHeader, Button, GradientText } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { PRICING_PLANS } from '@/lib/constants';
import type { PricingPlan } from '@/types';

// ============================================================================
// PopularBadge Component
// ============================================================================

function PopularBadge() {
  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-400 text-slate-950 text-sm font-bold rounded-full">
      POPULAIRE
    </div>
  );
}

// ============================================================================
// PricingFeatureList Component
// ============================================================================

interface PricingFeatureListProps {
  features: readonly string[];
}

function PricingFeatureList({ features }: PricingFeatureListProps) {
  return (
    <ul className="space-y-4 mb-8">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-3">
          <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-slate-400">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

// ============================================================================
// PricingCard Component
// ============================================================================

interface PricingCardProps {
  plan: PricingPlan;
}

function PricingCard({ plan }: PricingCardProps) {
  const { name, price, features, popular = false } = plan;

  return (
    <div
      className={cn(
        'relative p-8 rounded-2xl',
        popular
          ? 'bg-slate-900/60 backdrop-blur-2xl border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]'
          : 'bg-slate-800/40 backdrop-blur-xl border border-slate-700/50'
      )}
    >
      {popular && <PopularBadge />}

      {/* Plan Header */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          {price}
        </div>
        <span className="text-slate-500 text-sm">/mois</span>
      </div>

      {/* Features */}
      <PricingFeatureList features={features} />

      {/* CTA Button */}
      <Button
        variant={popular ? 'primary' : 'secondary'}
        className={cn(
          'w-full py-4',
          popular && 'hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
        )}
      >
        Commencer
      </Button>
    </div>
  );
}

// ============================================================================
// PricingSection Component
// ============================================================================

function PricingSectionComponent() {
  return (
    <Section
      id="pricing"
      className="bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950"
    >
      <SectionHeader
        title={
          <>
            Tarifs <GradientText variant="amber">Transparents</GradientText>
          </>
        }
        subtitle="Choisissez le plan adapté à vos ambitions"
      />

      <div className="grid md:grid-cols-3 gap-8">
        {PRICING_PLANS.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </Section>
  );
}

export const PricingSection = memo(PricingSectionComponent);
PricingSection.displayName = 'PricingSection';
