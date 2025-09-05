import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppProvider } from '@/components/app-provider';

export const metadata: Metadata = {
  title: 'CivicPulse',
  description: 'Report civic issues and help improve your city.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased', 'bg-background')}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
