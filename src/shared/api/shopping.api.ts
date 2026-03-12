import client from '../lib/axios';
import type { Product } from '@/shared/types/entities/Product';
import type { ApiResponse, Paginate } from '../types/common';

export const shoppingApi = {
  index: async (page: number = 1, perPage: number, search: string = '') => {
    const response = await client.get<ApiResponse<Paginate<Product>>>('/shopping', {
      params: { page, perPage, search },
    });
    return response.data;
  },
};
