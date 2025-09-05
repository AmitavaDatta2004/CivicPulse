import { Header } from '@/components/header';
import { TicketCard } from '@/components/ticket-card';
import { MOCK_TICKETS } from '@/lib/mock-data';

export default function MyTicketsPage() {
  const tickets = MOCK_TICKETS;

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />
      <main className="flex-1">
        <div className="container py-6">
          <h1 className="mb-6 font-headline text-3xl font-bold">My Tickets</h1>
          {tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border bg-background py-16 text-center">
              <h2 className="text-xl font-semibold">No tickets yet</h2>
              <p className="mt-2 text-muted-foreground">
                You haven't reported any issues.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
