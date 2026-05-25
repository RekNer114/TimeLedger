import { useQuery } from '@tanstack/react-query';
import { earningsApi } from '../api';

export function useEarnings(month: string) {
  return useQuery({
    queryKey: ['earnings', month],
    queryFn: () => earningsApi.getByMonth(month),
    enabled: !!month,
  });
}
