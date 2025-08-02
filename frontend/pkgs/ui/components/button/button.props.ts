/* react */
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
/* types */
import type {
  Slot,
  ThemeSizeExtended,
  ThemeSizeFull,
  ThemeSizeNone,
  ThemeVariant,
} from '@ui/types';

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'children'
  > {
  children?: Slot;
  padding?: ThemeSizeExtended;
  variant?: ThemeVariant;
  disabled?: boolean;
  rounded?: ThemeSizeNone | ThemeSizeExtended | ThemeSizeFull;
}
