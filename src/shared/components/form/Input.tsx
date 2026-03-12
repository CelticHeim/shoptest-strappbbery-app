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
        className={`w-full px-4 py-3 bg-gray-100 text-text-primary placeholder-gray-400 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${className} ${
          error ? 'ring-2 ring-status-danger border-status-danger' : ''
        }`}
        {...props}
      />
      {error && (
        <p className="text-sm text-status-danger mt-1">{error}</p>
      )}
    </div>
  );
}
