import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
}

export function Input({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-3 bg-background-light text-text-secondary placeholder-text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${className} ${
          error ? 'ring-2 ring-status-danger' : ''
        }`}
        {...props}
      />
      {error && (
        <p className="text-sm text-status-danger mt-1">{error}</p>
      )}
    </div>
  );
}
