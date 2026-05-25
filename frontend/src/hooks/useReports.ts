import { useMutation } from '@tanstack/react-query';
import { reportsApi } from '../api';

export function useExportReport() {
  return useMutation({
    mutationFn: (type: 'csv' | 'pdf') => reportsApi.exportData(type),
    onSuccess: (blob, type) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report.${type}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  });
}
