'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Zap, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/home');
    }
  }, [user, router]);

  if (loading || user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center text-primary">
          <Zap className="h-20 w-20" />
        </div>
        <h1 className="text-5xl font-bold font-headline text-primary">
          CivicPulse
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Bridging the gap between citizens and municipal services.
        </p>
        <div className="mt-12">
          <Button
            onClick={signInWithGoogle}
            size="lg"
            className="w-full font-bold"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="mr-2 h-5 w-5"
              fill="currentColor"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.9 2.04-5.07 2.04-4.35 0-7.88-3.57-7.88-8s3.53-8 7.88-8c2.48 0 4.02.98 4.9 1.88l2.6-2.6C18.02 2.33 15.53 1 12.48 1 7.02 1 3 5.02 3 9.5s4.02 8.5 9.48 8.5c2.9 0 5.25-1 6.92-2.63 1.73-1.68 2.24-4.2 2.24-6.55 0-.45-.04-.85-.1-1.25h-9.56z"></path>
            </svg>
            Sign in with Google
          </Button>
        </div>
      </div>
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        Your city, your voice.
      </footer>
    </div>
  );
}
