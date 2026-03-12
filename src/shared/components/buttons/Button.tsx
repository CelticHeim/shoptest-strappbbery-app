import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  to?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  type = 'button',
  icon,
  iconPosition = 'left',
  isLoading = false,
  to,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-opacity-90',
    secondary: 'bg-secondary text-white hover:bg-opacity-90',
    danger: 'bg-status-danger text-white hover:bg-red-600',
    success: 'bg-status-success text-white hover:bg-green-600',
  };

  const baseClasses = `px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variantClasses[variant]} ${className}`;

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {isLoading ? 'Cargando...' : children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type as 'button' | 'submit' | 'reset'}
      disabled={disabled || isLoading}
      className={baseClasses}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
