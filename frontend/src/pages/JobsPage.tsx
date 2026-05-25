import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { JobForm } from '../components/domain/JobForm';
import { useJobs } from '../hooks/useJobs';
import { useAppStore } from '../store/useAppStore';
import { formatCurrency } from '../utils/colors';
import { Plus, Briefcase, Edit2 } from 'lucide-react';
import type { Job } from '../types';

export function JobsPage() {
  const { data: jobs = [], isLoading } = useJobs();
  const { modalState, openModal } = useAppStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <Header
        title="Jobs"
        subtitle={`${jobs.length} active job${jobs.length !== 1 ? 's' : ''}`}
        actions={
          <Button size="sm" onClick={() => openModal('job')}>
            <Plus size={14} />
            Add Job
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass-card p-5">
              <div className="space-y-3">
                <div className="skeleton h-5 w-32" />
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <Card className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
            <Briefcase size={28} className="text-dark-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No jobs yet</h3>
          <p className="text-dark-300 text-sm mb-6 max-w-xs mx-auto">
            Add your first job to start tracking shifts and earnings.
          </p>
          <Button onClick={() => openModal('job')}>
            <Plus size={14} />
            Create Your First Job
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card key={job.id} className="cursor-pointer group" onClick={() => openModal('job', job)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: `${job.color || '#6366f1'}15`, color: job.color || '#6366f1' }}
                  >
                    {job.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{job.name}</h3>
                    <span className="text-xs text-dark-300 capitalize">{job.type}</span>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-dark-600 transition-all cursor-pointer">
                  <Edit2 size={14} className="text-dark-300" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-300">{job.type === 'hourly' ? 'Rate' : 'Salary'}</span>
                  <span className="text-white font-medium">
                    {job.type === 'hourly' ? `${formatCurrency(job.hourlyRate || 0)}/hr` : `${formatCurrency(job.monthlySalary || 0)}/mo`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-300">Tax rate</span>
                  <span className="text-white font-medium">{job.taxRate}%</span>
                </div>
              </div>
              <div className="mt-4 h-1 rounded-full opacity-60" style={{ backgroundColor: job.color || '#6366f1' }} />
            </Card>
          ))}
        </div>
      )}

      {modalState.isOpen && modalState.type === 'job' && (
        <Modal title={modalState.data ? 'Edit Job' : 'New Job'}>
          <JobForm editJob={modalState.data as Job | undefined} />
        </Modal>
      )}
    </div>
  );
}
