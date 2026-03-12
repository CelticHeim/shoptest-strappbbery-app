import client from '../lib/axios';
import type { ApiResponse, Paginate } from '../types/common';
import type { Product } from '../types/entities/Product';

export const productsApi = {
  list: async (page = 1, perPage = 10, search?: string) => {
    const response = await client.get<ApiResponse<Paginate<Product>>>('/products', {
      params: { page, perPage, search },
    });
    return response.data;
  },

  get: async (id: number) => {
    const response = await client.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },

  create: async (data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    const response = await client.post<ApiResponse<Product>>('/products', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Product>) => {
    const response = await client.put<ApiResponse<Product>>(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await client.delete<ApiResponse<{ message: string }>>(`/products/${id}`);
    return response.data;
  },
};
