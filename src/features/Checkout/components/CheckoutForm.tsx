import { useState } from 'react';
import { useCheckout } from '@/shared/hooks/useCheckout';
import { Button } from '@/shared/components/buttons/Button';
import { Input } from '@/shared/components/form/Input';
import { Select } from '@/shared/components/form/Select';
import { formatNumber, toNumber } from '@/shared/helpers/format';
import { tokenizeCard } from '@/shared/utils/mercadopago-tokenizer';
import type { CartItem } from '@/shared/context/CartContext';

interface CheckoutFormProps {
  orderId: string;
  totalAmount: number;
  cartItems: CartItem[];
  onSuccess: (transactionData: any) => void;
  onError: (error: any) => void;
}

export function CheckoutForm({
  orderId,
  totalAmount,
  cartItems,
  onSuccess,
  onError,
}: CheckoutFormProps) {
  const checkout = useCheckout();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    installments: '1',
    paymentMethodId: 'credit_card',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 13) {
      errors.cardNumber = 'Número de tarjeta inválido';
    }

    if (!formData.cardHolder || formData.cardHolder.trim().length < 3) {
      errors.cardHolder = 'Nombre del titular requerido';
    }

    if (!formData.expiryMonth || !formData.expiryYear) {
      errors.expiry = 'Vencimiento requerido';
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      errors.cvv = 'CVV inválido';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      // Format card number with spaces
      const formatted = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    try {
      checkout.reset();

      // Tokenize card using Mercado Pago API
      const token = await tokenizeCard({
        cardNumber: formData.cardNumber,
        cardHolder: formData.cardHolder,
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cvv: formData.cvv,
      });

      const transactionData = await checkout.processPayment(
        orderId,
        token,
        parseInt(formData.installments),
        cartItems,
        formData.paymentMethodId
      );

      onSuccess(transactionData);
    } catch (error) {
      console.error('Payment error:', error);
      onError(error);
      alert(`Payment error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Detalles de Pago</h2>
        <p className="text-gray-600 text-sm mt-1">Ingresa los datos de tu tarjeta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number */}
        <div>
          <Input
            type="text"
            name="cardNumber"
            label="Número de Tarjeta"
            placeholder="4111 1111 1111 1111"
            maxLength={19}
            value={formData.cardNumber}
            onChange={handleInputChange}
            error={validationErrors.cardNumber}
          />
        </div>

        {/* Card Holder */}
        <div>
          <Input
            type="text"
            name="cardHolder"
            label="Nombre del Titular"
            placeholder="Juan Pérez"
            value={formData.cardHolder}
            onChange={handleInputChange}
            error={validationErrors.cardHolder}
          />
        </div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-3 gap-4">
          <Select
            name="expiryMonth"
            label="Mes"
            value={formData.expiryMonth}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'MM' },
              ...Array.from({ length: 12 }, (_, i) => ({
                value: String(i + 1).padStart(2, '0'),
                label: String(i + 1).padStart(2, '0'),
              })),
            ]}
          />

          <Select
            name="expiryYear"
            label="Año"
            value={formData.expiryYear}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'YY' },
              ...Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return {
                  value: String(year).slice(-2),
                  label: String(year).slice(-2),
                };
              }),
            ]}
          />

          <Input
            type="password"
            name="cvv"
            label="CVV"
            placeholder="123"
            maxLength={4}
            value={formData.cvv}
            onChange={handleInputChange}
            error={validationErrors.cvv}
          />
        </div>

        {validationErrors.expiry && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
            {validationErrors.expiry}
          </div>
        )}

        {/* Installments */}
        <Select
          name="installments"
          label="Cuotas"
          value={formData.installments}
          onChange={handleInputChange}
          options={[
            { value: '1', label: 'Sin interés (1x)' },
            { value: '3', label: '3 cuotas' },
            { value: '6', label: '6 cuotas' },
            { value: '12', label: '12 cuotas' },
          ]}
        />

        {/* Errors */}
        {checkout.error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
            {checkout.error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={checkout.loading}
          variant="primary"
          className="w-full mt-8"
        >
          {checkout.loading ? 'Procesando pago...' : `Pagar $${formatNumber(toNumber(totalAmount), 2)}`}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          🔒 Tu información está protegida por Mercado Pago
        </p>
      </form>
    </div>
  );
}
