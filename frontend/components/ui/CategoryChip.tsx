import React from 'react';
import { cn } from '@/lib/utils';
import { TrailCategory } from '@/types/trail';

export interface CategoryChipProps {
  label: string;
  category?: TrailCategory;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CategoryChip({
  label,
  isSelected = false,
  onClick,
  className,
}: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer',
        isSelected
          ? 'bg-primary text-neutral border-primary shadow-sm'
          : 'bg-white/60 text-primary border-primary/20 hover:border-primary/50',
        className
      )}
    >
      {label}
    </button>
  );
}
