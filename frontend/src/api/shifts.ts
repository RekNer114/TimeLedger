import { apiClient } from './client';
import type { Shift } from '../types';

export const shiftsApi = {
  getAll: async (params?: { month?: string; jobId?: string }): Promise<Shift[]> => {
    const res = await apiClient.get<Shift[]>('/shifts', { params });
    return res.data;
  },

  create: async (data: Omit<Shift, 'id'>): Promise<Shift> => {
    const res = await apiClient.post<Shift>('/shifts', data);
    return res.data;
  },

  update: async (id: string, data: Partial<Shift>): Promise<Shift> => {
    const res = await apiClient.put<Shift>(`/shifts/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/shifts/${id}`);
  },
};
