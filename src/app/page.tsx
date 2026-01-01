/**
 * Landing Page - GrokTrade
 * 
 * Page principale de la landing page.
 * Architecture modulaire avec composants réutilisables.
 * 
 * @see src/components/sections - Sections de la page
 * @see src/components/layout - Composants de layout
 * @see src/lib/constants - Données et constantes
 * @see src/types - Types TypeScript
 */

import { Navbar, TradingTicker, Footer } from '@/components/layout';
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  HowItWorksSection,
  DashboardSection,
  PricingSection,
  CTASection,
} from '@/components/sections';

// ============================================================================
// Page Component
// ============================================================================

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Trading Ticker */}
      <div className="pt-20">
        <TradingTicker />
      </div>

      {/* Main Content */}
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DashboardSection />
        <PricingSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
