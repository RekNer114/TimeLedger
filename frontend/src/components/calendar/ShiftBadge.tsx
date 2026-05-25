import type { Shift } from '../../types';

interface ShiftBadgeProps {
  shift: Shift;
  jobName: string;
  jobColor: string;
  compact?: boolean;
}

export function ShiftBadge({ shift, jobName, jobColor, compact }: ShiftBadgeProps) {
  const typeLabels: Record<string, string> = {
    day: '☀️',
    night: '🌙',
    custom: '⚙️',
  };

  if (compact) {
    return (
      <div
        className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium truncate"
        style={{ backgroundColor: `${jobColor}20`, color: jobColor }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: jobColor }}
        />
        <span className="truncate">{shift.hours}h</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all hover:scale-[1.02]"
      style={{
        backgroundColor: `${jobColor}12`,
        border: `1px solid ${jobColor}30`,
      }}
    >
      <span
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: jobColor }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white text-sm truncate">{jobName}</p>
        <p className="text-xs text-dark-200">
          {typeLabels[shift.type] || ''} {shift.startTime}–{shift.endTime} · {shift.hours}h
        </p>
      </div>
    </div>
  );
}
