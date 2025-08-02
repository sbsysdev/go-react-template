/* props */
import type { IconProps } from './icon.props';
/* utils */
import { classNames } from '@ui/utils';
/* styles */
import styles from './icon.module.css';

export default function Icon({
  className,
  path,
  size = 'md',
  disabled,
  inverse,
  ...props
}: IconProps) {
  return (
    <svg
      className={classNames(
        styles.icon,
        styles[`size-${size}`],
        inverse && styles.inverse,
        className
      )}
      viewBox="0 0 24 24"
      aria-disabled={disabled}
      {...props}>
      <path fill="currentColor" d={path} />
    </svg>
  );
}
