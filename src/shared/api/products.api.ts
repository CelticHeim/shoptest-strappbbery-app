import client from '@/shared/lib/axios';
import type { ApiResponse, Paginate } from '@/shared/types/common';
import type { Product } from '@/shared/types/entities/Product';

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
    // Check if there's a file to upload
    const hasFile = data.image instanceof File;
    
    if (hasFile) {
      // Create FormData for multipart request
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', String(data.price));
      if (data.category) formData.append('category', data.category);
      if (data.description) formData.append('description', data.description);
      if (data.image instanceof File) formData.append('image', data.image);

      const response = await client.post<ApiResponse<Product>>('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }

    // Send as JSON if no file
    const response = await client.post<ApiResponse<Product>>('/products', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Product>) => {
    // Check if there's a file to upload
    const hasFile = data.image instanceof File;

    if (hasFile) {
      // Create FormData for multipart request
      const formData = new FormData();
      if (data.name) formData.append('name', data.name);
      if (data.price) formData.append('price', String(data.price));
      if (data.category) formData.append('category', data.category);
      if (data.description) formData.append('description', data.description);
      if (data.image instanceof File) formData.append('image', data.image);

      // Add _method for PUT request (Laravel requirement for multipart)
      formData.append('_method', 'PUT');

      const response = await client.post<ApiResponse<Product>>(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }

    // Send as JSON if no file
    const response = await client.put<ApiResponse<Product>>(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await client.delete<ApiResponse<{ message: string }>>(`/products/${id}`);
    return response.data;
  },
};
