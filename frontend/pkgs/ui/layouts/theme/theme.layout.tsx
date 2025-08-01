/* react */
import { useMemo } from 'react';
/* props */
import type { ThemeLayoutProps } from './theme.props';
/* theme */
import { useThemeScheme } from '@ui/contexts/theme';
/* type */
import type { ThemeScheme } from '@ui/types';
/* utils */
import { classNames, content } from '@ui/utils';
/* styles */
import styles from './theme.module.css';

export default function ThemeSchemeLayout({
  className,
  preference = 'user',
  children,
  ...props
}: ThemeLayoutProps) {
  const themeSchemeValue = useThemeScheme();

  const scheme = useMemo<ThemeScheme>(() => {
    if (preference === 'user') {
      return themeSchemeValue.scheme;
    }
    if (preference === 'system') {
      return themeSchemeValue.system;
    }
    if (preference === 'inverse') {
      return themeSchemeValue.inverse;
    }
    return preference;
  }, [preference, themeSchemeValue.inverse, themeSchemeValue.scheme, themeSchemeValue.system]);

  return (
    <div className={classNames(styles.theme, `theme-${scheme}`, className)} {...props}>
      {content(children)}
    </div>
  );
}
