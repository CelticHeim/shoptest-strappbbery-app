import { formatNumber, toNumber } from '@/shared/helpers/format';
import { Badge } from '@/shared/components/ui/Badge';
import type { Purchase } from '@/types/entities/purchase';

interface PurchaseCardProps {
  purchase: Purchase;
}

const statusConfig = {
  approved: { color: 'bg-green-100 text-green-800', label: 'Aprobado' },
  pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pendiente' },
  in_process: { color: 'bg-blue-100 text-blue-800', label: 'En proceso' },
  rejected: { color: 'bg-red-100 text-red-800', label: 'Rechazado' },
  cancelled: { color: 'bg-gray-100 text-gray-800', label: 'Cancelado' },
};

export function PurchaseCard({ purchase }: PurchaseCardProps) {
  const statusInfo = statusConfig[purchase.status] || statusConfig.pending;
  const purchaseDate = new Date(purchase.created_at);
  const formattedDate = purchaseDate.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = purchaseDate.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">Orden #{purchase.id}</p>
          <p className="text-gray-700 text-sm mt-1">
            {formattedDate} a las {formattedTime}
          </p>
        </div>
        <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
      </div>

      {/* Products */}
      <div className="border-t border-b border-gray-200 py-4 mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Productos</h4>
        <div className="space-y-2">
          {purchase.products.map((product) => (
            <div key={product.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="text-gray-700 font-medium">{product.name}</p>
                <p className="text-gray-500">
                  Cantidad: {product.pivot.quantity} × ${formatNumber(toNumber(product.pivot.unit_price), 2)}
                </p>
              </div>
              <p className="font-semibold text-gray-900">
                ${formatNumber(toNumber(product.pivot.unit_price) * product.pivot.quantity, 2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total and Payment ID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-700">Total</span>
          <span className="text-2xl font-bold text-blue-600">
            ${formatNumber(toNumber(purchase.total_amount), 2)}
          </span>
        </div>
        {purchase.mercado_pago_payment_id && (
          <div className="pt-3 border-t">
            <p className="text-xs text-gray-500">ID de Pago</p>
            <p className="text-xs font-mono text-gray-700 break-all">
              {purchase.mercado_pago_payment_id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
