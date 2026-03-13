import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { useUserTransactions } from '@/shared/hooks/useTransactionStatus';
import { TransactionCard } from './components/TransactionCard';
import { Pagination } from '@/shared/components/ui/Pagination';

const ITEMS_PER_PAGE = 8;

export function TransactionsIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const { transactions, pagination, isLoading, error } = useUserTransactions(
    currentPage,
    ITEMS_PER_PAGE
  );

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
            <CreditCard className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Transacciones Mercado Pago</h1>
          </div>
          <p className="text-gray-600">Historial de transacciones y estados de pago</p>
        </div>

        {/* Info Box */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            Aquí puedes ver todas tus transacciones y consultar su estado actual en Mercado Pago. 
            Los estados se actualizan en tiempo real.
          </p>
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
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <span className="ml-3 text-gray-600">Cargando transacciones...</span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && transactions.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No hay transacciones aún
            </h2>
            <p className="text-gray-500">
              Realiza una compra para que aparezca aquí el historial de transacciones
            </p>
          </div>
        )}

        {/* Transactions Grid */}
        {!isLoading && transactions.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
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
              Mostrando {pagination.from} a {pagination.to} de {pagination.total} transacción
              {pagination.total !== 1 ? 'es' : ''}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
