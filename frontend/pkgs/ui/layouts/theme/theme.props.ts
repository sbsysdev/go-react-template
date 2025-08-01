/* react */
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
/* types */
import type { Slot, ThemePreference } from '@ui/types';

export interface ThemeLayoutProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
  preference?: ThemePreference | 'user';
  children?: Slot;
}
