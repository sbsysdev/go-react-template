/* react */
import { useMemo } from 'react';
/* context */
import { ThemeSchemeContext } from './theme.context';
/* hooks */
import { usePrefersColorScheme } from '@ui/hooks';
/* types */
import type { ThemeSchemeProviderProps, ThemeSchemeValue } from '@ui/types';
/* utils */
import { content, inverseScheme } from '@ui/utils';

export default function ThemeSchemeProvider({
  preference = 'system',
  updatePreference,
  children,
}: ThemeSchemeProviderProps) {
  const prefersColorScheme = usePrefersColorScheme();

  const themeSchemeValue = useMemo<ThemeSchemeValue>(() => {
    const scheme =
      preference === 'system'
        ? prefersColorScheme
        : preference === 'inverse'
          ? inverseScheme(prefersColorScheme)
          : preference;

    return {
      preference,
      scheme,
      inverse: inverseScheme(scheme),
      system: prefersColorScheme,
      updatePreference,
    };
  }, [updatePreference, preference, prefersColorScheme]);

  return (
    <ThemeSchemeContext.Provider value={themeSchemeValue}>
      {content(children, themeSchemeValue)}
    </ThemeSchemeContext.Provider>
  );
}
