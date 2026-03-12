import { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  placeholder = 'Buscar',
  value,
  onChange,
  ...props
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-3 pl-10 bg-white text-text-primary placeholder-gray-400 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
        {...props}
      />
      <button
        type="button"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-text-primary transition"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
