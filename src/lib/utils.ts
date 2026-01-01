/**
 * Utilitaires généraux pour l'application
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine et merge les classes Tailwind CSS de manière intelligente
 * Utilise clsx pour la composition conditionnelle et twMerge pour résoudre les conflits
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Détermine si une valeur de changement est positive
 * @param change - String de changement (ex: "+2.45%" ou "-0.34%")
 */
export function isPositiveChange(change: string): boolean {
  return change.startsWith('+');
}

/**
 * Formate un nombre avec un suffix optionnel
 */
export function formatStatValue(value: string, suffix?: string): string {
  return suffix ? `${value}${suffix}` : value;
}
