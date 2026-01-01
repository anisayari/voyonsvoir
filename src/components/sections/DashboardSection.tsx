/**
 * Dashboard Section Component
 * Affiche un aperçu du dashboard avec données simulées
 */

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { Section, SectionHeader, GradientText, StatusDot } from '@/components/ui';
import { DASHBOARD_MOCK, ACTIVE_BOTS, BRAND } from '@/lib/constants';
import type { BotData } from '@/types';

// ============================================================================
// DashboardHeader Component (Browser Chrome)
// ============================================================================

function DashboardHeader() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
      <span className="ml-4 text-slate-500 text-sm font-mono">{BRAND.dashboardUrl}</span>
    </div>
  );
}

// ============================================================================
// PortfolioChart Component
// ============================================================================

function PortfolioChart() {
  return (
    <div className="h-48 flex items-end gap-1">
      {DASHBOARD_MOCK.chartData.map((height, index) => (
        <div
          key={`chart-bar-${index}`}
          className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/50 to-emerald-500/50"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// TimeframeSelector Component
// ============================================================================

function TimeframeSelector() {
  const timeframes = [
    { label: '1J', active: false },
    { label: '1S', active: true },
    { label: '1M', active: false },
  ];

  return (
    <div className="flex gap-2">
      {timeframes.map(({ label, active }) => (
        <button
          key={label}
          className={cn(
            'px-3 py-1 rounded-lg text-sm cursor-pointer',
            active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700/50 text-slate-400'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// PortfolioCard Component
// ============================================================================

function PortfolioCard() {
  return (
    <div className="col-span-1 md:col-span-2 p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-slate-500 text-sm mb-1">Valeur du Portfolio</p>
          <p className="text-4xl font-bold">{DASHBOARD_MOCK.portfolioValue}</p>
          <p className="text-emerald-400 text-sm mt-1">
            {DASHBOARD_MOCK.todayChange} aujourd&apos;hui
          </p>
        </div>
        <TimeframeSelector />
      </div>
      <PortfolioChart />
    </div>
  );
}

// ============================================================================
// BotItem Component
// ============================================================================

interface BotItemProps {
  bot: BotData;
}

function BotItem({ bot }: BotItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center',
          bot.gradientClass
        )}
      >
        <span className="text-lg">{bot.symbol}</span>
      </div>
      <div className="flex-1">
        <p className="font-medium">{bot.name}</p>
        <p className="text-emerald-400 text-sm">{bot.performance}</p>
      </div>
      <StatusDot status="active" />
    </div>
  );
}

// ============================================================================
// ActiveBotsCard Component
// ============================================================================

function ActiveBotsCard() {
  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <p className="text-slate-500 text-sm mb-4">Bots Actifs</p>
      <div className="space-y-4">
        {ACTIVE_BOTS.map((bot) => (
          <BotItem key={bot.name} bot={bot} />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// DashboardPreview Component
// ============================================================================

function DashboardPreview() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/60 backdrop-blur-2xl p-2">
      <div className="rounded-xl bg-slate-900 overflow-hidden">
        <DashboardHeader />
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <PortfolioCard />
          <ActiveBotsCard />
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/20 via-transparent to-emerald-500/20 opacity-50 blur-xl -z-10" />
    </div>
  );
}

// ============================================================================
// DashboardSection Component
// ============================================================================

function DashboardSectionComponent() {
  return (
    <Section>
      <SectionHeader
        title={
          <>
            Un Dashboard <GradientText>Puissant</GradientText>
          </>
        }
        subtitle="Tout ce dont vous avez besoin, au bout des doigts"
      />

      <DashboardPreview />
    </Section>
  );
}

export const DashboardSection = memo(DashboardSectionComponent);
DashboardSection.displayName = 'DashboardSection';
