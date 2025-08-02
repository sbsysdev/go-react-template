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
      <h1>
        <Label>Clinic</Label>
      </h1>
    </aside>
  );
}
