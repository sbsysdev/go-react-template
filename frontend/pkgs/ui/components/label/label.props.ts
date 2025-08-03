/* react */
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
/* types */
import type { Slot, ThemeFontFamily, ThemeFontWeight, ThemeSizeExtended } from '@ui/types';

export interface LabelProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'children'> {
  children?: Slot;
  size?: ThemeSizeExtended;
  line?: ThemeSizeExtended;
  weight?: ThemeFontWeight;
  family?: ThemeFontFamily;
  dots?: boolean;
  inverse?: boolean;
  disabled?: boolean;
}
