/* react */
import { useEffect, useState } from 'react';
/* types */
import type { ThemeScheme } from '@ui/types';

const MatchMediaQuery = '(prefers-color-scheme: dark)';

export function usePrefersColorScheme(): ThemeScheme {
  const [colorScheme, setColorScheme] = useState<ThemeScheme>(() =>
    window.matchMedia(MatchMediaQuery).matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MatchMediaQuery);

    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return colorScheme;
}
