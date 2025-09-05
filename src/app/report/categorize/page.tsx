'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Trash2,
  Lightbulb,
  Droplets,
  TreeDeciduous,
  MoreHorizontal,
  ChevronLeft,
  Loader2,
  Check,
} from 'lucide-react';
import type { IssueCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { submitReportAction } from '@/lib/actions';

const categories: { name: IssueCategory; icon: React.ReactNode }[] = [
  { name: 'Garbage', icon: <Trash2 className="h-8 w-8" /> },
  {
    name: 'Pothole',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
  },
  { name: 'Streetlight', icon: <Lightbulb className="h-8 w-8" /> },
  { name: 'Water Leakage', icon: <Droplets className="h-8 w-8" /> },
  { name: 'Fallen Tree', icon: <TreeDeciduous className="h-8 w-8" /> },
  { name: 'Other', icon: <MoreHorizontal className="h-8 w-8" /> },
];

export default function CategorizePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<IssueCategory | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedImage = localStorage.getItem('report_image');
    const storedNote = localStorage.getItem('report_note');
    if (!storedImage) {
      router.replace('/report');
    } else {
      setImage(storedImage);
      setNote(storedNote);
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!selectedCategory || !image) return;
    setIsSubmitting(true);

    const result = await submitReportAction({
      photoDataUri: image,
      category: selectedCategory,
      textNote: note || '',
    });

    if (result.success && result.ticketId) {
      localStorage.setItem('new_ticket_id', result.ticketId);
      localStorage.removeItem('report_image');
      localStorage.removeItem('report_note');
      router.push('/report/submitted');
    } else {
      alert('Submission failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCategorySelect = (category: IssueCategory) => {
    setSelectedCategory(category);
  };

  if (!image)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="flex items-center p-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedCategory(null)}
          >
            <ChevronLeft />
          </Button>
          <div className='flex-1 text-center font-semibold'>Step 3 of 3</div>
          <div className="w-10"></div>
        </header>
        <main className="p-4 flex-1 flex flex-col">
          <Card className='flex-1 flex flex-col'>
            <CardHeader>
              <CardTitle className='font-headline text-2xl'>Confirm & Submit</CardTitle>
              <CardDescription>Review the details before final submission.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt="Issue preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p className="text-lg font-semibold text-primary">
                  {selectedCategory}
                </p>
              </div>
              {note && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Note</p>
                  <p className="italic text-foreground/80">"{note}"</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : <Check className="mr-2 h-4 w-4" />}
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
        <header className="flex items-center p-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/report">
            <ChevronLeft />
          </Link>
        </Button>
        <div className='flex-1 text-center font-semibold'>Step 2 of 3</div>
        <div className="w-10"></div>
      </header>
      <main className="p-4 flex-1">
        <Card className='h-full'>
          <CardHeader>
            <CardTitle className='font-headline text-2xl'>Select a Category</CardTitle>
            <CardDescription>Choose the category that best describes the issue.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={cn(
                    'flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all',
                    'hover:border-primary/80 hover:bg-primary/5'
                  )}
                >
                  <div className='text-primary'>{cat.icon}</div>
                  <span className="text-center font-semibold text-foreground">{cat.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
