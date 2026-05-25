import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shiftsApi } from '../api';
import type { Shift } from '../types';

export function useShifts(month?: string, jobId?: string) {
  return useQuery({
    queryKey: ['shifts', month, jobId],
    queryFn: () =>
      shiftsApi.getAll({
        month: month || undefined,
        jobId: jobId || undefined,
      }),
  });
}

export function useCreateShift() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Shift, 'id'>) => shiftsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['shifts'] }),
  });
}

export function useUpdateShift() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Shift> }) =>
      shiftsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['shifts'] }),
  });
}

export function useDeleteShift() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => shiftsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['shifts'] }),
  });
}
