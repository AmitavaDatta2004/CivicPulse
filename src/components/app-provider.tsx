'use client';

import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/splash-screen';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might be fetching initial data here.
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      {loading ? <SplashScreen /> : children}
      <Toaster />
    </AuthProvider>
  );
}
