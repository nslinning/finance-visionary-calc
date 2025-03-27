
// Export all calculator constants from this index file
export * from './types';
export * from './translations';
export * from './categories';
export * from './currency';
export * from './initialData';

// Re-export specific types that components need
export type { TranslationObject } from './types';

// Add COLORS export
export const COLORS = [
  '#4264fb',
  '#f87171',
  '#60a5fa',
  '#34d399',
  '#a3e635',
  '#facc15',
  '#fb923c',
  '#f472b6',
  '#c084fc',
  '#94a3b8'
];
