import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import IntroAnimation from '@/components/ui/IntroAnimation';
import SmartAssistant from '@/components/ui/SmartAssistant';
import GlobalNavigation from '@/components/ui/GlobalNavigation';
import VideoBackground from '@/components/ui/VideoBackground';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'توقعات كأس العالم 2026',
  description: 'حلّل، توقع، وشارك في التحدي العالمي الأكبر لكرة القدم.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`}>
      <body
        className="bg-bg-primary text-white antialiased font-body overflow-x-hidden"
        style={{ position: 'relative', minHeight: '100vh' }}
        suppressHydrationWarning
      >
        {/* Looping video background */}
        <VideoBackground />

        {/* All content sits above the video */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <IntroAnimation />
          <GlobalNavigation />
          <SmartAssistant />
          {children}

          {/* Attribution Footer */}
          <footer className="w-full py-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem', background: 'rgba(0,0,0,0.5)' }}>
            <p className="text-sm font-display font-bold text-white/50 tracking-widest uppercase">
              تم إنشاء الموقع بواسطة <span className="text-white/80">YLY- Ministry Of Youth And Sports</span>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
