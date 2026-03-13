import { useState } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { useTransactionStatus } from '@/shared/hooks/useTransactionStatus';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { formatNumber, toNumber } from '@/shared/helpers/format';
import type { Transaction } from '@/types/entities/transaction';

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const [copiedId, setCopiedId] = useState(false);
  const { status, isLoading: statusLoading, refetch } = useTransactionStatus(
    transaction.mercado_pago_payment_id
  );

  const handleCopyId = () => {
    navigator.clipboard.writeText(transaction.mercado_pago_payment_id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const transactionDate = new Date(transaction.created_at);
  const formattedDate = transactionDate.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = transactionDate.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">Transacción #{transaction.id}</p>
          <p className="text-gray-700 text-sm mt-1">
            {formattedDate} a las {formattedTime}
          </p>
        </div>
        <PaymentStatusBadge status={status?.status || 'unknown'} />
      </div>

      {/* Payment Status from Mercado Pago */}
      {status && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-gray-600 font-medium mb-1">Estado en Mercado Pago</p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{status.status.toUpperCase()}</span>
                {status.status_detail && ` - ${status.status_detail}`}
              </p>
            </div>
            <button
              onClick={() => refetch()}
              disabled={statusLoading}
              className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-50 transition-colors"
              title="Refrescar estado"
            >
              <RefreshCw className={`w-4 h-4 ${statusLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {status.date_last_updated && (
            <p className="text-xs text-gray-500">
              Actualizado: {new Date(status.date_last_updated).toLocaleString('es-MX')}
            </p>
          )}
        </div>
      )}

      {/* Amount Section */}
      <div className="border-t border-b border-gray-200 py-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Monto</span>
          <span className="text-2xl font-bold text-blue-600">
            ${formatNumber(toNumber(transaction.total_amount), 2)}
          </span>
        </div>
        {status && (
          <p className="text-xs text-gray-500 mt-1">
            Divisá: {status.currency_id} | Cuotas: {status.installments}
          </p>
        )}
      </div>

      {/* Payment ID Section */}
      <div className="space-y-2">
        <p className="text-xs text-gray-600 font-medium">ID de Pago (Mercado Pago)</p>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <p className="text-xs font-mono text-gray-700 break-all bg-gray-50 p-2 rounded">
              {transaction.mercado_pago_payment_id}
            </p>
          </div>
          <button
            onClick={handleCopyId}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Copiar ID"
          >
            {copiedId ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Products if available */}
      {transaction.products && transaction.products.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 font-medium mb-2">Productos ({transaction.products.length})</p>
          <div className="space-y-1">
            {transaction.products.map((product) => (
              <p key={product.id} className="text-sm text-gray-700">
                • {product.name} <span className="text-gray-500">x{product.pivot.quantity}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
