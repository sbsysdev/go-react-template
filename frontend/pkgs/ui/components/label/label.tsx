/* props */
import type { LabelProps } from './label.props';
/* utils */
import { classNames, content } from '@ui/utils';
/* styles */
import styles from './label.module.css';

export default function Label({ className, children, ...props }: LabelProps) {
  return (
    <span className={classNames(styles.label, className)} {...props}>
      {content(children)}
    </span>
  );
}
