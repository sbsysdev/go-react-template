/* props */
import type { SidebarProps } from './sidebar.props';
/* components */
import { Label } from '@ui/components/label';
/* utils */
import { classNames } from '@ui/utils';
/* styles */
import styles from './sidebar.module.css';

export default function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <aside className={classNames(styles.sidebar, className)} {...props}>
      <section className={styles['brand-short']}>
        <Label family="brand" size="2xl" weight="2xl">
          MA
        </Label>
      </section>

      <section className={styles['brand-large']}>
        <Label family="brand" size="xl" weight="xl">
          Medical
        </Label>

        <Label family="brand" size="xl" weight="xl">
          Appointments
        </Label>
      </section>

      <section>Theming</section>
    </aside>
  );
}
