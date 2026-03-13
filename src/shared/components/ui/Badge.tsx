import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
};

export function Badge({ children, className = '', variant = 'default' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';
  const variantStyle = variantStyles[variant];

  return (
    <span className={`${baseStyles} ${variantStyle} ${className}`}>
      {children}
    </span>
  );
}
