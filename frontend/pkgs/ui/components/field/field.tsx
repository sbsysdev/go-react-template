/* props */
import type { FieldChildrenProps, FieldProps } from './field.props';
/* components */
import { Label } from '../label';
/* utils */
import { classNames, content } from '@ui/utils';
/* styles */
import styles from './field.module.css';
import buttonStyles from '../button/button.module.css';
import labelStyles from '../label/label.module.css';

export default function Field({
  className,
  id,
  name,
  label,
  before,
  children,
  after,
  hint,
  padding = 'sm',
  variant = 'subtle',
  rounded = 'xs',
  size = 'md',
  line = 'md',
  weight = 'md',
  family = 'main',
  inverse,
  disabled,
  error,
  ...props
}: FieldProps) {
  const childrenProps: FieldChildrenProps = {
    className: '',
    id,
    name,
    disabled,
    'aria-disabled': disabled,
  };

  return (
    <label
      className={classNames(styles.field, styles[`variant-${variant}`], className)}
      id={id}
      aria-disabled={disabled}
      {...props}>
      {typeof label === 'string' ? (
        <Label className={styles.label} weight="lg" dots disabled={disabled} inverse={inverse}>
          {label}
        </Label>
      ) : (
        content(label, { ...childrenProps, className: styles.label })
      )}

      <span
        className={classNames(
          styles.content,
          buttonStyles.button,
          buttonStyles[`padding-${padding}`],
          buttonStyles[`rounded-${rounded}`],
          error && styles.error
        )}
        aria-disabled={disabled}>
        {content(before, { ...childrenProps, className: styles.before })}

        {content(children, {
          ...childrenProps,
          autoComplete: 'off',
          className: classNames(
            styles.input,
            labelStyles.label,
            labelStyles[`size-${size}`],
            labelStyles[`line-${line}`],
            labelStyles[`weight-${weight}`],
            labelStyles[`family-${family}`],
            inverse && labelStyles.inverse
          ),
        })}

        {content(after, { ...childrenProps, className: styles.after })}
      </span>

      {typeof hint === 'string' ? (
        <Label className={styles.hint} size="sm" dots disabled={disabled} inverse={inverse}>
          {hint}
        </Label>
      ) : (
        content(hint, { ...childrenProps, className: styles.hint })
      )}
    </label>
  );
}
