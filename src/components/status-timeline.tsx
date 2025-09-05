'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import type { TicketStatus } from '@/lib/types';
import { Check, Hourglass, Wrench, Building2 } from 'lucide-react';

const statuses: { name: TicketStatus, icon: React.ReactNode }[] = [
  { name: 'Submitted', icon: <Check className="h-4 w-4" /> },
  { name: 'Assigned', icon: <Building2 className="h-4 w-4" /> },
  { name: 'In Progress', icon: <Wrench className="h-4 w-4" /> },
  { name: 'Resolved', icon: <Check className="h-4 w-4" /> },
];

export function StatusTimeline({
  currentStatus,
}: {
  currentStatus: TicketStatus;
}) {
  const currentIndex = statuses.findIndex(s => s.name === currentStatus);

  return (
    <div className="relative w-full">
      <div
        className="absolute left-4 top-4 h-[calc(100%-2rem)] w-0.5 bg-border"
        aria-hidden="true"
      />
       <div
        className="absolute left-4 top-4 h-0 w-0.5 bg-primary transition-all duration-500"
        style={{ height: `calc(${currentIndex * 33.33}% - 1rem)` }}
        aria-hidden="true"
      />
      <ul className="space-y-8">
        {statuses.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li key={status.name} className="flex items-start gap-4">
               <div
                className={cn(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
                  isCurrent || isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground'
                )}
              >
                {status.icon}
              </div>
              <div className="pt-1">
                <p
                  className={cn(
                    'font-semibold',
                    isCurrent || isCompleted
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {status.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isCurrent && "We're here!"}
                  {isCompleted && "Done!"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
