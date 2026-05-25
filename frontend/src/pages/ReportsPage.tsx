import dayjs from 'dayjs';
import { Header } from '../components/layout/Header';
import { EarningsSummary } from '../components/domain/EarningsSummary';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useEarnings } from '../hooks/useEarnings';
import { useExportReport } from '../hooks/useReports';
import { useAppStore } from '../store/useAppStore';
import { formatCurrency, formatHours } from '../utils/colors';
import { ChevronLeft, ChevronRight, Download, FileDown } from 'lucide-react';

export function ReportsPage() {
  const { currentMonth, setCurrentMonth } = useAppStore();
  const { data: earnings, isLoading } = useEarnings(currentMonth);
  const exportReport = useExportReport();

  const navigateMonth = (dir: number) => {
    const next = dayjs(`${currentMonth}-01`).add(dir, 'month').format('YYYY-MM');
    setCurrentMonth(next);
  };

  const monthLabel = dayjs(`${currentMonth}-01`).format('MMMM YYYY');

  return (
    <div className="space-y-6 animate-fade-in">
      <Header
        title="Reports"
        subtitle="Monthly earnings breakdown"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => exportReport.mutate('csv')} loading={exportReport.isPending}>
              <Download size={14} /> CSV
            </Button>
            <Button size="sm" onClick={() => exportReport.mutate('pdf')} loading={exportReport.isPending}>
              <FileDown size={14} /> PDF
            </Button>
          </div>
        }
      />

      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigateMonth(-1)} className="p-2 rounded-xl hover:bg-dark-700 text-dark-200 hover:text-white transition-all cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold text-white">{monthLabel}</h2>
        <button onClick={() => navigateMonth(1)} className="p-2 rounded-xl hover:bg-dark-700 text-dark-200 hover:text-white transition-all cursor-pointer">
          <ChevronRight size={20} />
        </button>
      </div>

      <EarningsSummary earnings={earnings} loading={isLoading} />

      {/* Job breakdown table */}
      {earnings?.breakdownByJob && earnings.breakdownByJob.length > 0 && (
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Breakdown by Job</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-dark-300 border-b border-dark-600/50">
                  <th className="pb-3 font-medium">Job</th>
                  <th className="pb-3 font-medium text-right">Hours</th>
                  <th className="pb-3 font-medium text-right">Gross</th>
                  <th className="pb-3 font-medium text-right">Tax</th>
                  <th className="pb-3 font-medium text-right">Net</th>
                </tr>
              </thead>
              <tbody>
                {earnings.breakdownByJob.map((row) => (
                  <tr key={row.jobId} className="border-b border-dark-700/50 last:border-0">
                    <td className="py-3 text-white font-medium">{row.jobName}</td>
                    <td className="py-3 text-right text-dark-200">{formatHours(row.hours)}</td>
                    <td className="py-3 text-right text-dark-200">{formatCurrency(row.gross)}</td>
                    <td className="py-3 text-right text-warning">{formatCurrency(row.tax)}</td>
                    <td className="py-3 text-right text-success font-medium">{formatCurrency(row.net)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-dark-500/50 font-semibold">
                  <td className="pt-3 text-white">Total</td>
                  <td className="pt-3 text-right text-white">{formatHours(earnings.totalHours)}</td>
                  <td className="pt-3 text-right text-white">{formatCurrency(earnings.grossEarnings)}</td>
                  <td className="pt-3 text-right text-warning">{formatCurrency(earnings.taxAmount)}</td>
                  <td className="pt-3 text-right text-success">{formatCurrency(earnings.netEarnings)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      )}

      {!isLoading && !earnings && (
        <Card className="text-center py-12">
          <p className="text-dark-300">No earnings data for this month.</p>
        </Card>
      )}
    </div>
  );
}
