interface Category {
  value: string;
  label: string;
}

interface ButtonGroupProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function ButtonGroup({ categories, activeCategory, onCategoryChange }: ButtonGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          activeCategory === null
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-text-primary hover:bg-gray-300'
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeCategory === category.value
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-text-primary hover:bg-gray-300'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
