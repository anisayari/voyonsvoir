/**
 * Types et interfaces pour la landing page GrokTrade
 */

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavLink {
  readonly href: string;
  readonly label: string;
}

// ============================================================================
// Trading Types
// ============================================================================

export interface TradeData {
  readonly pair: string;
  readonly change: string;
  readonly price: string;
}

export interface StatData {
  readonly label: string;
  readonly value: string;
  readonly suffix?: string;
}

// ============================================================================
// Feature Types
// ============================================================================

export interface FeatureData {
  readonly id: string;
  readonly iconName: IconName;
  readonly title: string;
  readonly description: string;
}

export interface StepData {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

// ============================================================================
// Pricing Types
// ============================================================================

export interface PricingPlan {
  readonly id: string;
  readonly name: string;
  readonly price: string;
  readonly features: readonly string[];
  readonly popular?: boolean;
}

// ============================================================================
// Bot Types
// ============================================================================

export interface BotData {
  readonly name: string;
  readonly symbol: string;
  readonly performance: string;
  readonly gradientClass: string;
}

// ============================================================================
// Footer Types
// ============================================================================

export interface FooterLinkGroup {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export interface FooterLink {
  readonly href: string;
  readonly label: string;
}

export interface SocialLink {
  readonly href: string;
  readonly iconName: SocialIconName;
  readonly label: string;
}

// ============================================================================
// Icon Types
// ============================================================================

export type IconName =
  | 'computer'
  | 'clock'
  | 'shield'
  | 'chart-up'
  | 'pie-chart'
  | 'users'
  | 'arrow-right'
  | 'play'
  | 'check';

export type SocialIconName = 'twitter' | 'github' | 'discord';

// ============================================================================
// Component Props Types
// ============================================================================

export interface ButtonProps {
  readonly children: React.ReactNode;
  readonly variant?: 'primary' | 'secondary' | 'ghost';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly className?: string;
  readonly onClick?: () => void;
  readonly type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly hover?: boolean;
  readonly glow?: boolean;
}

export interface SectionProps {
  readonly id?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export interface GradientTextProps {
  readonly children: React.ReactNode;
  readonly variant?: 'cyan' | 'amber';
}
