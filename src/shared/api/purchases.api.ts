import api from '@/shared/lib/axios';
import type { PurchasesResponse } from '@/types/entities/purchase';

interface GetPurchasesParams {
  page?: number;
  per_page?: number;
}

export const purchases = {
  /**
   * Obtener historial de compras del usuario autenticado
   */
  getHistory: async (params?: GetPurchasesParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());

    const query = queryParams.toString() ? `?${queryParams}` : '';
    return api.get<PurchasesResponse>(`/purchases${query}`);
  },
};
