// ── Data Models ──────────────────────────────────────────

export type Job = {
  id: string;
  name: string;
  type: 'hourly' | 'monthly';
  hourlyRate?: number;
  monthlySalary?: number;
  taxRate: number;
  color?: string;
};

export type ShiftType = 'day' | 'night' | 'custom';

export type Shift = {
  id: string;
  jobId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  hours: number;
  type: ShiftType;
  notes?: string;
};

export type Earnings = {
  month: string; // YYYY-MM
  totalHours: number;
  grossEarnings: number;
  taxAmount: number;
  netEarnings: number;
  breakdownByJob: JobEarnings[];
};

export type JobEarnings = {
  jobId: string;
  jobName: string;
  hours: number;
  gross: number;
  tax: number;
  net: number;
};

// ── Auth ─────────────────────────────────────────────────

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

// ── API ──────────────────────────────────────────────────

export type ApiError = {
  message: string;
  status: number;
};
