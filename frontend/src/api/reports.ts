import { apiClient } from './client';

export const reportsApi = {
  exportData: async (type: 'csv' | 'pdf'): Promise<Blob> => {
    const res = await apiClient.get('/reports/export', {
      params: { type },
      responseType: 'blob',
    });
    return res.data;
  },
};
