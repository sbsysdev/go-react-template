/* types */
import type { Slot } from './slot.type';

export type ThemeScheme = 'light' | 'dark';
export type ThemePreference = 'system' | 'inverse' | ThemeScheme;

export type ThemeVariant = 'fill' | 'subtle';

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

export type ThemeFontFamily = 'brand' | 'main' | 'number';

export type ThemeBaseSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ThemeFontWeight = ThemeBaseSize | '2xl';
export type ThemeSizeExtended = ThemeFontWeight | '3xl' | '4xl';
export type ThemeSizeLarge = ThemeSizeExtended | '5xl' | '6xl';
export type ThemeSizeScreen = '6xs' | '5xs' | '4xs' | '3xs' | '2xs' | ThemeSizeLarge;
export type ThemeSizeFull = 'full';
export type ThemeSizeNone = 'none';
