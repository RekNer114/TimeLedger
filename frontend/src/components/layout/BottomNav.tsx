import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  BarChart3,
  Settings,
} from 'lucide-react';

const items = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/jobs', icon: Briefcase, label: 'Jobs' },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav lg:hidden">
      <div className="flex items-center justify-around">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors
              ${isActive ? 'text-accent-400' : 'text-dark-300'}`
            }
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
