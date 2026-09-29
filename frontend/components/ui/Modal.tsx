import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className={cn(
          'w-full max-w-lg rounded-2xl bg-neutral border border-primary/20 p-6 shadow-xl relative animate-in fade-in zoom-in-95',
          className
        )}
      >
        <div className="flex items-center justify-between pb-3 border-b border-primary/10">
          {title && <h3 className="text-lg font-bold text-primary">{title}</h3>}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-primary/60 hover:text-primary hover:bg-primary/5 transition-colors ml-auto cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
