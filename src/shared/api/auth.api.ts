import client from '@/shared/lib/axios';
import type { ApiResponse } from '@/shared/types/common';
import type { User } from '@/shared/types/entities/User';

export interface LoginResponse {
  access_token: string;
  user: User;
}

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await client.post<ApiResponse<LoginResponse>>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  user: async () => {
    const response = await client.get<ApiResponse<User>>('/auth/user');
    return response.data;
  },

  refresh: async () => {
    const response = await client.post<ApiResponse<LoginResponse>>('/auth/refresh');
    return response.data;
  },

  logout: async () => {
    const response = await client.post<ApiResponse<{ message: string }>>('/auth/logout');
    return response.data;
  },
};
