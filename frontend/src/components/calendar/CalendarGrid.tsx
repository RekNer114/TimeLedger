import dayjs from 'dayjs';
import { useMemo } from 'react';
import { ShiftBadge } from './ShiftBadge';
import { useAppStore } from '../../store/useAppStore';
import type { Shift, Job } from '../../types';

interface CalendarGridProps {
  month: string; // YYYY-MM
  shifts: Shift[];
  jobs: Job[];
  onDayClick: (date: string) => void;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function CalendarGrid({ month, shifts, jobs, onDayClick }: CalendarGridProps) {
  const { selectedDate } = useAppStore();

  const { days, startPad } = useMemo(() => {
    const start = dayjs(`${month}-01`);
    const daysInMonth = start.daysInMonth();
    // dayjs .day() returns 0=Sun. We want Mon=0.
    let pad = start.day() - 1;
    if (pad < 0) pad = 6;

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const d = start.add(i, 'day');
      return d.format('YYYY-MM-DD');
    });

    return { days, startPad: pad };
  }, [month]);

  const shiftsByDate = useMemo(() => {
    const map = new Map<string, Shift[]>();
    for (const s of shifts) {
      const arr = map.get(s.date) || [];
      arr.push(s);
      map.set(s.date, arr);
    }
    return map;
  }, [shifts]);

  const jobMap = useMemo(() => {
    const map = new Map<string, Job>();
    for (const j of jobs) map.set(j.id, j);
    return map;
  }, [jobs]);

  const today = dayjs().format('YYYY-MM-DD');

  return (
    <div className="glass-card p-3 sm:p-5">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((wd) => (
          <div
            key={wd}
            className="text-center text-xs font-medium text-dark-300 py-2"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty padding */}
        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {days.map((date) => {
          const dayShifts = shiftsByDate.get(date) || [];
          const isToday = date === today;
          const isSelected = date === selectedDate;
          const dayNum = dayjs(date).date();

          return (
            <button
              key={date}
              onClick={() => onDayClick(date)}
              className={`relative min-h-[60px] sm:min-h-[80px] p-1.5 rounded-xl text-left transition-all duration-200 cursor-pointer
                ${isSelected ? 'bg-accent-500/15 border border-accent-500/30' : 'hover:bg-dark-700 border border-transparent'}
                ${isToday ? 'ring-1 ring-accent-400/40' : ''}`}
            >
              <span
                className={`text-xs font-medium ${
                  isToday ? 'text-accent-400' : isSelected ? 'text-white' : 'text-dark-200'
                }`}
              >
                {dayNum}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayShifts.slice(0, 2).map((s) => {
                  const job = jobMap.get(s.jobId);
                  return (
                    <ShiftBadge
                      key={s.id}
                      shift={s}
                      jobName={job?.name || ''}
                      jobColor={job?.color || '#6366f1'}
                      compact
                    />
                  );
                })}
                {dayShifts.length > 2 && (
                  <span className="text-[9px] text-dark-300">
                    +{dayShifts.length - 2} more
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
