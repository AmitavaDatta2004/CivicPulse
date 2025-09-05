'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SubmittedPage() {
  const router = useRouter();
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    const newTicketId = localStorage.getItem('new_ticket_id');
    if (!newTicketId) {
      router.replace('/home');
    } else {
      setTicketId(newTicketId);
      localStorage.removeItem('new_ticket_id');
    }
  }, [router]);

  if (!ticketId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="mb-6 flex justify-center">
            <CheckCircle2 className="h-20 w-20 animate-in zoom-in text-green-500" />
          </div>
          <h1 className="font-headline text-2xl font-bold">
            Submission Complete!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for helping improve our city!
          </p>

          <div className="mt-8 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Your Ticket ID</p>
            <p className="font-mono text-3xl font-bold text-primary">
              {ticketId}
            </p>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            We'll keep you updated on the progress.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 w-full max-w-md">
        <Button asChild className="w-full" size="lg">
          <Link href="/tickets">View My Tickets</Link>
        </Button>
      </div>
    </div>
  );
}
