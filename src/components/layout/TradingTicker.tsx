/**
 * Trading Ticker Component
 * Affiche un défilement horizontal des paires de trading
 */

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { isPositiveChange } from '@/lib/utils';
import { TRADING_TICKER_DATA } from '@/lib/constants';
import type { TradeData } from '@/types';

// ============================================================================
// TradeItem Component
// ============================================================================

interface TradeItemProps {
  trade: TradeData;
}

function TradeItem({ trade }: TradeItemProps) {
  const isPositive = isPositiveChange(trade.change);

  return (
    <div className="flex items-center gap-8 px-8 whitespace-nowrap">
      <span className="font-mono text-sm text-slate-400">{trade.pair}</span>
      <span className="font-mono text-sm text-white">${trade.price}</span>
      <span
        className={cn(
          'font-mono text-sm',
          isPositive ? 'text-emerald-400' : 'text-red-500'
        )}
      >
        {trade.change}
      </span>
    </div>
  );
}

// ============================================================================
// TradingTicker Component
// ============================================================================

function TradingTickerComponent() {
  // Double les données pour créer un effet de boucle infinie
  const duplicatedTrades = [...TRADING_TICKER_DATA, ...TRADING_TICKER_DATA];

  return (
    <div className="w-full overflow-hidden bg-slate-900/80 border-y border-slate-800 py-3">
      <div className="flex animate-ticker">
        {duplicatedTrades.map((trade, index) => (
          <TradeItem key={`${trade.pair}-${index}`} trade={trade} />
        ))}
      </div>
    </div>
  );
}

export const TradingTicker = memo(TradingTickerComponent);
TradingTicker.displayName = 'TradingTicker';
