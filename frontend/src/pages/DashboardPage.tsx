import dayjs from 'dayjs';
import { Header } from '../components/layout/Header';
import { EarningsSummary } from '../components/domain/EarningsSummary';
import { CalendarGrid } from '../components/calendar/CalendarGrid';
import { ShiftForm } from '../components/domain/ShiftForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { useShifts } from '../hooks/useShifts';
import { useJobs } from '../hooks/useJobs';
import { useEarnings } from '../hooks/useEarnings';
import { useAppStore } from '../store/useAppStore';
import { useExportReport } from '../hooks/useReports';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
} from 'lucide-react';

export function DashboardPage() {
  const {
    currentMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    modalState,
    openModal,
    activeJobFilter,
  } = useAppStore();

  const { data: shifts = [], isLoading: shiftsLoading } = useShifts(
    currentMonth,
    activeJobFilter || undefined
  );
  const { data: jobs = [] } = useJobs();
  const { data: earnings, isLoading: earningsLoading } =
    useEarnings(currentMonth);
  const exportReport = useExportReport();

  const navigateMonth = (dir: number) => {
    const next = dayjs(`${currentMonth}-01`)
      .add(dir, 'month')
      .format('YYYY-MM');
    setCurrentMonth(next);
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleAddShift = () => {
    openModal('shift');
  };

  const monthLabel = dayjs(`${currentMonth}-01`).format('MMMM YYYY');

  // Get selected day's shifts for the detail panel
  const selectedDayShifts = shifts.filter((s) => s.date === selectedDate);

  return (
    <div className="space-y-6 animate-fade-in">
      <Header
        title="Dashboard"
        subtitle={monthLabel}
        actions={
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => exportReport.mutate('csv')}
              loading={exportReport.isPending}
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm" onClick={handleAddShift}>
              <Plus size={14} />
              <span className="hidden sm:inline">Add Shift</span>
            </Button>
          </div>
        }
      />

      {/* Earnings Summary Cards */}
      <EarningsSummary earnings={earnings} loading={earningsLoading} />

      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-xl hover:bg-dark-700 text-dark-200 hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold text-white">{monthLabel}</h2>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-xl hover:bg-dark-700 text-dark-200 hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar Grid */}
      {shiftsLoading ? (
        <div className="glass-card p-8">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="skeleton h-16 rounded-xl" />
            ))}
          </div>
        </div>
      ) : (
        <CalendarGrid
          month={currentMonth}
          shifts={shifts}
          jobs={jobs}
          onDayClick={handleDayClick}
        />
      )}

      {/* Selected Day Panel */}
      {selectedDayShifts.length > 0 && (
        <div className="glass-card p-4 sm:p-5 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">
              {dayjs(selectedDate).format('dddd, MMM D')}
            </h3>
            <span className="text-xs text-dark-300">
              {selectedDayShifts.length} shift
              {selectedDayShifts.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="space-y-2">
            {selectedDayShifts.map((shift) => {
              const job = jobs.find((j) => j.id === shift.jobId);
              return (
                <button
                  key={shift.id}
                  onClick={() => openModal('shift', shift)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 hover:bg-dark-600/50 transition-all text-left cursor-pointer"
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: job?.color || '#6366f1' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {job?.name || 'Unknown'}
                    </p>
                    <p className="text-xs text-dark-300">
                      {shift.startTime} – {shift.endTime} · {shift.hours}h
                    </p>
                  </div>
                  <FileText size={14} className="text-dark-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Shift Modal */}
      {modalState.isOpen && modalState.type === 'shift' && (
        <Modal
          title={modalState.data ? 'Edit Shift' : 'Add Shift'}
        >
          <ShiftForm
            date={selectedDate}
            editShift={modalState.data as import('../types').Shift | undefined}
          />
        </Modal>
      )}
    </div>
  );
}
