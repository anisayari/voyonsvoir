/**
 * CTA Section Component
 * Section d'appel à l'action finale
 */

import { memo } from 'react';
import { Section, Card, Button, GradientText, Container } from '@/components/ui';
import { SectionGlow } from '@/components/background';
import { ArrowRightIcon } from '@/components/icons';
import { CTA_BENEFITS } from '@/lib/constants';

// ============================================================================
// CTABenefits Component
// ============================================================================

function CTABenefits() {
  return (
    <p className="text-slate-500 text-sm mt-6">
      {CTA_BENEFITS.map((benefit, index) => (
        <span key={benefit}>
          ✓ {benefit}
          {index < CTA_BENEFITS.length - 1 && <span className="mx-2">&nbsp;&nbsp;</span>}
        </span>
      ))}
    </p>
  );
}

// ============================================================================
// CTAButtons Component
// ============================================================================

function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        variant="primary"
        size="lg"
        className="group hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
      >
        Créer mon Compte
        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
      <Button variant="secondary" size="lg">
        Parler à un Expert
      </Button>
    </div>
  );
}

// ============================================================================
// CTAContent Component
// ============================================================================

function CTAContent() {
  return (
    <div className="relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Prêt à <GradientText>Révolutionner</GradientText>
        <br />
        votre Trading ?
      </h2>
      <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
        Rejoignez les milliers de traders qui ont déjà automatisé leurs stratégies
        avec GrokTrade.
      </p>
      <CTAButtons />
      <CTABenefits />
    </div>
  );
}

// ============================================================================
// CTASection Component
// ============================================================================

function CTASectionComponent() {
  return (
    <Section container={false}>
      <Container size="md" className="text-center">
        <Card className="relative p-12 md:p-16 rounded-3xl overflow-hidden">
          <SectionGlow position="top" />
          <CTAContent />
        </Card>
      </Container>
    </Section>
  );
}

export const CTASection = memo(CTASectionComponent);
CTASection.displayName = 'CTASection';
