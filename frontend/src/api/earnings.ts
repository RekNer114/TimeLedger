import { apiClient } from './client';
import type { Earnings } from '../types';

export const earningsApi = {
  getByMonth: async (month: string): Promise<Earnings> => {
    const res = await apiClient.get<Earnings>('/earnings', {
      params: { month },
    });
    return res.data;
  },
};
