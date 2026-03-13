import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/buttons/Button';
import { formatNumber, toNumber } from '@/shared/helpers/format';

interface PurchaseHistoryItem {
  id: number;
  transaction_id: string;
  mercado_pago_payment_id: string;
  total_amount: number;
  status: 'pending' | 'paid' | 'rejected';
  created_at: string;
  products?: Array<{
    id: number;
    name: string;
    quantity: number;
    pivot: {
      unit_price: number;
    };
  }>;
}

interface PaymentSuccessProps {
  transactionData: any;
  purchaseHistory: PurchaseHistoryItem[];
}

export function PaymentSuccess({ transactionData, purchaseHistory }: PaymentSuccessProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pagado';
      case 'pending':
        return 'Pendiente';
      case 'rejected':
        return 'Rechazado';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-8">
        <div className="text-center space-y-4 py-6">
          <div className="text-5xl">✓</div>
          <h2 className="text-3xl font-bold text-green-900">¡Pago Exitoso!</h2>
          <p className="text-green-700">
            Tu pedido ha sido procesado correctamente
          </p>
          {transactionData?.mercado_pago_payment_id && (
            <p className="text-sm text-green-600 font-mono">
              ID de transacción: {transactionData.mercado_pago_payment_id}
            </p>
          )}
        </div>
      </div>

      {/* Purchase History */}
      {purchaseHistory && purchaseHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold">Historial de Compras</h3>
          </div>
          <div className="p-6 space-y-4">
            {purchaseHistory.map((purchase) => (
              <div
                key={purchase.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-600">
                      Transacción #{purchase.transaction_id}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(purchase.created_at).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(purchase.status)}`}>
                    {getStatusLabel(purchase.status)}
                  </div>
                </div>

                {/* Products in this purchase */}
                {purchase.products && purchase.products.length > 0 && (
                  <div className="mb-3 pb-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-900 mb-2">Productos:</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {purchase.products.map((product) => (
                        <li key={product.id} className="flex justify-between">
                          <span>
                            {product.name} x{product.quantity}
                          </span>
                          <span className="font-medium">
                            ${formatNumber(toNumber(product.pivot.unit_price) * product.quantity, 2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Total Amount */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-blue-600">
                    ${formatNumber(toNumber(purchase.total_amount), 2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={() => navigate('/shop')}
        variant="primary"
        className="w-full"
      >
        Continuar Comprando
      </Button>
    </div>
  );
}
