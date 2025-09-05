import { Header } from '@/components/header';
import { InteractiveMap } from '@/components/map';
import { Button } from '@/components/ui/button';
import { List, Plus } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <main className="relative flex-1">
        <InteractiveMap />
        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-4">
          <Button
            asChild
            size="lg"
            className="h-16 w-16 rounded-full shadow-lg"
            variant="secondary"
          >
            <Link href="/tickets">
              <List className="h-8 w-8" />
              <span className="sr-only">My Tickets</span>
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="h-20 w-20 rounded-full shadow-xl"
          >
            <Link href="/report">
              <Plus className="h-10 w-10" />
              <span className="sr-only">Report Issue</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
