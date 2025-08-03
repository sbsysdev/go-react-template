/* react */
import { useMemo } from 'react';
/* layouts */
import { ThemeSchemeLayout } from '@ui/layouts/theme';
/* props */
import type { FooterProps } from './footer.props';
/* components */
import { Label } from '@ui/components/label';
/* utils */
import { classNames } from '@ui/utils';
/* styles */
import styles from './footer.module.css';

export default function Footer({ className, ...props }: FooterProps) {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <ThemeSchemeLayout preference="dark">
      <footer className={classNames(styles.footer, className)} {...props}>
        <Label size="sm" family="brand">
          {currentYear}
        </Label>

        <Label family="number">©</Label>

        <a
          href="https://github.com/sbsysdev"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}>
          <Label size="sm" family="brand">
            sbsysdev
          </Label>
        </a>
      </footer>
    </ThemeSchemeLayout>
  );
}
