'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MOCK_ISSUES_ON_MAP } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  Trash2,
  Lightbulb,
  Droplets,
  TreeDeciduous,
  MoreHorizontal,
} from 'lucide-react';
import type { IssueCategory } from '@/lib/types';

const categoryIcons: Record<IssueCategory, React.ReactNode> = {
  Garbage: <Trash2 className="h-4 w-4" />,
  Pothole: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-dot-dashed"
    >
      <path d="M10.1 3.8a9 9 0 0 1 3.8 0" />
      <path d="M19.7 6.3a9 9 0 0 1 0 11.4" />
      <path d="M3.8 13.9a9 9 0 0 1 0-3.8" />
      <path d="M6.3 4.3a9 9 0 0 1 11.4 0" />
      <path d="M13.9 20.2a9 9 0 0 1-3.8 0" />
      <path d="M4.3 17.7a9 9 0 0 1 0-11.4" />
      <path d="M17.7 19.7a9 9 0 0 1-11.4 0" />
      <path d="M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
    </svg>
  ),
  Streetlight: <Lightbulb className="h-4 w-4" />,
  'Water Leakage': <Droplets className="h-4 w-4" />,
  'Fallen Tree': <TreeDeciduous className="h-4 w-4" />,
  Other: <MoreHorizontal className="h-4 w-4" />,
};

export function InteractiveMap() {
  const [zoomedCluster, setZoomedCluster] = useState<number | null>(null);

  const handleClusterClick = (id: number) => {
    setZoomedCluster((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative h-full w-full bg-blue-100 overflow-hidden">
      <Image
        src="https://picsum.photos/1200/800"
        fill
        alt="City map"
        className="object-cover opacity-30"
        data-ai-hint="city map"
      />
      <div className="absolute inset-0 bg-primary/10"></div>
      {MOCK_ISSUES_ON_MAP.map((issue) => (
        <div
          key={issue.id}
          className="absolute"
          style={{ top: issue.position.top, left: issue.position.left }}
        >
          <button
            onClick={() => handleClusterClick(issue.id)}
            className={cn(
              'flex items-center justify-center rounded-full bg-primary/80 text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110',
              zoomedCluster === issue.id ? 'w-16 h-16' : 'w-12 h-12'
            )}
            aria-label={`Issue cluster with ${issue.count} reports`}
          >
            {zoomedCluster === issue.id ? (
              <div className="animate-in fade-in zoom-in">
                {categoryIcons[issue.category]}
              </div>
            ) : (
              <span className="text-lg font-bold">{issue.count}</span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
