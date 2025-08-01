/* react */
import { useContext } from 'react';
/* context */
import { ThemeSchemeContext } from './theme.context';

export function useThemeScheme() {
  const context = useContext(ThemeSchemeContext);
  if (!context) {
    throw new Error('"useThemeScheme" must be used within a "ThemeSchemeProvider"');
  }
  return context;
}
