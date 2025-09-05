'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import type { TicketStatus } from '@/lib/types';
import { Check } from 'lucide-react';

const statuses: TicketStatus[] = [
  'Submitted',
  'Assigned',
  'In Progress',
  'Resolved',
];

export function StatusTimeline({
  currentStatus,
  small = false,
}: {
  currentStatus: TicketStatus;
  small?: boolean;
}) {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div
      className="flex w-full items-center"
      aria-label={`Status: ${currentStatus}`}
    >
      {statuses.map((status, index) => (
        <React.Fragment key={status}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex items-center justify-center rounded-full border-2 transition-colors',
                small ? 'h-5 w-5' : 'h-8 w-8',
                index <= currentIndex
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-muted-foreground'
              )}
            >
              {index <= currentIndex && (
                <Check className={small ? 'h-3 w-3' : 'h-4 w-4'} />
              )}
            </div>
            {!small && (
              <span
                className={cn(
                  'mt-1 text-center text-xs',
                  index <= currentIndex
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {status}
              </span>
            )}
          </div>
          {index < statuses.length - 1 && (
            <div
              className={cn(
                'mx-1 h-0.5 flex-1 transition-colors',
                index < currentIndex ? 'bg-primary' : 'bg-border'
              )}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
