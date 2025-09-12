import type { HTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'normal' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'normal',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    size !== 'normal' && styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.loading}>
          <svg className={styles.spinner} viewBox="0 0 24 24">
            <circle className={styles.spinnerTrack} cx="12" cy="12" r="10" />
            <circle className={styles.spinnerActive} cx="12" cy="12" r="10" />
          </svg>
          Carregando...
        </span>
      ) : children}
    </button>
  )
}