/**
 * Constantes et données statiques pour la landing page GrokTrade
 * Séparation des données de la logique UI pour une meilleure maintenabilité
 */

import type {
  NavLink,
  TradeData,
  StatData,
  FeatureData,
  StepData,
  PricingPlan,
  BotData,
  FooterLinkGroup,
  SocialLink,
} from '@/types';

// ============================================================================
// Brand Constants
// ============================================================================

export const BRAND = {
  name: 'GrokTrade',
  tagline: 'Trading automatisé propulsé par l\'intelligence artificielle Grok.',
  dashboardUrl: 'dashboard.groktrade.ai',
  copyright: `© ${new Date().getFullYear()} GrokTrade. Tous droits réservés.`,
} as const;

// ============================================================================
// Navigation
// ============================================================================

export const NAV_LINKS: readonly NavLink[] = [
  { href: '#features', label: 'Fonctionnalités' },
  { href: '#how-it-works', label: 'Comment ça marche' },
  { href: '#pricing', label: 'Tarifs' },
] as const;

// ============================================================================
// Trading Ticker Data
// ============================================================================

export const TRADING_TICKER_DATA: readonly TradeData[] = [
  { pair: 'BTC/USD', change: '+2.45%', price: '97,432.50' },
  { pair: 'ETH/USD', change: '+1.87%', price: '3,456.78' },
  { pair: 'SOL/USD', change: '+5.23%', price: '234.56' },
  { pair: 'XRP/USD', change: '-0.34%', price: '2.34' },
  { pair: 'DOGE/USD', change: '+12.45%', price: '0.4567' },
  { pair: 'ADA/USD', change: '+3.21%', price: '1.23' },
] as const;

// ============================================================================
// Stats Data
// ============================================================================

export const STATS_DATA: readonly StatData[] = [
  { label: 'Volume Tradé', value: '$2.4B', suffix: '+' },
  { label: 'Utilisateurs Actifs', value: '47K', suffix: '+' },
  { label: 'ROI Moyen', value: '34', suffix: '%' },
  { label: 'Trades par Jour', value: '1.2M', suffix: '+' },
] as const;

// ============================================================================
// Features Data
// ============================================================================

export const FEATURES_DATA: readonly FeatureData[] = [
  {
    id: 'ai-grok',
    iconName: 'computer',
    title: 'IA Grok Intégrée 🤖',
    description:
      'Profitez de la puissance analytique de Grok pour des prédictions de marché ultra-précises et des stratégies optimisées en temps réel. Le boss des bots !',
  },
  {
    id: 'trading-24-7',
    iconName: 'clock',
    title: 'Trading 24/7 🕐',
    description:
      "Vos stratégies s'exécutent sans interruption. L'IA surveille les marchés même quand vous dormez. Bye bye les nuits blanches !",
  },
  {
    id: 'security',
    iconName: 'shield',
    title: 'Sécurité Maximale 🔒',
    description:
      'Vos fonds et données sont protégés par un chiffrement de niveau militaire et une authentification multi-facteurs. Rien ne fuite !',
  },
  {
    id: 'performance',
    iconName: 'chart-up',
    title: 'Performance Elite ⚡',
    description:
      "Algorithmes optimisés pour une exécution en millisecondes. Aucune opportunité de marché n'est manquée. Vitesse lumière !",
  },
  {
    id: 'analytics',
    iconName: 'pie-chart',
    title: 'Analytics Avancées 📊',
    description:
      'Tableaux de bord en temps réel avec visualisations détaillées de vos performances et insights du marché. Tout sous les yeux !',
  },
  {
    id: 'copy-trading',
    iconName: 'users',
    title: 'Copy Trading 👥',
    description:
      'Copiez automatiquement les stratégies des meilleurs traders de la plateforme et profitez de leur expertise. Facile comme bonjour !',
  },
] as const;

// ============================================================================
// Steps Data
// ============================================================================

export const STEPS_DATA: readonly StepData[] = [
  {
    number: '01',
    title: 'Connectez vos Exchanges',
    description:
      'Reliez vos comptes Binance, Coinbase, Kraken et autres via API sécurisée. Vos clés ne quittent jamais votre navigateur.',
  },
  {
    number: '02',
    title: 'Configurez votre Stratégie',
    description:
      'Choisissez parmi nos stratégies IA pré-configurées ou créez la vôtre. Définissez vos limites de risque et objectifs.',
  },
  {
    number: '03',
    title: 'Laissez Grok Trader',
    description:
      "L'IA analyse les marchés, identifie les opportunités et exécute les trades automatiquement. Vous récoltez les profits.",
  },
] as const;

// ============================================================================
// Pricing Data
// ============================================================================

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '€29',
    features: [
      '1 bot de trading actif',
      'Exchanges illimités',
      'Stratégies basiques',
      'Support email',
      'Updates automatiques',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '€99',
    popular: true,
    features: [
      '5 bots de trading actifs',
      'Exchanges illimités',
      'Toutes les stratégies IA',
      'Support prioritaire 24/7',
      'Copy trading',
      'Analytics avancées',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '€299',
    features: [
      'Bots illimités',
      'API dédiée',
      'Stratégies personnalisées',
      'Account manager dédié',
      'SLA garanti 99.9%',
      'Audit de sécurité',
    ],
  },
] as const;

// ============================================================================
// Dashboard Mock Data
// ============================================================================

export const DASHBOARD_MOCK = {
  portfolioValue: '$127,845.32',
  todayChange: '+$12,456.78 (10.8%)',
  chartData: [40, 45, 42, 50, 48, 55, 52, 60, 58, 65, 70, 68, 75, 72, 80, 78, 85, 82, 90, 95],
} as const;

export const ACTIVE_BOTS: readonly BotData[] = [
  {
    name: 'BTC Scalper',
    symbol: '₿',
    performance: '+24.5%',
    gradientClass: 'from-cyan-500/20 to-emerald-500/20',
  },
  {
    name: 'ETH DCA',
    symbol: 'Ξ',
    performance: '+18.2%',
    gradientClass: 'from-purple-500/20 to-cyan-500/20',
  },
  {
    name: 'SOL Momentum',
    symbol: '◎',
    performance: '+31.7%',
    gradientClass: 'from-amber-500/20 to-yellow-500/20',
  },
] as const;

// ============================================================================
// Footer Data
// ============================================================================

export const FOOTER_LINK_GROUPS: readonly FooterLinkGroup[] = [
  {
    title: 'Produit',
    links: [
      { href: '#', label: 'Fonctionnalités' },
      { href: '#', label: 'Tarifs' },
      { href: '#', label: 'API' },
      { href: '#', label: 'Intégrations' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { href: '#', label: 'Documentation' },
      { href: '#', label: 'Blog' },
      { href: '#', label: 'Tutoriels' },
      { href: '#', label: 'Support' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { href: '#', label: 'Confidentialité' },
      { href: '#', label: 'CGU' },
      { href: '#', label: 'Sécurité' },
      { href: '#', label: 'Cookies' },
    ],
  },
] as const;

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { href: '#', iconName: 'twitter', label: 'Twitter' },
  { href: '#', iconName: 'github', label: 'GitHub' },
  { href: '#', iconName: 'discord', label: 'Discord' },
] as const;

// ============================================================================
// CTA Data
// ============================================================================

export const CTA_BENEFITS = [
  'Essai gratuit 14 jours',
  'Sans carte bancaire',
  'Annulation à tout moment',
] as const;

// ============================================================================
// Animation Constants
// ============================================================================

export const ANIMATION = {
  particleCount: 50,
  tickerDuration: 30,
  scrollThreshold: 50,
} as const;
