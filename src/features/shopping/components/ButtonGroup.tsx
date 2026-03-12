interface ButtonGroupProps {
  categories: string[];
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
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeCategory === category
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-text-primary hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
