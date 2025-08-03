/* react */
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
/* types */
import type { Slot } from '@ui/types';

export interface BaseLayoutProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
  children?: Slot;
}
