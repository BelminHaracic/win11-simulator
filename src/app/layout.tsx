import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Windows 11 Simulator',
  description: 'Windows 11 simulation built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}