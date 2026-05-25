import React from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export function Modal({ title, children }: ModalProps) {
  const { modalState, closeModal } = useAppStore();

  if (!modalState.isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-dark-600/50">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg hover:bg-dark-600 text-dark-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
