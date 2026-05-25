import dayjs from 'dayjs';
import { Header } from '../components/layout/Header';
import { CalendarGrid } from '../components/calendar/CalendarGrid';
import { ShiftForm } from '../components/domain/ShiftForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { useShifts } from '../hooks/useShifts';
import { useJobs } from '../hooks/useJobs';
import { useAppStore } from '../store/useAppStore';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Shift } from '../types';

export function CalendarPage() {
  const {
    currentMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    activeJobFilter,
    setActiveJobFilter,
    modalState,
    openModal,
  } = useAppStore();

  const { data: shifts = [], isLoading } = useShifts(
    currentMonth,
    activeJobFilter || undefined
  );
  const { data: jobs = [] } = useJobs();

  const navigateMonth = (dir: number) => {
    const next = dayjs(`${currentMonth}-01`)
      .add(dir, 'month')
      .format('YYYY-MM');
    setCurrentMonth(next);
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    openModal('shift');
  };

  const monthLabel = dayjs(`${currentMonth}-01`).format('MMMM YYYY');

  const jobFilterOptions = [
    { value: '', label: 'All Jobs' },
    ...jobs.map((j) => ({ value: j.id, label: j.name })),
  ];

  // Get shifts for selected day
  const dayShifts = shifts.filter((s) => s.date === selectedDate);

  return (
    <div className="space-y-6 animate-fade-in">
      <Header
        title="Calendar"
        subtitle="Manage your schedule"
        actions={
          <Button size="sm" onClick={() => openModal('shift')}>
            <Plus size={14} />
            Add Shift
          </Button>
        }
      />

      {/* Controls bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-xl hover:bg-dark-700 text-dark-200 hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold text-white min-w-[160px] text-center">
            {monthLabel}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-xl hover:bg-dark-700 text-dark-200 hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="w-48">
          <Select
            options={jobFilterOptions}
            value={activeJobFilter || ''}
            onChange={(e) =>
              setActiveJobFilter(e.target.value || null)
            }
          />
        </div>
      </div>

      {/* Calendar */}
      {isLoading ? (
        <div className="glass-card p-8">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="skeleton h-20 rounded-xl" />
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

      {/* Day's shifts list */}
      {dayShifts.length > 0 && (
        <div className="glass-card p-4 sm:p-5 animate-slide-up">
          <h3 className="text-sm font-semibold text-white mb-3">
            {dayjs(selectedDate).format('dddd, MMMM D')} — {dayShifts.length}{' '}
            shift{dayShifts.length > 1 ? 's' : ''}
          </h3>
          <div className="space-y-2">
            {dayShifts.map((shift) => {
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
                    <p className="text-sm font-medium text-white">
                      {job?.name || 'Unknown'}
                    </p>
                    <p className="text-xs text-dark-300">
                      {shift.startTime} – {shift.endTime} · {shift.hours}h ·{' '}
                      {shift.type}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Shift Modal */}
      {modalState.isOpen && modalState.type === 'shift' && (
        <Modal title={modalState.data ? 'Edit Shift' : 'New Shift'}>
          <ShiftForm
            date={selectedDate}
            editShift={modalState.data as Shift | undefined}
          />
        </Modal>
      )}
    </div>
  );
}
