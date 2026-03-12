import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { shoppingApi } from '@/shared/api/shopping.api';

export function useShopping(page: number = 1, perPage: number, search: string = '') {
  return useQuery({
    queryKey: ['shopping', page, perPage, search],
    queryFn: () => shoppingApi.index(page, perPage, search),
    placeholderData: keepPreviousData,
  });
}
