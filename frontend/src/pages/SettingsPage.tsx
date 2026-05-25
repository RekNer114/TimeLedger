import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppStore } from '../store/useAppStore';
import { apiClient } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { LogOut, Download, User, Palette } from 'lucide-react';

export function SettingsPage() {
  const { user, clearAuth } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const handleCalendarExport = async () => {
    // Trigger .ics export from backend
    try {
      const res = await apiClient.get('/reports/export', {
        params: { type: 'ics' },
        responseType: 'blob',
      });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'timeledger-calendar.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // silent fail — backend may not support this yet
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Header title="Settings" subtitle="Your preferences" />

      {/* Profile section */}
      <Card>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-accent-500/20">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{user?.name || 'User'}</h3>
            <p className="text-sm text-dark-300">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </Card>

      {/* Calendar sync */}
      <Card>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-accent-500/10 flex items-center justify-center">
            <Download size={16} className="text-accent-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Calendar Sync</h3>
            <p className="text-xs text-dark-300">Export your schedule as .ics file</p>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={handleCalendarExport}>
          <Download size={14} />
          Export .ics
        </Button>
      </Card>

      {/* Theme (placeholder) */}
      <Card>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-accent-500/10 flex items-center justify-center">
            <Palette size={16} className="text-accent-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Theme</h3>
            <p className="text-xs text-dark-300">Dark mode is enabled by default</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-dark-900 border-2 border-accent-500 cursor-pointer" title="Dark" />
          <div className="w-8 h-8 rounded-lg bg-gray-100 border border-dark-500 opacity-40 cursor-not-allowed" title="Light (coming soon)" />
        </div>
      </Card>

      {/* Account section */}
      <Card>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-danger/10 flex items-center justify-center">
            <User size={16} className="text-danger" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Account</h3>
            <p className="text-xs text-dark-300">Manage your session</p>
          </div>
        </div>
        <Button variant="danger" size="sm" onClick={handleLogout}>
          <LogOut size={14} />
          Sign Out
        </Button>
      </Card>
    </div>
  );
}
