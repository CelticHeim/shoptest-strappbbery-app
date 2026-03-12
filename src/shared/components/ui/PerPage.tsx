interface PerPageProps {
  value: number;
  onChange: (perPage: number) => void;
  options?: number[];
}

export function PerPage({
  value,
  onChange,
  options = [10, 20, 50, 100],
}: PerPageProps) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="text-text-secondary text-sm">Registros Visibles</span>
    </div>
  );
}
