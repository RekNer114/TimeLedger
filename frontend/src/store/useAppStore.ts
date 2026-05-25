import { create } from 'zustand';
import type { User } from '../types';

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;

  // UI state
  selectedDate: string; // YYYY-MM-DD
  setSelectedDate: (date: string) => void;

  activeJobFilter: string | null;
  setActiveJobFilter: (jobId: string | null) => void;

  currentMonth: string; // YYYY-MM
  setCurrentMonth: (month: string) => void;

  // Modal
  modalState: {
    isOpen: boolean;
    type: 'shift' | 'job' | 'confirm' | null;
    data?: unknown;
  };
  openModal: (type: 'shift' | 'job' | 'confirm', data?: unknown) => void;
  closeModal: () => void;

  // Sidebar (mobile)
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const now = new Date();
const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
const today = `${currentMonth}-${String(now.getDate()).padStart(2, '0')}`;

// Restore auth from localStorage
const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

export const useAppStore = create<AppState>((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  setAuth: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token });
  },
  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },

  selectedDate: today,
  setSelectedDate: (date) => set({ selectedDate: date }),

  activeJobFilter: null,
  setActiveJobFilter: (jobId) => set({ activeJobFilter: jobId }),

  currentMonth,
  setCurrentMonth: (month) => set({ currentMonth: month }),

  modalState: { isOpen: false, type: null },
  openModal: (type, data) => set({ modalState: { isOpen: true, type, data } }),
  closeModal: () => set({ modalState: { isOpen: false, type: null } }),

  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
}));
