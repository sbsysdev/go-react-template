/* props */
import type { SidebarProps } from './sidebar.props';
/* components */
import { Label } from '@ui/components/label';
import { Button } from '@ui/components/button';
import { Icon } from '@ui/components/icon';
/* types */
import type { ThemePreference } from '@ui/types';
/* utils */
import { classNames } from '@ui/utils';
/* assets */
import { mdiThemeLightDark, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
/* styles */
import styles from './sidebar.module.css';
import { useThemeScheme } from '@ui/contexts/theme';

const Theming: { label: string; path: string; value: ThemePreference }[] = [
  {
    label: 'System',
    path: mdiThemeLightDark,
    value: 'system',
  },
  {
    label: 'Light',
    path: mdiWeatherSunny,
    value: 'light',
  },
  {
    label: 'dark',
    path: mdiWeatherNight,
    value: 'dark',
  },
];

export default function Sidebar({ className, ...props }: SidebarProps) {
  const { preference, updatePreference } = useThemeScheme();

  return (
    <aside className={classNames(styles.sidebar, className)} {...props}>
      <section className={styles['brand-short']}>
        <Label family="brand" size="2xl" weight="2xl">
          MA
        </Label>
      </section>

      <section className={styles['brand-large']}>
        <Label className={styles['brand-label']} family="brand" size="xl" weight="xl" dots>
          Medical
        </Label>

        <Label className={styles['brand-label']} family="brand" size="xl" weight="xl" dots>
          Appointments
        </Label>
      </section>

      <section className={styles.theming}>
        {Theming.map(theme => (
          <Button
            key={theme.value}
            className={styles['theming-action']}
            padding="lg"
            variant={theme.value === preference ? 'fill' : 'subtle'}
            disabled={theme.value === preference}
            onClick={() => updatePreference(theme.value)}>
            <Icon path={theme.path} size="2xl" inverse={theme.value === preference} />

            <Label
              className={styles['theming-label']}
              inverse={theme.value === preference}
              weight={theme.value === preference ? 'lg' : 'md'}>
              {theme.label}
            </Label>
          </Button>
        ))}
      </section>
    </aside>
  );
}
