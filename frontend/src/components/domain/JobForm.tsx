import { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useCreateJob, useUpdateJob, useDeleteJob } from '../../hooks/useJobs';
import { useAppStore } from '../../store/useAppStore';
import { JOB_COLORS } from '../../utils/colors';
import type { Job } from '../../types';

interface JobFormProps {
  editJob?: Job;
}

export function JobForm({ editJob }: JobFormProps) {
  const { closeModal } = useAppStore();
  const createJob = useCreateJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();

  const [name, setName] = useState(editJob?.name || '');
  const [type, setType] = useState<'hourly' | 'monthly'>(editJob?.type || 'hourly');
  const [hourlyRate, setHourlyRate] = useState(editJob?.hourlyRate?.toString() || '');
  const [monthlySalary, setMonthlySalary] = useState(editJob?.monthlySalary?.toString() || '');
  const [taxRate, setTaxRate] = useState(editJob?.taxRate?.toString() || '20');
  const [color, setColor] = useState(editJob?.color || JOB_COLORS[0]);

  useEffect(() => {
    if (type === 'hourly') setMonthlySalary('');
    else setHourlyRate('');
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobData = {
      name,
      type,
      hourlyRate: type === 'hourly' ? parseFloat(hourlyRate) : undefined,
      monthlySalary: type === 'monthly' ? parseFloat(monthlySalary) : undefined,
      taxRate: parseFloat(taxRate),
      color,
    };

    if (editJob) {
      await updateJob.mutateAsync({ id: editJob.id, data: jobData });
    } else {
      await createJob.mutateAsync(jobData);
    }
    closeModal();
  };

  const handleDelete = async () => {
    if (editJob) {
      await deleteJob.mutateAsync(editJob.id);
      closeModal();
    }
  };

  const typeOptions = [
    { value: 'hourly', label: 'Hourly rate' },
    { value: 'monthly', label: 'Monthly salary' },
  ];

  const taxPresets = [
    { value: '0', label: 'No tax (0%)' },
    { value: '10', label: 'Low (10%)' },
    { value: '20', label: 'Standard (20%)' },
    { value: '30', label: 'High (30%)' },
    { value: 'custom', label: 'Custom...' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Job name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Warehouse, Cafe..."
        required
      />

      <Select
        label="Payment type"
        options={typeOptions}
        value={type}
        onChange={(e) => setType(e.target.value as 'hourly' | 'monthly')}
      />

      {type === 'hourly' ? (
        <Input
          label="Hourly rate ($)"
          type="number"
          step="0.01"
          min="0"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          placeholder="15.00"
          required
        />
      ) : (
        <Input
          label="Monthly salary ($)"
          type="number"
          step="0.01"
          min="0"
          value={monthlySalary}
          onChange={(e) => setMonthlySalary(e.target.value)}
          placeholder="3000.00"
          required
        />
      )}

      <div>
        <Select
          label="Tax rate"
          options={taxPresets}
          value={taxPresets.find((p) => p.value === taxRate) ? taxRate : 'custom'}
          onChange={(e) => {
            if (e.target.value !== 'custom') setTaxRate(e.target.value);
          }}
        />
        {!taxPresets.find((p) => p.value === taxRate) && (
          <Input
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            placeholder="Tax %"
            className="mt-2"
          />
        )}
      </div>

      {/* Color picker */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-dark-200">Color</label>
        <div className="flex flex-wrap gap-2">
          {JOB_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-lg transition-all cursor-pointer ${
                color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-800 scale-110' : 'hover:scale-105'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        {editJob && (
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            loading={deleteJob.isPending}
          >
            Delete
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={closeModal} className="flex-1">
          Cancel
        </Button>
        <Button
          type="submit"
          loading={createJob.isPending || updateJob.isPending}
          className="flex-1"
        >
          {editJob ? 'Update' : 'Create'} Job
        </Button>
      </div>
    </form>
  );
}
