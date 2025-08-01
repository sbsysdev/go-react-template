/* types */
import type { Slot } from './slot.type';

export type ThemeScheme = 'light' | 'dark';
export type ThemePreference = 'system' | 'inverse' | ThemeScheme;

export interface ThemeSchemeValue {
  preference: ThemePreference;
  scheme: ThemeScheme;
  inverse: ThemeScheme;
  system: ThemeScheme;
  updatePreference: (preference: ThemePreference) => void;
}

export interface ThemeSchemeProviderProps {
  preference?: ThemePreference;
  updatePreference: (preference: ThemePreference) => void;
  children?: Slot<ThemeSchemeValue>;
}
