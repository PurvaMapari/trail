import React from 'react';

export interface TrailProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function TrailProgress({ currentStep, totalSteps }: TrailProgressProps) {
  const percentage = totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between text-xs text-primary/70">
        <span>Progress</span>
        <span>
          Stop {currentStep} of {totalSteps} ({percentage}%)
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-primary/10 overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
