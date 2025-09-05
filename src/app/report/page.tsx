'use client';

import { useState, useRef, type ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Camera,
  ImageIcon,
  Mic,
  MapPin,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';

export default function ReportStep1Page() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('report_image');
    if(storedImage) setImagePreview(storedImage);
    const storedNote = localStorage.getItem('report_note');
    if(storedNote) setNote(storedNote);
  }, []);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        localStorage.setItem('report_image', result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    localStorage.setItem('report_note', e.target.value);
  }

  const handleNext = () => {
    if (!imagePreview) {
      alert('An image is required to proceed.');
      return;
    }
    router.push('/report/categorize');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center p-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/home">
            <ChevronLeft />
          </Link>
        </Button>
        <div className='flex-1 text-center font-semibold'>Step 1 of 3</div>
        <div className="w-10"></div>
      </header>
      <main className="p-4 flex-1">
        <Card className='h-full'>
          <CardHeader>
            <CardTitle className='font-headline text-2xl'>Capture the Issue</CardTitle>
            <CardDescription>A picture is worth a thousand words. Add a voice or text note for more context.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border-2 border-dashed bg-secondary">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Issue preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <Camera className="h-16 w-16 text-muted-foreground" />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="grid grid-cols-2 gap-4">
               <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="mr-2" />
                Take or Upload
              </Button>
              <Button variant="outline" disabled>
                <Mic className="mr-2" />
                Add Voice Note
              </Button>
            </div>

            <Textarea
              placeholder="Add a text note (optional)..."
              value={note}
              onChange={handleNoteChange}
              rows={3}
            />

            <Button
              onClick={handleNext}
              className="w-full"
              size="lg"
              disabled={!imagePreview}
            >
              Next: Categorize
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
