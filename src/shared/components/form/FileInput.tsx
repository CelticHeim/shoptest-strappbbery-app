import { InputHTMLAttributes } from 'react';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function FileInput({
  label,
  error,
  className = '',
  ...props
}: FileInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <input
        type="file"
        className={`block w-full px-4 py-3 bg-background-light text-text-secondary rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition ${
          error ? 'border-status-danger' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-status-danger mt-1">{error}</p>
      )}
    </div>
  );
}
