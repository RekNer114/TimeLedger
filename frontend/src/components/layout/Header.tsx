import { Menu } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const { toggleSidebar } = useAppStore();

  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl hover:bg-dark-700 text-dark-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm text-dark-300 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
