/* react */
import type { SVGProps } from 'react';
/* types */
import type { ThemeSizeLarge } from '@ui/types';

export interface IconProps extends SVGProps<SVGSVGElement> {
  path: string;
  size?: ThemeSizeLarge;
  disabled?: boolean;
}
