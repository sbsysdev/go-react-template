/* props */
import type { LabelProps } from './label.props';
/* utils */
import { classNames, content } from '@ui/utils';
/* styles */
import styles from './label.module.css';

export default function Label({
  className,
  children,
  size = 'md',
  line = 'md',
  weight = 'md',
  family = 'main',
  dots,
  ...props
}: LabelProps) {
  return (
    <span
      className={classNames(
        styles[`size-${size}`],
        styles[`line-${line}`],
        styles[`weight-${weight}`],
        styles[`family-${family}`],
        dots && 'dots',
        className
      )}
      {...props}>
      {content(children)}
    </span>
  );
}
