/* react */
import type { DetailedHTMLProps, LabelHTMLAttributes } from 'react';
/* types */
import type {
  Slot,
  ThemeFontFamily,
  ThemeFontWeight,
  ThemeSizeExtended,
  ThemeSizeFull,
  ThemeSizeNone,
  ThemeVariant,
} from '@ui/types';

export interface FieldChildrenProps {
  className: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  'aria-disabled'?: boolean;
}

export interface FieldProps
  extends Omit<
    DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    'children'
  > {
  name?: string;
  label?: string | Slot<FieldChildrenProps>;
  before?: Slot<FieldChildrenProps>;
  children?: Slot<FieldChildrenProps>;
  after?: Slot<FieldChildrenProps>;
  hint?: string | Slot<FieldChildrenProps>;

  padding?: ThemeSizeExtended;
  variant?: ThemeVariant;
  rounded?: ThemeSizeNone | ThemeSizeExtended | ThemeSizeFull;

  size?: ThemeSizeExtended;
  line?: ThemeSizeExtended;
  weight?: ThemeFontWeight;
  family?: ThemeFontFamily;
  inverse?: boolean;
  disabled?: boolean;
  error?: boolean;
}
