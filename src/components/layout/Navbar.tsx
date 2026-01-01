/**
 * Composant de navigation principal
 * Gère le scroll sticky et l'affichage responsive
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, ANIMATION } from '@/lib/constants';
import { Button } from '@/components/ui';
import { ChartUpIcon } from '@/components/icons';

// ============================================================================
// Logo Component
// ============================================================================

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
        <ChartUpIcon className="w-6 h-6 text-slate-950" strokeWidth={2} />
      </div>
      <span className="text-xl font-bold tracking-tight">
        Grok<span className="text-cyan-400">Trade</span>
      </span>
    </div>
  );
}

// ============================================================================
// NavLinks Component
// ============================================================================

function NavLinks() {
  return (
    <div className="hidden md:flex items-center gap-8">
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-slate-400 hover:text-cyan-400 transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

// ============================================================================
// NavActions Component
// ============================================================================

function NavActions() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="sm" className="hidden sm:block">
        Connexion
      </Button>
      <Button variant="primary" size="sm">
        Commencer
      </Button>
    </div>
  );
}

// ============================================================================
// Navbar Component
// ============================================================================

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > ANIMATION.scrollThreshold);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled && 'bg-slate-900/60 backdrop-blur-2xl border-b border-slate-800'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <NavLinks />
        <NavActions />
      </div>
    </nav>
  );
}
