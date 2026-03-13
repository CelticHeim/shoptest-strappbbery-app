import { useState, useEffect } from 'react';
import { useShopping } from './hooks/useShopping';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Pagination } from '@/shared/components/ui';
import { SearchBar } from '@/shared/components/ui';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ButtonGroup } from './components/ButtonGroup';
import { PRODUCT_CATEGORIES } from '@/shared/constants/categories';

export function Shopping() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Debounce search to avoid excessive API calls
  const debouncedSearch = useDebounce(search, 300);

  // Resetear página a 1 cuando cambia la búsqueda
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // Resetear página a 1 cuando cambia la categoría
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const { data, isPending, error } = useShopping(page, perPage, debouncedSearch, selectedCategory);

  const products = data?.data?.data || [];
  const pagination = data?.data || {};

  // Use predefined categories with labels
  const categories = PRODUCT_CATEGORIES;

  if (error) {
    return <div className="text-center py-8 text-status-danger">Error al cargar productos</div>;
  }

  return (
    <div className="pb-32">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tienda</h1>
        <p className="text-text-secondary">Agrega a tu carrito los artículos que deseas comprar</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          onSearch={setSearch}
          placeholder="Buscar productos..."
        />
      </div>

      {/* Category Buttons */}
      {!isPending && (
        <div className="mb-6">
          <ButtonGroup
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      )}

      {/* Products Grid */}
      <div className="mb-6">
        {isPending ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-text-secondary">Cargando productos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-text-secondary">
            No hay productos disponibles
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {pagination.total > 0 && (
        <div className="fixed bottom-0 left-0 right-0 sm:left-64 bg-white border-t border-gray-200 p-6">
          <Pagination
            currentPage={page}
            totalPages={pagination.last_page}
            onPageChange={setPage}
            perPage={perPage}
            total={pagination.total}
            onPerPageChange={(newPerPage) => {
              setPerPage(newPerPage);
              setPage(1);
            }}
          />
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal />
    </div>
  );
}
