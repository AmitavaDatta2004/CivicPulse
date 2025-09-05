'use client';

import { Zap } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-primary">
      <div className="relative">
        <Zap className="h-24 w-24" />
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary"></div>
        <div className="absolute inset-0 animate-[ping_1.5s_ease-in-out_0.5s_infinite] rounded-full border-2 border-primary"></div>
      </div>
      <h1 className="mt-8 text-4xl font-bold font-headline">CivicPulse</h1>
    </div>
  );
}
