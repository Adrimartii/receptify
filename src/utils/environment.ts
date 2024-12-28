/**
 * Utility functions for environment-specific checks
 */

/**
 * Checks if the current environment is StackBlitz
 */
export const isStackBlitz = (): boolean => 
  window.location.hostname.includes('stackblitz');

/**
 * Checks if the current environment is a development environment
 */
export const isDevelopment = (): boolean =>
  window.location.hostname === 'localhost';

/**
 * Checks if the current environment supports PWA features
 */
export const supportsPWA = (): boolean =>
  !isStackBlitz() && !isDevelopment();