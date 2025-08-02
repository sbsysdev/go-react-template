/* react */
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
/* types */
import type { Slot } from '@ui/types';

export interface LabelProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'children'> {
  children?: Slot;
}
