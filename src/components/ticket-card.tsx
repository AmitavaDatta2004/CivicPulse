import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Ticket, TicketStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { StatusTimeline } from './status-timeline';

const statusColors: Record<TicketStatus, string> = {
    Submitted: 'border-primary/50 bg-primary/10 text-primary',
    Assigned: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-600',
    'In Progress': 'border-accent/50 bg-accent/10 text-accent',
    Resolved: 'border-green-500/50 bg-green-500/10 text-green-600',
};

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Link href={`/tickets/${ticket.id}`} className="block">
      <Card className="hover:border-primary/50 transition-colors">
        <div className="flex">
            <div className="relative w-24 h-24 m-4 rounded-md overflow-hidden shrink-0">
                 <Image src={ticket.image.url} alt={ticket.category} fill className="object-cover" data-ai-hint={ticket.image.hint} />
            </div>
            <div className="flex-1 py-4 pr-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold">{ticket.category}</p>
                        <p className="text-sm text-muted-foreground">ID: {ticket.id}</p>
                    </div>
                    <Badge className={cn('border-transparent font-semibold', statusColors[ticket.status])}>{ticket.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground my-2">{ticket.address}</p>
                 <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                    <span>{formatDistanceToNow(ticket.submittedAt, { addSuffix: true })}</span>
                    <div className="flex items-center text-primary font-semibold">
                        Details <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
      </Card>
    </Link>
  );
}
