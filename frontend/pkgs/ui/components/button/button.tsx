/* props */
import type { ButtonProps } from './button.props';
/* utils */
import { classNames, content } from '@ui/utils';
/* styles */
import styles from './button.module.css';

export default function Button({
  className,
  children,
  type = 'button',
  padding = 'sm',
  variant = 'subtle',
  disabled,
  rounded = 'xs',
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`padding-${padding}`],
        styles[`variant-${variant}`],
        styles[`rounded-${rounded}`],
        className
      )}
      type={type}
      aria-disabled={disabled}
      disabled={disabled}
      {...props}>
      {content(children)}
    </button>
  );
}
