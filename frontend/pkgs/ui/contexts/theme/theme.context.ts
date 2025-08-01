/* react */
import { createContext } from 'react';
/* types */
import type { ThemeSchemeValue } from '@ui/types';

export const ThemeSchemeContext = createContext<ThemeSchemeValue | null>(null);
