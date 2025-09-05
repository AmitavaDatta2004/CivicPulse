import { Header } from '@/components/header';
import { StatusTimeline } from '@/components/status-timeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { MOCK_TICKETS } from '@/lib/mock-data';
import type { TicketStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ChevronLeft, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const statusColors: Record<TicketStatus, string> = {
    Submitted: 'border-primary/50 bg-primary/10 text-primary',
    Assigned: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-600',
    'In Progress': 'border-accent/50 bg-accent/10 text-accent-foreground',
    Resolved: 'border-green-500/50 bg-green-500/10 text-green-600',
};

const statusTextColors: Record<TicketStatus, string> = {
    Submitted: 'text-primary',
    Assigned: 'text-yellow-600',
    'In Progress': 'text-accent-foreground',
    Resolved: 'text-green-600',
};


export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = MOCK_TICKETS.find((t) => t.id === params.id);

  if (!ticket) {
    notFound();
  }
  
  const isResolved = ticket.status === 'Resolved';

  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <Header />
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-4">
            <Button variant="ghost" asChild>
              <Link href="/tickets">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to My Tickets
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-headline text-2xl">
                        {ticket.category}
                      </CardTitle>
                      <CardDescription>
                        Ticket ID: {ticket.id}
                      </CardDescription>
                    </div>
                    <Badge className={cn('border font-semibold', statusColors[ticket.status])}>
                      {ticket.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={ticket.image.url}
                      alt="Issue photo"
                      fill
                      className="object-cover"
                      data-ai-hint={ticket.image.hint}
                    />
                  </div>
                  {ticket.description && (
                    <>
                      <h3 className="mb-2 font-semibold">Description</h3>
                      <p className="mb-4 text-muted-foreground">
                        {ticket.description}
                      </p>
                    </>
                  )}

                  <h3 className="mb-2 font-semibold">AI Severity Assessment</h3>
                  <div className="rounded-md border bg-background p-4">
                     <p className="text-muted-foreground italic">
                      "{ticket.justification}"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {isResolved && ticket.resolutionImage && (
                <Card className='border-accent bg-accent/5'>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl text-accent-foreground flex items-center gap-2">
                      <CheckCircle /> Proof of Resolution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                        src={ticket.resolutionImage.url}
                        alt="Resolution photo"
                        fill
                        className="object-cover"
                        data-ai-hint={ticket.resolutionImage.hint}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
               <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">
                    Status Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StatusTimeline currentStatus={ticket.status} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">
                    Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{ticket.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Estimated Resolution</p>
                      <p className={cn("font-semibold", isResolved ? statusTextColors.Resolved : "text-muted-foreground")}>{ticket.eta}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    <div>
                        <p className="font-medium">Reported</p>
                        <p className="text-muted-foreground">
                        {format(ticket.submittedAt, 'PPp')}
                        </p>
                    </div>
                  </div>
                  {ticket.resolvedAt && (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                       <div>
                        <p className="font-medium">Resolved</p>
                        <p className="text-muted-foreground">
                            {format(ticket.resolvedAt, 'PPp')}
                        </p>
                       </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
