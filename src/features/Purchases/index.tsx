import { useState } from 'react';
import { useMyPurchases } from '@/shared/hooks/useMyPurchases';
import { PurchaseCard } from './components/PurchaseCard';
import { Pagination } from '@/shared/components/ui/Pagination';
import { ShoppingBag } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

export function PurchasesIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { items, pagination, isLoading, error } = useMyPurchases(currentPage, ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Mis Compras</h1>
          </div>
          <p className="text-gray-600">Historial de compras realizadas</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
            <span className="ml-3 text-gray-600">Cargando compras...</span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && items.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No hay compras aún</h2>
            <p className="text-gray-500">Comienza a comprar para ver tu historial aquí</p>
          </div>
        )}

        {/* Purchases Grid */}
        {!isLoading && items.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {items.map((purchase) => (
                <PurchaseCard key={purchase.id} purchase={purchase} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.lastPage > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.lastPage}
                  perPage={pagination.perPage}
                  total={pagination.total}
                  onPageChange={handlePageChange}
                  onPerPageChange={() => {}}
                />
              </div>
            )}

            {/* Info Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
              Mostrando {pagination.from} a {pagination.to} de {pagination.total} compra
              {pagination.total !== 1 ? 's' : ''}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
