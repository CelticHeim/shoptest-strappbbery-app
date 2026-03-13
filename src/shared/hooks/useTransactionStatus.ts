import { useQuery, useQueryClient } from '@tanstack/react-query';
import { transactions } from '@/shared/api/transactions.api';
import type { MercadoPagoPaymentStatus } from '@/types/entities/transaction';

export function useTransactionStatus(paymentId: string | null) {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['transaction-status', paymentId],
    queryFn: async () => {
      if (!paymentId) {
        throw new Error('Payment ID is required');
      }
      const response = await transactions.getPaymentStatus(paymentId);
      return response.data;
    },
    enabled: !!paymentId,
  });

  const refreshStatus = async () => {
    if (paymentId) {
      await queryClient.invalidateQueries({ queryKey: ['transaction-status', paymentId] });
      await refetch();
    }
  };

  return {
    status: data as MercadoPagoPaymentStatus | undefined,
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'Error fetching status') : null,
    refetch: refreshStatus,
  };
}

export function useUserTransactions(page: number = 1, perPage: number = 10) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['transactions', page, perPage],
    queryFn: async () => {
      const response = (await transactions.getAll(page, perPage)) as any;
      return response.data;
    },
  });

  return {
    transactions: (data as any)?.data || [],
    pagination: {
      currentPage: (data as any)?.current_page || 1,
      lastPage: (data as any)?.last_page || 1,
      total: (data as any)?.total || 0,
      perPage: (data as any)?.per_page || perPage,
      from: (data as any)?.from || 0,
      to: (data as any)?.to || 0,
    },
    isLoading,
    error: error ? (error instanceof Error ? error.message : 'Error fetching transactions') : null,
    refetch,
  };
}
