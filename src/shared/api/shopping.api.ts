import client from '../lib/axios';
import type { Product } from '@/shared/types/entities/Product';
import type { ApiResponse, Paginate } from '../types/common';

export const shoppingApi = {
  index: async (page: number = 1, perPage: number, search: string = '', category: string | null = null) => {
    const params: Record<string, any> = { page, perPage, search };
    
    if (category) {
      params.categories = category;
    }
    
    const response = await client.get<ApiResponse<Paginate<Product>>>('/shopping', {
      params,
    });
    return response.data;
  },
};
