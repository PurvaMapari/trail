import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search trails, categories, or cities...',
  value,
  onChange,
  onSubmit,
  className,
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && value) onSubmit(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative flex items-center w-full max-w-lg rounded-full bg-white/80 border border-primary/20 shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-primary',
        className
      )}
    >
      <Search className="w-4 h-4 text-primary/40 mr-2 shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-sm text-primary placeholder:text-primary/40 focus:outline-none"
      />
    </form>
  );
}
