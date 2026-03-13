import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCart } from '@/shared/context/CartContext';
import { useCheckout } from '@/shared/hooks/useCheckout';
import { Button } from '@/shared/components/buttons/Button';
import { formatNumber, toNumber } from '@/shared/helpers/format';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderSummary } from './components/OrderSummary';
import { PaymentSuccess } from './components/PaymentSuccess';

export function CheckoutIndex() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { items, clearCart } = useCart();
  const checkout = useCheckout();
  const [step, setStep] = useState<'summary' | 'payment' | 'success'>('summary');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState<number | null>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
  const [transactionData, setTransactionData] = useState<any>(null);

  // Calculate total from items
  const cartTotal = items.reduce((sum, item) => sum + toNumber(item.price) * item.quantity, 0);

  // Si no hay items en el carrito, redirigir al carrito
  useEffect(() => {
    if (items.length === 0 && step === 'summary') {
      navigate('/shop');
    }
  }, [items, navigate, step]);

  const handleCreateOrder = async () => {
    try {
      checkout.reset();
      const orderData = await checkout.createOrder(items);
      setOrderId(orderData.order_id);
      setOrderTotal(orderData.total_amount);
      setStep('payment');
    } catch (error) {
      console.error('Error creating order:', error);
      alert(`Error creating order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handlePaymentSuccess = async (transactionData: any) => {
    try {
      // Store transaction data
      setTransactionData(transactionData);

      // Limpiar el carrito
      clearCart();

      // Invalidar el cache de purchases para refetch automático
      await queryClient.invalidateQueries({ queryKey: ['purchases'] });

      // Obtener el historial de compras actualizado
      const history = await checkout.getPurchaseHistory(1);
      setPurchaseHistory(history.data || []);

      setStep('success');
    } catch (error) {
      console.error('Error after payment:', error);
      // Mostrar error pero mantener el estado de éxito del pago
      setStep('success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Completa tu compra de forma segura</p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center ${step === 'summary' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-2 ${step === 'summary' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-white'}`}>
              1
            </div>
            <span>Resumen</span>
          </div>

          <div className="flex-1 h-1 mx-4 bg-gray-300"></div>

          <div className={`flex items-center ${step === 'payment' ? 'text-blue-600' : step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-2 ${step === 'payment' ? 'bg-blue-600 text-white' : step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-white'}`}>
              2
            </div>
            <span>Pago</span>
          </div>

          <div className="flex-1 h-1 mx-4 bg-gray-300"></div>

          <div className={`flex items-center ${step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-2 ${step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-white'}`}>
              3
            </div>
            <span>Confirmación</span>
          </div>
        </div>

        {/* Content */}
        {step === 'summary' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <OrderSummary items={items} totalAmount={cartTotal} />
            </div>
            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h2 className="text-lg font-semibold">Total del Pedido</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${formatNumber(cartTotal, 2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ${formatNumber(cartTotal, 2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateOrder}
                    disabled={checkout.loading || items.length === 0}
                    variant="primary"
                    className="w-full mt-6"
                  >
                    {checkout.loading ? 'Preparando pago...' : 'Proceder al Pago'}
                  </Button>

                  {checkout.error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                      {checkout.error}
                    </div>
                  )}

                  <Button
                    onClick={() => navigate('/shop')}
                    variant="secondary"
                    className="w-full mt-2"
                  >
                    Volver al Carrito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'payment' && orderId && orderTotal && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <CheckoutForm
                orderId={orderId}
                totalAmount={orderTotal}
                cartItems={items}
                onSuccess={handlePaymentSuccess}
                onError={() => checkout.reset()}
              />
            </div>
            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h2 className="text-lg font-semibold">Resumen del Pago</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Monto a Pagar</p>
                    <p className="text-3xl font-bold text-blue-600">${formatNumber(toNumber(orderTotal), 2)}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">Orden ID: <span className="font-mono text-gray-900">{orderId}</span></p>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold text-sm mb-2">Productos</h3>
                    <ul className="space-y-1 text-sm">
                      {items.map((item) => (
                        <li key={item.id} className="flex justify-between text-gray-600">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${formatNumber(toNumber(item.price) * item.quantity, 2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500">🔒 Pago seguro procesado por Mercado Pago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'success' && transactionData && (
          <PaymentSuccess
            transactionData={transactionData}
            purchaseHistory={purchaseHistory}
          />
        )}
      </div>
    </div>
  );
}
