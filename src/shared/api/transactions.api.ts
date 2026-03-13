import api from '@/shared/lib/axios';
import type { MercadoPagoPaymentStatus } from '@/shared/types/entities/Transaction';

export const transactions = {
  // Obtener todas las transacciones del usuario
  getAll: async (page: number = 1, perPage: number = 10) => {
    const response = await api.get(`/transactions`, {
      params: { page, per_page: perPage },
    });
    return response.data;
  },

  // Obtener una transacción específica
  getById: async (id: number) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  // Obtener el estado de un pago en Mercado Pago
  getPaymentStatus: async (paymentId: string): Promise<{ message: string; data: MercadoPagoPaymentStatus }> => {
    const response = await api.get(`/transactions/${paymentId}/status`);
    return response.data;
  },
};
