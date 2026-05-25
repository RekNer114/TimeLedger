import { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useCreateShift, useUpdateShift, useDeleteShift } from '../../hooks/useShifts';
import { useJobs } from '../../hooks/useJobs';
import { useAppStore } from '../../store/useAppStore';
import type { Shift, ShiftType } from '../../types';

interface ShiftFormProps {
  date: string;
  editShift?: Shift;
}

export function ShiftForm({ date, editShift }: ShiftFormProps) {
  const { closeModal } = useAppStore();
  const { data: jobs } = useJobs();
  const createShift = useCreateShift();
  const updateShift = useUpdateShift();
  const deleteShift = useDeleteShift();

  const [jobId, setJobId] = useState(editShift?.jobId || '');
  const [startTime, setStartTime] = useState(editShift?.startTime || '09:00');
  const [endTime, setEndTime] = useState(editShift?.endTime || '17:00');
  const [type, setType] = useState<ShiftType>(editShift?.type || 'day');
  const [notes, setNotes] = useState(editShift?.notes || '');

  useEffect(() => {
    if (!jobId && jobs && jobs.length > 0) {
      setJobId(jobs[0].id);
    }
  }, [jobs, jobId]);

  const calculateHours = (): number => {
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    let diff = (eh * 60 + em - (sh * 60 + sm)) / 60;
    if (diff < 0) diff += 24;
    return Math.round(diff * 10) / 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hours = calculateHours();
    const shiftData = { jobId, date, startTime, endTime, hours, type, notes };

    if (editShift) {
      await updateShift.mutateAsync({ id: editShift.id, data: shiftData });
    } else {
      await createShift.mutateAsync(shiftData);
    }
    closeModal();
  };

  const handleDelete = async () => {
    if (editShift) {
      await deleteShift.mutateAsync(editShift.id);
      closeModal();
    }
  };

  const jobOptions = (jobs || []).map((j) => ({ value: j.id, label: j.name }));
  const typeOptions = [
    { value: 'day', label: '☀️ Day shift' },
    { value: 'night', label: '🌙 Night shift' },
    { value: 'custom', label: '⚙️ Custom' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Job"
        options={jobOptions}
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Start time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <Input
          label="End time"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>

      <div className="text-sm text-dark-200">
        Total: <span className="text-accent-400 font-semibold">{calculateHours()}h</span>
      </div>

      <Select
        label="Shift type"
        options={typeOptions}
        value={type}
        onChange={(e) => setType(e.target.value as ShiftType)}
      />

      <Input
        label="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Any notes..."
      />

      <div className="flex gap-2 pt-2">
        {editShift && (
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            loading={deleteShift.isPending}
          >
            Delete
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
          Cancel
        </Button>
        <Button
          type="submit"
          loading={createShift.isPending || updateShift.isPending}
          className="flex-1"
        >
          {editShift ? 'Update' : 'Add'} Shift
        </Button>
      </div>
    </form>
  );
}
