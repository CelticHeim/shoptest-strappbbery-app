import { useQuery } from '@tanstack/react-query';
import { purchases } from '@/shared/api/purchases.api';

export function useMyPurchases(page: number = 1, perPage: number = 10) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['purchases', page, perPage],
    queryFn: async () => {
      const response = (await purchases.getHistory({ page, per_page: perPage })) as any;
      // response.data = { message: "...", data: { current_page, data: [...], ... } }
      // Extraer el objeto de paginación correctamente
      return response.data.data;
    },
  });

  return {
    items: (data as any)?.data || [],
    pagination: {
      currentPage: (data as any)?.current_page || 1,
      lastPage: (data as any)?.last_page || 1,
      total: (data as any)?.total || 0,
      perPage: (data as any)?.per_page || perPage,
      from: (data as any)?.from || 0,
      to: (data as any)?.to || 0,
    },
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'Error fetching purchases') : null,
    refetch,
  };
}
