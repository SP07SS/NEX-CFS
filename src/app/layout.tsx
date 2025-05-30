import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Use Geist Sans
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import FloatingActionButton from '@/components/floating-action-button'; // Added import

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export const metadata: Metadata = {
  title: 'NEX Digital Finance Hub',
  description: 'Finance. Fund. Grow. All in One Place. Easy loans, smart investing, secure crowdfunding.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
        <Toaster />
        <FloatingActionButton /> {/* Added FAB here */}
      </body>
    </html>
  );
}
