import { PerPage } from './PerPage';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  maxVisiblePages?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
  maxVisiblePages = 5,
}: PaginationProps) {
  const perPageOptions = [10, 20, 50, 100];

  const generatePageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-center gap-8">
      <PerPage
        value={perPage}
        onChange={onPerPageChange}
        options={perPageOptions}
      />

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-text-primary hover:bg-background-light disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          ‹
        </button>

        {pages.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-2 py-2 text-text-secondary">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-primary hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-text-primary hover:bg-background-light disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          ›
        </button>
      </div>
    </div>
  );
}
