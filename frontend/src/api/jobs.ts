import { apiClient } from './client';
import type { Job } from '../types';

export const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    const res = await apiClient.get<Job[]>('/jobs');
    return res.data;
  },

  create: async (data: Omit<Job, 'id'>): Promise<Job> => {
    const res = await apiClient.post<Job>('/jobs', data);
    return res.data;
  },

  update: async (id: string, data: Partial<Job>): Promise<Job> => {
    const res = await apiClient.put<Job>(`/jobs/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/jobs/${id}`);
  },
};
