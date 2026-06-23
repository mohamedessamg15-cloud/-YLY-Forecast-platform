'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function NavBar({ breadcrumb }: { breadcrumb?: React.ReactNode }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0"
      style={{ borderBottom: '1px solid rgba(57,255,20,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-10 drop-shadow-lg">
            <Image
              src="/trophy-real.png"
              alt="World Cup Trophy"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display font-bold text-lg tracking-wide neon-gradient-text hidden sm:block">
            كأس العالم 2026
          </span>
        </Link>

        {breadcrumb && (
          <div className="text-xs text-white/40 font-body">
            {breadcrumb}
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-xs font-display font-semibold text-white/30 uppercase tracking-wider">
            منصة التوقعات
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
