import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
}

export function Textarea({
  label,
  error,
  rows = 4,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-4 py-3 bg-background-light text-text-secondary placeholder-text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition resize-none ${className} ${
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
