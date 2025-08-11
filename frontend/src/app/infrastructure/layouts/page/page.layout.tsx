/* props */
import type { PageLayoutProps } from './page.props';
/* utils */
import { classNames, content } from '@ui/utils';
/* styles */
import styles from './page.module.css';

export default function PageLayout({ className, children, ...props }: PageLayoutProps) {
  return (
    <div className={classNames(styles.page, className)} {...props}>
      {content(children)}
    </div>
  );
}
