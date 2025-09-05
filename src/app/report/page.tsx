'use client';

import { useState, useRef, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Camera,
  Image as ImageIcon,
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (!imagePreview) {
      alert('An image is required to proceed.');
      return;
    }
    localStorage.setItem('report_image', imagePreview);
    localStorage.setItem('report_note', note);
    router.push('/report/categorize');
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="flex items-center border-b bg-background p-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/home">
            <ChevronLeft />
          </Link>
        </Button>
        <h1 className="mx-auto font-headline text-xl font-bold">
          Report an Issue (1/2)
        </h1>
        <div className="w-10"></div>
      </header>
      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Capture the Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border bg-muted">
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
                <ImageIcon className="mr-2" />
                Upload Photo
              </Button>
              <Button variant="outline" disabled>
                <Mic className="mr-2" />
                Record Voice
              </Button>
            </div>

            <Textarea
              placeholder="Add a text note (optional)..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />

            <div className="flex items-center gap-2 rounded-md bg-muted p-3 text-sm">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-semibold">34.0522° N, 118.2437° W</p>
                <p className="text-muted-foreground">
                  123 City Hall Park, Los Angeles, CA
                </p>
              </div>
            </div>

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
