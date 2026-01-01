/**
 * Composants UI atomiques réutilisables
 * Design System de base pour GrokTrade
 */

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { ButtonProps, CardProps, GradientTextProps } from '@/types';

// ============================================================================
// Button Component
// ============================================================================

const buttonVariants = {
  primary: 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]',
  secondary: 'border border-slate-600 hover:border-cyan-500/50 hover:bg-slate-800/50',
  ghost: 'text-slate-400 hover:text-white',
} as const;

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className, onClick, type = 'button' }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        className={cn(
          'font-bold rounded-xl transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================================================
// Card Component
// ============================================================================

export function Card({ children, className, hover = false, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50',
        hover && 'hover:border-cyan-500/50 transition-all duration-500',
        glow && 'shadow-[0_0_30px_rgba(34,211,238,0.2)]',
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================================================
// GradientText Component
// ============================================================================

const gradientVariants = {
  cyan: 'from-cyan-400 via-emerald-400 to-cyan-400',
  amber: 'from-amber-400 to-yellow-500',
} as const;

export function GradientText({ children, variant = 'cyan' }: GradientTextProps) {
  return (
    <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', gradientVariants[variant])}>
      {children}
    </span>
  );
}

// ============================================================================
// Section Component
// ============================================================================

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  container?: boolean;
}

export function Section({ id, children, className, container = true }: SectionProps) {
  return (
    <section id={id} className={cn('py-24 px-6', className)}>
      {container ? <div className="max-w-6xl mx-auto">{children}</div> : children}
    </section>
  );
}

// ============================================================================
// SectionHeader Component
// ============================================================================

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

// ============================================================================
// Badge Component
// ============================================================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'glow';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/40 backdrop-blur-xl border border-slate-700/50',
        variant === 'glow' && 'shadow-[0_0_20px_rgba(34,211,238,0.2)]',
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================================================
// StatusDot Component
// ============================================================================

interface StatusDotProps {
  status?: 'active' | 'inactive';
  className?: string;
}

export function StatusDot({ status = 'active', className }: StatusDotProps) {
  return (
    <span
      className={cn(
        'w-2 h-2 rounded-full',
        status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500',
        className
      )}
    />
  );
}

// ============================================================================
// IconBox Component - Pour les icônes dans les feature cards
// ============================================================================

interface IconBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function IconBox({ children, className }: IconBoxProps) {
  return (
    <div
      className={cn(
        'w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20',
        'flex items-center justify-center',
        'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-500',
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================================================
// Container Component
// ============================================================================

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const containerSizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
} as const;

export function Container({ children, size = 'xl', className }: ContainerProps) {
  return <div className={cn('mx-auto', containerSizes[size], className)}>{children}</div>;
}
