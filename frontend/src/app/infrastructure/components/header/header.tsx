/* props */
import type { HeaderProps } from './header.props';
/* components */
import { Button } from '@ui/components/button';
import { Icon } from '@ui/components/icon';
/* utils */
import { classNames } from '@ui/utils';
/* assets */
import { mdiMenu } from '@mdi/js';
/* styles */
import styles from './header.module.css';

export default function Header({ className, toggleSidebar, ...props }: HeaderProps) {
  return (
    <header className={classNames(styles.header, className)} {...props}>
      <Button onClick={toggleSidebar}>
        <Icon path={mdiMenu} size="2xl" />
      </Button>
    </header>
  );
}
