import { Card } from '../ui/Card';
import { formatCurrency, formatHours } from '../../utils/colors';
import type { Earnings } from '../../types';
import { Clock, DollarSign, Receipt, TrendingUp } from 'lucide-react';

interface EarningsSummaryProps {
  earnings?: Earnings;
  loading?: boolean;
}

export function EarningsSummary({ earnings, loading }: EarningsSummaryProps) {
  const cards = [
    {
      label: 'Total Hours',
      value: earnings ? formatHours(earnings.totalHours) : '—',
      icon: Clock,
      color: '#6366f1',
    },
    {
      label: 'Gross Earnings',
      value: earnings ? formatCurrency(earnings.grossEarnings) : '—',
      icon: DollarSign,
      color: '#10b981',
    },
    {
      label: 'Tax Amount',
      value: earnings ? formatCurrency(earnings.taxAmount) : '—',
      icon: Receipt,
      color: '#f59e0b',
    },
    {
      label: 'Net Earnings',
      value: earnings ? formatCurrency(earnings.netEarnings) : '—',
      icon: TrendingUp,
      color: '#f43f5e',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, i) => (
        <Card key={card.label} className={`animate-fade-in`} style={{ animationDelay: `${i * 80}ms` }}>
          {loading ? (
            <div className="space-y-3">
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-7 w-28" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <card.icon size={16} style={{ color: card.color }} />
                </div>
              </div>
              <p className="text-xs text-dark-300 mb-1">{card.label}</p>
              <p className="text-xl font-bold text-white">{card.value}</p>
            </>
          )}
        </Card>
      ))}
    </div>
  );
}
