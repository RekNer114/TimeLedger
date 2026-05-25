// Predefined job color palette
export const JOB_COLORS = [
  '#6366f1', // indigo
  '#f43f5e', // rose
  '#10b981', // emerald
  '#f59e0b', // amber
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#14b8a6', // teal
  '#ef4444', // red
  '#06b6d4', // cyan
];

export function getJobColor(index: number): string {
  return JOB_COLORS[index % JOB_COLORS.length];
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatHours(hours: number): string {
  return `${hours.toFixed(1)}h`;
}
