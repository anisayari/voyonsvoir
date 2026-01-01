/**
 * Footer Component
 * Pied de page avec liens, réseaux sociaux et branding
 */

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { BRAND, FOOTER_LINK_GROUPS, SOCIAL_LINKS } from '@/lib/constants';
import { ChartUpIcon, SocialIcon } from '@/components/icons';
import type { FooterLinkGroup, SocialLink } from '@/types';

// ============================================================================
// FooterBrand Component
// ============================================================================

function FooterBrand() {
  return (
    <div className="col-span-2 md:col-span-1">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
          <ChartUpIcon className="w-6 h-6 text-slate-950" strokeWidth={2} />
        </div>
        <span className="text-xl font-bold tracking-tight">
          Grok<span className="text-cyan-400">Trade</span>
        </span>
      </div>
      <p className="text-slate-400 text-sm">{BRAND.tagline}</p>
    </div>
  );
}

// ============================================================================
// FooterLinkColumn Component
// ============================================================================

interface FooterLinkColumnProps {
  group: FooterLinkGroup;
}

function FooterLinkColumn({ group }: FooterLinkColumnProps) {
  return (
    <div>
      <h4 className="font-bold mb-4">{group.title}</h4>
      <ul className="space-y-2 text-slate-400 text-sm">
        {group.links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="hover:text-cyan-400 transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================================
// SocialLinks Component
// ============================================================================

interface SocialLinkButtonProps {
  link: SocialLink;
}

function SocialLinkButton({ link }: SocialLinkButtonProps) {
  return (
    <a
      href={link.href}
      aria-label={link.label}
      className={cn(
        'w-10 h-10 rounded-lg bg-slate-800/40 backdrop-blur-xl border border-slate-700/50',
        'flex items-center justify-center hover:border-cyan-500/50 transition-colors'
      )}
    >
      <SocialIcon name={link.iconName} />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex gap-4">
      {SOCIAL_LINKS.map((link) => (
        <SocialLinkButton key={link.iconName} link={link} />
      ))}
    </div>
  );
}

// ============================================================================
// FooterBottom Component
// ============================================================================

function FooterBottom() {
  return (
    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-slate-500 text-sm">{BRAND.copyright}</p>
        <p className="text-slate-500 text-xs">Site créé par <span className="text-cyan-400 font-semibold">ArticlesRuby, DefendIntelligence et la communauté</span> A vous de jouer les kheys</p>
      </div>
      <SocialLinks />
    </div>
  );
}

// ============================================================================
// Footer Component
// ============================================================================

function FooterComponent() {
  return (
    <footer className="py-16 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <FooterBrand />
          {FOOTER_LINK_GROUPS.map((group) => (
            <FooterLinkColumn key={group.title} group={group} />
          ))}
        </div>

        {/* Footer Bottom */}
        <FooterBottom />
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
Footer.displayName = 'Footer';
