import { formatNumber, toNumber } from '@/shared/helpers/format';
import type { CartItem } from '@/shared/context/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  totalAmount: number;
}

export function OrderSummary({ items, totalAmount }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + toNumber(item.price) * item.quantity, 0);
  const tax = subtotal * 0.15; // Assume 15% tax
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>

      <div className="space-y-4">
        {/* Items List */}
        <div className="space-y-3 pb-4 border-b border-gray-200">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.quantity} x ${formatNumber(toNumber(item.price), 2)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${formatNumber(toNumber(item.price) * item.quantity, 2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-2 pb-4 border-b border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${formatNumber(subtotal, 2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Impuestos (15%)</span>
            <span>${formatNumber(tax, 2)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total a Pagar</span>
          <span className="text-3xl font-bold text-blue-600">
            ${formatNumber(totalAmount, 2)}
          </span>
        </div>

        {/* Info */}
        <p className="text-xs text-gray-500 mt-4">
          Los precios incluyen todos los impuestos aplicables.
        </p>
      </div>
    </div>
  );
}
