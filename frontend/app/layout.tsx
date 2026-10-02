import type { Metadata } from 'next';
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrailChatbot } from '@/components/chatbot/TrailChatbot';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TRAIL — Don't just get there. Discover along the way.",
  description:
    'A curated cartographic network connecting independent roasteries, tucked-away second-hand bookshops, wild viewpoints, and forgotten architectural alleyways across living terrain.',
  icons: {
    icon: '/logo/trail-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col antialiased bg-[#F4F2EB] text-[#183D2B] font-sans selection:bg-[#E36A2E]/20 selection:text-[#183D2B]">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <TrailChatbot />
      </body>
    </html>
  );
}
