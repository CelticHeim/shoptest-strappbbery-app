import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useShopping } from './hooks/useShopping';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Pagination } from '@/shared/components/ui';
import { SearchBar } from '@/shared/components/ui';
import { ProductCard } from './components/ProductCard';
import { ButtonGroup } from './components/ButtonGroup';
import type { Product } from '@/shared/types/entities/Product';

export function Shopping() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  // Debounce search to avoid excessive API calls
  const debouncedSearch = useDebounce(search, 300);

  // Resetear página a 1 cuando cambia la búsqueda
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isPending, error } = useShopping(page, perPage, debouncedSearch);

  const products = data?.data?.data || [];
  const pagination = data?.data || {};

  // Extract unique categories from products
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean) as string[])
  );

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    // TODO: Show toast notification
  };

  if (error) {
    return <div className="text-center py-8 text-status-danger">Error al cargar productos</div>;
  }

  return (
    <div className="pb-32">
      {/* Header with cart button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tienda</h1>
        <div className="relative">
          <button className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition shadow-lg">
            <ShoppingCart className="w-6 h-6" />
          </button>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-status-danger text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          onSearch={setSearch}
          placeholder="Buscar productos..."
        />
      </div>

      {/* Category Buttons */}
      {categories.length > 0 && (
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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-text-secondary">
            No hay productos disponibles
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {pagination.total && (
        <div className="fixed bottom-0 left-0 right-0 sm:left-64 bg-white border-t border-gray-200 p-6">
          <Pagination
            currentPage={page}
            totalPages={pagination.last_page}
            onPageChange={setPage}
            perPage={perPage}
            onPerPageChange={(newPerPage) => {
              setPerPage(newPerPage);
              setPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
}
