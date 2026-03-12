import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  options: Option[];
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder = 'Selecciona una opción',
      className = '',
      label,
      error,
      value,
      onChange,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string | number | undefined>(value);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hiddenSelectRef = useRef<HTMLSelectElement>(null);

    const selectRef = (ref as React.RefObject<HTMLSelectElement>) || hiddenSelectRef;

    // Sync internal value with prop value
    useEffect(() => {
      if (value !== undefined && value !== null) {
        setInternalValue(value);
      }
    }, [value]);

    const currentValue = internalValue !== undefined ? internalValue : value;
    const selectedOption = options.find((opt) => String(opt.value) === String(currentValue));
    const displayLabel = selectedOption?.label || placeholder;

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleSelectOption = useCallback(
      (optionValue: string | number) => {
        setInternalValue(optionValue);

        if (onChange) {
          const event = {
            target: {
              value: optionValue.toString(),
              name: rest.name,
            },
          } as React.ChangeEvent<HTMLSelectElement>;
          onChange(event);
        }

        if (selectRef && selectRef.current) {
          selectRef.current.value = optionValue.toString();
          const event = new Event('change', { bubbles: true });
          selectRef.current.dispatchEvent(event);
        }

        setIsOpen(false);
      },
      [onChange, rest.name, selectRef]
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg border bg-background-light text-sm transition-all ${
              disabled
                ? 'cursor-not-allowed opacity-60 bg-gray-100'
                : 'text-text-primary hover:border-primary'
            } ${isOpen ? 'border-primary ring-2 ring-primary/10' : 'border-gray-200'} ${
              error ? 'border-status-danger' : ''
            } focus:outline-none focus:ring-2 focus:ring-primary/10 ${className}`}
          >
            <span className={selectedOption ? 'text-text-primary' : 'text-text-secondary'}>
              {displayLabel}
            </span>
            <svg
              className={`w-5 h-5 text-text-secondary transition-transform duration-200 shrink-0 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Hidden select element for form submission and ref */}
          <select
            ref={selectRef}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="hidden"
            {...rest}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown Menu */}
          {isOpen && !disabled && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                {options.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-text-secondary">No hay opciones disponibles</div>
                ) : (
                  options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelectOption(option.value)}
                      className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        String(currentValue) === String(option.value)
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-primary hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {error && <p className="text-sm text-status-danger mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
