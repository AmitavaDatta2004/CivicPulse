import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Ticket, TicketStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, CheckCircle } from 'lucide-react';

const statusColors: Record<TicketStatus, string> = {
    Submitted: 'border-primary/50 bg-primary/10 text-primary',
    Assigned: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-600',
    'In Progress': 'border-accent/50 bg-accent/10 text-accent-foreground',
    Resolved: 'border-green-500/50 bg-green-500/10 text-green-600',
};

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const isResolved = ticket.status === 'Resolved';
  return (
    <Link href={`/tickets/${ticket.id}`} className="block">
      <Card className={cn("hover:border-primary/50 transition-colors", isResolved && "bg-green-500/5 border-green-500/20 hover:border-green-500/50")}>
        <div className="flex items-center">
            <div className="relative w-28 h-28 m-4 rounded-md overflow-hidden shrink-0">
                 <Image src={ticket.image.url} alt={ticket.category} fill className="object-cover" data-ai-hint={ticket.image.hint} />
            </div>
            <div className="flex-1 py-4 pr-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-lg">{ticket.category}</p>
                        <p className="text-sm text-muted-foreground">ID: {ticket.id}</p>
                    </div>
                    <Badge className={cn('border font-semibold', statusColors[ticket.status])}>
                      {isResolved && <CheckCircle className='mr-1.5 h-3.5 w-3.5' />}
                      {ticket.status}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground my-2">{ticket.address}</p>
                 <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
                    <span>{formatDistanceToNow(ticket.submittedAt, { addSuffix: true })}</span>
                    <div className={cn("flex items-center font-semibold", isResolved ? "text-green-600" : "text-primary")}>
                        View Details <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
      </Card>
    </Link>
  );
}
