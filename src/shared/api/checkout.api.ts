import api from '@/shared/lib/axios';

export interface CheckoutPayload {
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
}

export interface CheckoutOrderResponse {
  message: string;
  data: {
    order_id: string;
    total_amount: number;
  };
}

export interface ProcessPaymentPayload {
  order_id: string;
  token: string;
  installments: number;
  payment_method_id?: string;
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
}

export interface ProcessPaymentResponse {
  message: string;
  data: {
    id: number;
    status: string;
    total_amount: number;
    products: Array<{
      id: number;
      name: string;
      pivot: {
        quantity: number;
        unit_price: number;
      };
    }>;
  };
}

export const checkout = {
  /**
   * Crear una orden de pago en Mercado Pago
   */
  createOrder: async (payload: CheckoutPayload): Promise<CheckoutOrderResponse> =>
    api.post('/checkout', payload),

  /**
   * Procesar el pago de una orden
   */
  processPayment: async (payload: ProcessPaymentPayload): Promise<ProcessPaymentResponse> =>
    api.post('/checkout/pay', payload),

  /**
   * Obtener historial de compras del usuario
   */
  getPurchaseHistory: async (page: number = 1) =>
    api.get(`/purchases?page=${page}`),
};
