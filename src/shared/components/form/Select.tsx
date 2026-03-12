import { SelectHTMLAttributes, useState } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder = 'Selecciona una opción',
  className = '',
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={`flex items-center justify-between px-4 py-3 bg-background-light text-text-secondary rounded-lg cursor-pointer transition border ${
            isOpen ? 'border-primary' : 'border-transparent'
          } ${error ? 'border-status-danger' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{placeholder}</span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-4 py-3 hover:bg-background-light cursor-pointer transition text-text-primary"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <select
        className="sr-only"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-status-danger mt-1">{error}</p>
      )}
    </div>
  );
}
